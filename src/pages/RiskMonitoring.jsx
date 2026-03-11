import { useAppContext } from '../context/AppContext';
import { ShieldAlert, AlertTriangle, AlertCircle, Info, ShieldCheck } from 'lucide-react';

function RiskMonitoring() {
    const { riskAlerts } = useAppContext();
    const getIcon = (severity) => {
        switch (severity) {
            case 'high': return <ShieldAlert className="text-danger" size={32} />;
            case 'medium': return <AlertTriangle className="text-warning" size={32} />;
            case 'info': return <Info className="text-secondary" size={32} />;
            default: return <AlertCircle className="text-primary" size={32} />;
        }
    };

    const getColorClass = (severity) => {
        switch (severity) {
            case 'high': return 'border-l-danger bg-danger-light bg-opacity-10';
            case 'medium': return 'border-l-warning bg-warning-light bg-opacity-10';
            case 'info': return 'border-l-secondary bg-secondary-light bg-opacity-10';
            default: return 'border-l-primary';
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="card bg-surface flex items-center gap-6 p-8 border border-border">
                <div className="bg-success-light p-4 rounded-full text-success bg-opacity-20"><ShieldCheck size={48} /></div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-2">Internal Control Status: Active</h2>
                    <p className="text-text-muted">Currently scanning all incoming transcriptions, invoices, and accounting entries against 150+ risk patterns.</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                    <span className="text-3xl font-bold text-success">98.5%</span><br />
                    <span className="text-xs font-semibold text-text-muted uppercase">Compliance Score</span>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2"><AlertTriangle /> Detected Risks & Anomalies</h3>
                <div className="flex flex-col gap-4">
                    {riskAlerts.map(alert => (
                        <div key={alert.id} className={`card flex items-start gap-4 border-l-4 ${getColorClass(alert.severity)}`}>
                            <div className="mt-1">{getIcon(alert.severity)}</div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className={`font-bold text-lg ${alert.severity === 'high' ? 'text-danger' : alert.severity === 'medium' ? 'text-warning' : 'text-secondary'}`}>
                                        {alert.title}
                                    </h4>
                                    <span className={`badge ${alert.severity === 'high' ? 'badge-danger' : alert.severity === 'medium' ? 'badge-warning' : 'badge-primary'}`}>
                                        {alert.severity.toUpperCase()} RISK
                                    </span>
                                </div>
                                <p className="text-text-muted mb-4">{alert.message}</p>
                                <div className="flex gap-3">
                                    <button className="btn btn-outline text-sm">Review Details</button>
                                    <button className={`btn text-sm ${alert.severity === 'high' ? 'btn-danger' : 'btn-secondary'}`}>
                                        Take Action
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {riskAlerts.length === 0 && (
                        <div className="card text-center p-12 text-success">
                            <ShieldCheck size={64} className="m-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-bold">All systems compliant</h3>
                            <p className="text-text-muted mt-2">No internal control risks detected.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RiskMonitoring;
