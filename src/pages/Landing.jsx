import { Link } from 'react-router-dom';
import { Mic, CheckCircle2, FileText, Landmark, BarChart3, ShieldCheck, ArrowRight, Activity, Smartphone } from 'lucide-react';

function Landing() {
    return (
        <div className="bg-background min-h-screen font-sans">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 bg-surface shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <Mic className="text-secondary" size={32} />
                    <h1 className="text-2xl font-bold text-primary">Voice-to-Bill</h1>
                </div>
                <div>
                    <Link to="/dashboard" className="btn btn-outline mr-4">Login</Link>
                    <Link to="/voice-billing" className="btn btn-primary">Try Demo</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="text-center py-20 bg-primary text-surface relative overflow-hidden text-surface">
                <div className="max-w-4xl m-auto px-6 relative z-10">
                    <h1 className="text-5xl font-bold mb-6">Speak the Transaction.<br /><span className="text-secondary-light">Generate the Invoice.</span> Automate Compliance.</h1>
                    <p className="text-xl mb-10 text-gray-300">The Ultimate AI-Powered Accounting Automation System for MSMEs. Convert spoken words into compliant invoices instantly.</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/dashboard" className="btn btn-secondary text-lg px-8 py-3 rounded-full font-bold">Try Voice Billing Demo</Link>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-20 px-6 max-w-6xl m-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">The Challenges Faced by MSMEs</h2>
                    <p className="text-text-muted">Traditional bookkeeping is holding your business back.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card text-center hover:border-danger">
                        <Activity className="text-danger m-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold mb-2">Time-Consuming Bookkeeping</h3>
                        <p className="text-text-muted">Hours wasted manually entering accounting data and matching books.</p>
                    </div>
                    <div className="card text-center hover:border-warning">
                        <FileText className="text-warning m-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold mb-2">Manual Invoice Entry</h3>
                        <p className="text-text-muted">High risk of human error during manual drafting of invoices and bills.</p>
                    </div>
                    <div className="card text-center hover:border-danger-light">
                        <Landmark className="text-danger-light m-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold mb-2">GST Compliance Errors</h3>
                        <p className="text-text-muted">Missing HSN codes, wrong GST percentages leading to tax penalties.</p>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 bg-surface px-6">
                <div className="max-w-6xl m-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-primary mb-6">Automate Accounting with Your Voice</h2>
                        <p className="text-text-muted mb-6 text-lg">No more typing. No more complex software. Just click the microphone and say: <br /><br /><span className="italic text-primary font-medium bg-background p-4 rounded-md inline-block border border-border border-l-4 border-l-secondary">"Sell 5 laptops to Arjun Traders at 40000 each with 18 percent GST"</span></p>
                        <p className="text-text-muted text-lg mb-8">Our AI understands context, extracts structural data, and generates a formatted, printable invoice in seconds contextually.</p>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-success" /> <span>99% Transcription Accuracy</span></li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-success" /> <span>Auto-Calculating Tax & GST Engine</span></li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-success" /> <span>Instant PDF Invoice Generation</span></li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-background p-8 rounded-lg shadow-inner border border-border relative">
                        <div className="absolute top-0 right-0 p-4"><Smartphone size={40} className="text-text-muted opacity-50" /></div>
                        <div className="bg-surface p-4 rounded-md shadow-md mb-4 border border-border">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="bg-secondary rounded-full p-2 text-surface animate-pulse"><Mic size={24} /></div>
                                <div className="font-medium text-lg text-primary">Listening...</div>
                            </div>
                            <div className="text-text-muted">Sell 10 keyboards to Tech Solutions...</div>
                        </div>
                        <div className="bg-surface p-4 text-center rounded-md shadow-md border border-border text-success font-medium">Invoice INV-2026-003 Generated ✅</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 max-w-6xl m-auto">
                <h2 className="text-3xl font-bold text-primary text-center mb-16">Platform Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="card">
                        <Mic className="text-secondary mb-4" size={32} />
                        <h3 className="font-bold text-xl mb-2">Voice Billing</h3>
                        <p className="text-text-muted">Convert speech directly into billing entries without touching the keyboard.</p>
                    </div>
                    <div className="card">
                        <FileText className="text-secondary mb-4" size={32} />
                        <h3 className="font-bold text-xl mb-2">Invoice Automation</h3>
                        <p className="text-text-muted">Draft formatted, professional-grade invoices dynamically ready for print/download.</p>
                    </div>
                    <div className="card">
                        <Landmark className="text-secondary mb-4" size={32} />
                        <h3 className="font-bold text-xl mb-2">GST Compliance</h3>
                        <p className="text-text-muted">Live GST computation with integrated missing GST number detection and alerts.</p>
                    </div>
                    <div className="card">
                        <BarChart3 className="text-secondary mb-4" size={32} />
                        <h3 className="font-bold text-xl mb-2">Power BI Style Analytics</h3>
                        <p className="text-text-muted">Visual charts and dashboard reporting for tracking total revenue, sales trends, etc.</p>
                    </div>
                    <div className="card">
                        <ShieldCheck className="text-secondary mb-4" size={32} />
                        <h3 className="font-bold text-xl mb-2">Internal Control</h3>
                        <p className="text-text-muted">Automatically detect duplicate entries, irregular large bills, and tax risk.</p>
                    </div>
                    <div className="card">
                        <Activity className="text-secondary mb-4" size={32} />
                        <h3 className="font-bold text-xl mb-2">Accounting Integrations</h3>
                        <p className="text-text-muted">Tally-style automated ledger entry generation on every invoice created.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-surface text-center">
                <div className="max-w-3xl m-auto px-6">
                    <h2 className="text-3xl font-bold mb-6 text-surface">Ready to Transform Your Business Accounting?</h2>
                    <p className="text-xl mb-8 text-gray-300">Join thousands of MSMEs automating their workflow today.</p>
                    <Link to="/dashboard" className="btn btn-secondary text-lg px-8 py-3 rounded-full font-bold inline-flex items-center gap-2">Enter Dashboard <ArrowRight /></Link>
                </div>
            </section>

            <footer className="bg-primary-light text-surface text-center py-6 text-sm text-gray-400">
                &copy; 2026 Voice-to-Bill. Hackathon Prototype.
            </footer>
        </div>
    );
}

export default Landing;
