import { Bell, User, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/dashboard': return 'Overview Dashboard';
            case '/voice-billing': return 'Voice Transaction Input';
            case '/invoices': return 'Invoices & Ledger';
            case '/gst-summary': return 'GST Compliance';
            case '/analytics': return 'Business Analytics';
            case '/risk-monitoring': return 'Internal Control & Risk';
            case '/workflow': return 'System Workflow';
            default: return 'Dashboard';
        }
    };

    return (
        <header className="top-header">
            <h1 className="text-xl font-semibold text-primary">{getPageTitle()}</h1>
            <div className="flex items-center gap-6 text-text-muted">
                <button className="btn btn-outline" style={{ border: 'none' }}><Bell size={20} /></button>
                <button className="btn btn-outline" style={{ border: 'none' }}><Settings size={20} /></button>
                <div className="flex items-center gap-2 font-medium bg-surface p-2 rounded-full border">
                    <User size={20} className="text-primary" />
                    <span className="text-sm mr-2 text-primary">MSME Admin</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
