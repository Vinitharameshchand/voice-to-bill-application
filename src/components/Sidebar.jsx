import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Mic,
    FileText,
    Landmark,
    BarChart3,
    AlertTriangle,
    Network
} from 'lucide-react';

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Voice Billing', path: '/voice-billing', icon: <Mic size={20} /> },
        { name: 'Invoices', path: '/invoices', icon: <FileText size={20} /> },
        { name: 'GST Summary', path: '/gst-summary', icon: <Landmark size={20} /> },
        { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
        { name: 'Risk Monitoring', path: '/risk-monitoring', icon: <AlertTriangle size={20} /> },
        { name: 'Workflow', path: '/workflow', icon: <Network size={20} /> },
    ];

    return (
        <div className="sidebar">
            <div className="p-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Mic className="text-secondary" /> Voice-to-Bill
                </h2>
            </div>
            <nav className="mt-4 flex-col flex">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
