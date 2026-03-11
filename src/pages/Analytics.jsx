import { useAppContext } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Target, Activity } from 'lucide-react';

const COLORS = ['#0A192F', '#008080', '#00B4B4', '#1E293B', '#CBD5E1'];

function Analytics() {
    const { salesData, productRevenue, profitMarginData, overallBusinessProfitability, avgInvoiceSize } = useAppContext();

    return (
        <div className="flex flex-col gap-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card text-center hover:border-primary border">
                    <Activity size={32} className="m-auto text-primary mb-2" />
                    <p className="text-text-muted text-sm font-semibold uppercase">Overall Business Profitability</p>
                    <h2 className="text-3xl font-bold mt-2">{overallBusinessProfitability}%</h2>
                </div>
                <div className="card text-center hover:border-success border">
                    <TrendingUp size={32} className="m-auto text-success mb-2" />
                    <p className="text-text-muted text-sm font-semibold uppercase">Monthly Growth</p>
                    <h2 className="text-3xl font-bold mt-2">+25%</h2>
                </div>
                <div className="card text-center hover:border-secondary border">
                    <Users size={32} className="m-auto text-secondary mb-2" />
                    <p className="text-text-muted text-sm font-semibold uppercase">Customer Lifetime Value</p>
                    <h2 className="text-3xl font-bold mt-2">₹1.5M</h2>
                </div>
                <div className="card text-center hover:border-warning border">
                    <Target size={32} className="m-auto text-warning mb-2" />
                    <p className="text-text-muted text-sm font-semibold uppercase">Avg Invoice Size</p>
                    <h2 className="text-3xl font-bold mt-2">₹{Number(avgInvoiceSize).toLocaleString()}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="text-xl font-bold mb-6 text-primary">Cost & Profitability Analysis (COGS vs Revenue)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={profitMarginData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" stackId="a" fill="#0A192F" name="Sales Revenue" />
                                <Bar dataKey="cost" stackId="b" fill="#E2E8F0" name="Cost of Goods Sold" />
                                <Bar dataKey="profit" stackId="b" fill="#10B981" name="Profit Margin" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-xl font-bold mb-6 text-primary">Customer Revenue Contribution</h3>
                    <div className="h-80 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={productRevenue.length > 0 ? productRevenue : [{ name: 'No Data', value: 1 }]}
                                    cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                                    fill="#8884d8" paddingAngle={5} dataKey="value"
                                    label
                                >
                                    {productRevenue.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 className="text-xl font-bold mb-6 text-primary">Monthly Revenue Growth & Sales Trend</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#008080" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#008080" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="sales" stroke="#008080" fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
