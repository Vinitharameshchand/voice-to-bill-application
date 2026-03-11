import { useAppContext } from '../context/AppContext';
import { FileText, Eye, Download, MoreVertical, FileBarChart } from 'lucide-react';

function Invoices() {
    const { invoices, journalEntries } = useAppContext();
    return (
        <div className="flex flex-col gap-8">
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2"><FileText className="text-primary" /> All Invoices</h3>
                    <button className="btn btn-outline">Filter by Date</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice #</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => (
                                <tr key={inv.id}>
                                    <td className="font-medium text-primary">{inv.id}</td>
                                    <td className="text-text-muted">{inv.date}</td>
                                    <td>{inv.customerName}</td>
                                    <td className="font-semibold">₹{inv.totalAmount.toLocaleString()}</td>
                                    <td>
                                        <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                                            {'Paid'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="p-1 hover:bg-background rounded text-text-muted transition"><Eye size={18} /></button>
                                            <button className="p-1 hover:bg-background rounded text-text-muted transition"><Download size={18} /></button>
                                            <button className="p-1 hover:bg-background rounded text-text-muted transition"><MoreVertical size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card border-l-4 border-l-secondary">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2"><FileBarChart className="text-secondary" /> Automated Ledger Entries (Tally Sync)</h3>
                    <span className="badge badge-primary">Sync Active</span>
                </div>
                <p className="text-text-muted mb-4 text-sm">Below are the simulated accounting entries automatically created by Voice-to-Bill for your recent transactions.</p>
                <div className="table-container">
                    <table>
                        <thead className="bg-primary text-surface">
                            <tr>
                                <th className="text-surface border-r border-primary-light">Date</th>
                                <th className="text-surface border-r border-primary-light">Particulars</th>
                                <th className="text-surface border-r border-primary-light">Ref #</th>
                                <th className="text-surface text-right border-r border-primary-light">Debit (₹)</th>
                                <th className="text-surface text-right border-r border-primary-light">Credit (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journalEntries.map((entry, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-surface' : 'bg-background'}>
                                    <td className="text-text-muted">{entry.date}</td>
                                    <td className="font-semibold" style={{ paddingLeft: entry.credit > 0 ? '2rem' : '1rem' }}>
                                        {entry.credit > 0 ? `To ${entry.account}` : entry.account}
                                    </td>
                                    <td className="text-sm text-text-muted">{entry.ref}</td>
                                    <td className="text-right font-medium">{entry.debit > 0 ? entry.debit.toLocaleString() : '-'}</td>
                                    <td className="text-right font-medium">{entry.credit > 0 ? entry.credit.toLocaleString() : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Invoices;
