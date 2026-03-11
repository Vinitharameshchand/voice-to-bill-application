import { useAppContext } from '../context/AppContext';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, ComposedChart,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    RadialBarChart, RadialBar, Legend
} from 'recharts';
import { DollarSign, FileText, Banknote, TrendingUp, PieChart as PieIcon, ArrowUpRight, Clock, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLORS = ['#0A192F', '#008080', '#00B4B4', '#1E293B'];

function Dashboard() {
    const { dashboardData, salesData, productRevenue, gstData, invoices, profitMarginData, overallBusinessProfitability } = useAppContext();

    // Custom data for Radar Chart (derived from actual metrics)
    const healthData = [
        { subject: 'Growth', A: salesData.length * 10, fullMark: 100 },
        { subject: 'Compliance', A: 95, fullMark: 100 },
        { subject: 'Profitability', A: parseFloat(overallBusinessProfitability), fullMark: 100 },
        { subject: 'Efficiency', A: invoices.length > 0 ? 80 : 0, fullMark: 100 },
        { subject: 'Risk', A: 10, fullMark: 100 },
    ];

    return (
        <div className="flex flex-col gap-6 bg-background min-h-screen">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card border-none bg-gradient-to-br from-primary to-primary-light text-surface p-4 flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform"><TrendingUp size={100} /></div>
                    <div className="flex justify-between items-start relative z-10">
                        <TrendingUp className="opacity-60" size={20} />
                        <span className="text-[10px] bg-secondary px-2 py-1 rounded text-white font-bold">+14.2%</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Sales</p>
                        <h3 className="text-2xl font-bold">₹{dashboardData.totalRevenue.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="card border-none shadow-sm p-4 flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform"><DollarSign size={100} /></div>
                    <div className="flex justify-between items-start relative z-10">
                        <DollarSign className="text-secondary" size={20} />
                        <span className="text-[10px] bg-success-light text-success px-2 py-1 rounded font-bold">LIVE</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-text-muted text-[10px] font-bold uppercase tracking-wider mb-1">Net Revenue</p>
                        <h3 className="text-2xl font-bold">₹{(dashboardData.totalRevenue - dashboardData.gstLiability).toLocaleString()}</h3>
                    </div>
                </div>

                <div className="card border-none shadow-sm p-4 flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform"><Banknote size={100} /></div>
                    <div className="flex justify-between items-start relative z-10">
                        <Banknote className="text-danger" size={20} />
                        <span className="text-[10px] text-danger font-bold underline cursor-pointer">PAY NOW</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-text-muted text-[10px] font-bold uppercase tracking-wider mb-1">GST Liability</p>
                        <h3 className="text-2xl font-bold">₹{dashboardData.gstLiability.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="card border-none bg-secondary text-surface p-4 flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform"><Zap size={100} /></div>
                    <div className="flex justify-between items-start relative z-10">
                        <Zap className="opacity-70" size={20} />
                        <span className="text-[10px] bg-primary text-white px-2 py-1 rounded font-bold">PROFIT</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-teal-200 text-[10px] font-bold uppercase tracking-wider mb-1">Margin Index</p>
                        <h3 className="text-2xl font-bold">{overallBusinessProfitability}%</h3>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 1. Composed Chart - Main Intelligence */}
                <div className="lg:col-span-8 card bg-surface shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-md font-bold text-primary flex items-center gap-2"><Activity size={18} className="text-secondary" /> Performance Matrix</h3>
                            <p className="text-xs text-text-muted">Real-time revenue vs profit distribution</p>
                        </div>
                        <div className="flex gap-4 text-[10px] font-bold">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-secondary"></div> Revenue</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div> Profit</span>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={profitMarginData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#008080" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#008080" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(v) => `₹${v / 1000}k`} />
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#008080" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                                <Bar dataKey="profit" barSize={20} fill="#0A192F" radius={[4, 4, 0, 0]} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Radar Chart - Business Health */}
                <div className="lg:col-span-4 card bg-surface shadow-sm flex flex-col">
                    <h3 className="text-md font-bold text-primary mb-2">Compliance Scorecard</h3>
                    <p className="text-[10px] text-text-muted mb-6">Multi-dimensional risk assessment</p>
                    <div className="h-64 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                                <Radar name="Score" dataKey="A" stroke="#008080" fill="#008080" fillOpacity={0.6} dot />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-3 bg-background rounded-lg border-l-4 border-secondary">
                        <p className="text-[10px] font-bold text-primary uppercase">Strategy Tip</p>
                        <p className="text-[10px] text-text-muted">Maintain high compliance to reduce audit probability.</p>
                    </div>
                </div>

                {/* 3. Product Distribution Wheel */}
                <div className="lg:col-span-4 card bg-surface shadow-sm text-center">
                    <h3 className="text-md font-bold text-primary mb-2">Revenue Mix</h3>
                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={productRevenue.length > 0 ? productRevenue : [{ name: 'Empty', value: 1 }]}
                                    cx="50%" cy="50%" innerRadius={70} outerRadius={95}
                                    paddingAngle={8} dataKey="value" stroke="none"
                                >
                                    {productRevenue.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                                    ))}
                                    {productRevenue.length === 0 && <Cell fill="#f1f5f9" />}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 text-left">
                        {productRevenue.slice(0, 3).map((p, i) => (
                            <div key={p.name} className="flex justify-between items-center text-[10px]">
                                <span className="flex items-center gap-2 font-medium text-text-muted">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div> {p.name}
                                </span>
                                <span className="font-bold">₹{p.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. GST Bar Chart - Mini View */}
                <div className="lg:col-span-4 card border-none bg-primary text-surface shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={120} /></div>
                    <h3 className="text-md font-bold mb-1 relative z-10">GST Tracker</h3>
                    <p className="text-[10px] opacity-60 mb-6 relative z-10">Monthly tax reconciliation</p>
                    <div className="h-56 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gstData}>
                                <XAxis dataKey="month" hide />
                                <Bar dataKey="collected" fill="#008080" radius={[4, 4, 0, 0]} barSize={12} />
                                <Bar dataKey="payable" fill="#ffffff20" radius={[4, 4, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-2 relative z-10 flex justify-between items-center">
                        <div>
                            <p className="text-[9px] uppercase opacity-50 font-bold">Next GST Filing</p>
                            <p className="text-sm font-bold">20 March, 2026</p>
                        </div>
                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-[10px] font-bold transition">PREPARE</button>
                    </div>
                </div>

                {/* 5. Transactions Table / Activity */}
                <div className="lg:col-span-4 card bg-surface shadow-sm p-0 overflow-hidden">
                    <div className="p-4 border-b bg-gray-50/50 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-primary flex items-center gap-2"><Clock size={16} className="text-secondary" /> Recent Ledgers</h3>
                        <Link to="/invoices" className="text-[10px] font-bold text-secondary hover:underline">VIEW ALL</Link>
                    </div>
                    <div className="max-h-[340px] overflow-y-auto">
                        {invoices.slice(0, 10).map((inv, idx) => (
                            <div key={inv.id} className={`p-4 flex items-center justify-between border-b last:border-0 hover:bg-background transition ${idx % 2 === 0 ? 'bg-surface' : 'bg-gray-50/30'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                                        {inv.customerName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-primary leading-tight">{inv.customerName}</p>
                                        <p className="text-[9px] text-text-muted mt-0.5">{inv.id} • {inv.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] font-bold text-primary">₹{inv.totalAmount.toLocaleString()}</p>
                                    <span className="text-[8px] tracking-tighter uppercase font-extrabold text-success mt-1 block">VERIFIED</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
