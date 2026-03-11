import { useAppContext } from '../context/AppContext';
import { Landmark, FileSpreadsheet, Download, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

function GSTSummary() {
    const { gstData, invoices, totalGstCollected, totalGstPayable, totalItc } = useAppContext();
    return (
        <div className="flex flex-col gap-8">
            <div className="card border-l-4 border-l-warning">
                <div className="flex items-start gap-4 p-2 bg-warning-light rounded-md">
                    <AlertCircle className="text-warning flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-warning mb-1">High Tax Liability Alert</h4>
                        <p className="text-sm">Your projected GST liability for this month has crossed ₹50,000 threshold. Please make sure sufficient input tax credits are available.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -m-4 opacity-5 p-4"><Landmark size={120} /></div>
                    <p className="text-text-muted font-semibold text-sm mb-2 uppercase">Total GST Collected</p>
                    <h2 className="text-3xl font-bold text-primary">₹{totalGstCollected.toLocaleString()}</h2>
                </div>
                <div className="card text-center">
                    <p className="text-text-muted font-semibold text-sm mb-2 uppercase">Total GST Payable</p>
                    <h2 className="text-3xl font-bold text-secondary">₹{totalGstPayable.toLocaleString()}</h2>
                </div>
                <div className="card text-center">
                    <p className="text-text-muted font-semibold text-sm mb-2 uppercase">Input Tax Credit</p>
                    <h2 className="text-3xl font-bold text-success">₹{totalItc.toLocaleString()}</h2>
                </div>
                <div className="card text-center">
                    <p className="text-text-muted font-semibold text-sm mb-2 uppercase">Unfiled Returns</p>
                    <h2 className="text-3xl font-bold text-danger">0</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2"><FileSpreadsheet /> Monthly Tax Summary</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gstData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <RechartsTooltip />
                                <Bar dataKey="collected" fill="#0A192F" name="Collected" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="payable" fill="#008080" name="Payable" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-primary">GSTR-1 Export (Simulated)</h3>
                        <button className="btn btn-outline flex gap-2"><Download size={18} /> Export CSV</button>
                    </div>
                    <div className="table-container text-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice No</th>
                                    <th>Date</th>
                                    <th>GSTIN/UIN</th>
                                    <th>Taxable Value</th>
                                    <th>Tax Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(inv => (
                                    <tr key={inv.id}>
                                        <td className="font-semibold">{inv.id}</td>
                                        <td>{inv.date}</td>
                                        <td className="text-text-muted uppercase">29AAACV1234D1Z5</td>
                                        <td className="text-right">₹{(inv.totalAmount - inv.gstAmount).toLocaleString()}</td>
                                        <td className="text-right font-medium">₹{inv.gstAmount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GSTSummary;
