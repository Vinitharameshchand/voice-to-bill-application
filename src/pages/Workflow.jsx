import { Mic, Speech, BrainCircuit, FileText, FileSpreadsheet, Landmark, BarChart3, ArrowDown } from 'lucide-react';

function Workflow() {
    const steps = [
        { icon: <Mic size={32} className="text-surface" />, title: 'Voice Input', desc: 'User speaks transaction via mic', color: 'bg-primary' },
        { icon: <Speech size={32} className="text-surface" />, title: 'Speech Recognition', desc: 'Audio to Text via Web Speech API', color: 'bg-secondary' },
        { icon: <BrainCircuit size={32} className="text-surface" />, title: 'AI Data Extraction', desc: 'NLP structure extraction', color: 'bg-primary-light' },
        { icon: <FileText size={32} className="text-surface" />, title: 'Invoice Generation', desc: 'Dynamic PDF creation', color: 'bg-secondary-light' },
        { icon: <FileSpreadsheet size={32} className="text-surface" />, title: 'Accounting Entry', desc: 'Simulated Tally integration', color: 'bg-success' },
        { icon: <Landmark size={32} className="text-surface" />, title: 'GST Processing', desc: 'GSTR-1 data & liability checks', color: 'bg-warning' },
        { icon: <BarChart3 size={32} className="text-surface" />, title: 'Dashboard Update', desc: 'Live analytics rendering', color: 'bg-danger' }
    ];

    return (
        <div className="flex flex-col items-center py-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-2">Voice-to-Bill Workflow</h2>
                <p className="text-text-muted">How the AI-powered accounting automation system processes voice data into complete accounting entries.</p>
            </div>

            <div className="flex flex-col items-center gap-4 relative w-full max-w-2xl">
                {/* Background line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-border -translate-x-1/2 z-0 hidden md:block"></div>

                {steps.map((step, idx) => (
                    <div key={idx} className={`relative z-10 w-full flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                        {/* Desktop Spacing */}
                        <div className="flex-1 hidden md:block"></div>

                        {/* Icon Circle */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${step.color}`}>
                            {step.icon}
                        </div>

                        {/* Card Content */}
                        <div className="flex-1 w-full max-w-sm">
                            <div className="card p-6 border-l-4" style={{ borderLeftColor: `var(--${step.color.split('-')[1] || 'primary'})` }}>
                                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                                <p className="text-text-muted">{step.desc}</p>
                            </div>
                        </div>

                        {/* Arrow for mobile */}
                        {idx < steps.length - 1 && (
                            <div className="md:hidden text-border my-2">
                                <ArrowDown size={32} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Workflow;
