import { useState, useRef } from 'react';
import { Mic, CheckCircle2, Download, RefreshCw, Save, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const parseTransactionInfo = (text) => {
    const data = {
        customerName: "Walk-in Customer",
        productName: "General Item",
        quantity: 1,
        unitPrice: 0,
        gstPercentage: 0,
        totalAmount: 0,
        gstAmount: 0,
        id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0]
    };

    if (!text) return data;
    const textLower = text.toLowerCase();

    const qtyProdMatch = textLower.match(/(?:sell|sold)?\s*(\d+)\s+([a-z\s]+?)\s+(?:to|at|for|with)/);
    if (qtyProdMatch) {
        data.quantity = parseInt(qtyProdMatch[1]) || 1;
        data.productName = qtyProdMatch[2].trim().replace(/\b\w/g, c => c.toUpperCase());
    }

    const customerMatch = textLower.match(/to\s+([a-z\s]+?)\s+(?:at|for|with)/);
    if (customerMatch) {
        data.customerName = customerMatch[1].split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    const priceMatch = textLower.match(/(?:at|for)\s+(\d+)/);
    if (priceMatch) {
        data.unitPrice = parseInt(priceMatch[1]) || 0;
    }

    const gstMatch = textLower.match(/(\d+)\s*(?:percent|%)\s*gst/);
    if (gstMatch) {
        data.gstPercentage = parseInt(gstMatch[1]) || 0;
    }

    data.gstAmount = (data.quantity * data.unitPrice) * (data.gstPercentage / 100);
    data.totalAmount = (data.quantity * data.unitPrice) + data.gstAmount;

    return data;
}

function VoiceBilling() {
    const { addInvoice } = useAppContext();
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [extractedData, setExtractedData] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const invoiceRef = useRef();

    const handleVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support Speech Recognition. Try Google Chrome.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setListening(true);
            setTranscript('');
            setExtractedData(null);
            setShowInvoice(false);
        };

        let finalTranscript = '';

        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            const currentTranscript = finalTranscript || interimTranscript;
            setTranscript(currentTranscript);

            if (finalTranscript) {
                const data = parseTransactionInfo(finalTranscript);
                setExtractedData(data);

                // Voice Trigger logic
                const triggerCommands = ['generate bill', 'confirm bill', 'finalize', 'create invoice'];
                if (triggerCommands.some(cmd => finalTranscript.toLowerCase().includes(cmd))) {
                    recognition.stop();
                    addInvoice(data);
                    setShowInvoice(true);
                }
            }
        };

        recognition.onend = () => {
            setListening(false);
            if (!finalTranscript && transcript) {
                setExtractedData(parseTransactionInfo(transcript));
            }
        };

        recognition.start();
    };

    const handlePrint = () => {
        window.print();
    };

    const handleUpdateExtractedData = (field, value) => {
        setExtractedData(prev => {
            const newData = { ...prev, [field]: value };
            // Recalculate totals if numerical fields change
            if (['quantity', 'unitPrice', 'gstPercentage'].includes(field)) {
                const qty = field === 'quantity' ? parseFloat(value) || 0 : prev.quantity;
                const price = field === 'unitPrice' ? parseFloat(value) || 0 : prev.unitPrice;
                const gst = field === 'gstPercentage' ? parseFloat(value) || 0 : prev.gstPercentage;
                newData.gstAmount = (qty * price) * (gst / 100);
                newData.totalAmount = (qty * price) + newData.gstAmount;
            }
            return newData;
        });
    };

    return (
        <div className="flex gap-8 flex-col lg:flex-row h-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="card text-center no-print">
                    <h2 className="text-xl font-bold text-primary mb-4">Voice Transaction Input</h2>
                    <p className="text-text-muted mb-6">Click the microphone and speak your transaction clearly. <br /><span className="text-xs italic opacity-75">Tip: Say "generate bill" to finalize.</span></p>
                    <button
                        onClick={handleVoiceInput}
                        className={`w-24 h-24 rounded-full flex items-center justify-center m-auto transition shadow-lg ${listening ? 'bg-secondary animate-pulse text-white' : 'bg-primary text-white hover:bg-primary-light'}`}
                        style={{ border: 'none', cursor: 'pointer' }}
                    >
                        <Mic size={48} />
                    </button>

                    <div className="mt-8 bg-background p-4 rounded-md border text-left min-h-[80px]">
                        <p className="text-sm font-semibold text-text-muted mb-2">Live Transcript:</p>
                        <p className="text-primary font-medium">{transcript || "Waiting for audio..."}</p>
                    </div>
                </div>

                {extractedData && !showInvoice && (
                    <div className="card no-print border-success border">
                        <div className="flex items-center gap-2 text-success font-bold text-lg mb-4">
                            <CheckCircle2 /> Data Active (Editable)
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="text-sm text-text-muted mb-1 block">Customer Name</label>
                                <input type="text" className="input-field" value={extractedData.customerName} onChange={(e) => handleUpdateExtractedData('customerName', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-sm text-text-muted mb-1 block">Product Name</label>
                                <input type="text" className="input-field" value={extractedData.productName} onChange={(e) => handleUpdateExtractedData('productName', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-sm text-text-muted mb-1 block">Quantity</label>
                                <input type="number" className="input-field" value={extractedData.quantity} onChange={(e) => handleUpdateExtractedData('quantity', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-sm text-text-muted mb-1 block">Unit Price</label>
                                <input type="number" className="input-field" value={extractedData.unitPrice} onChange={(e) => handleUpdateExtractedData('unitPrice', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-sm text-text-muted mb-1 block">GST (%)</label>
                                <input type="number" className="input-field" value={extractedData.gstPercentage} onChange={(e) => handleUpdateExtractedData('gstPercentage', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-sm text-text-muted mb-1 block">Total Value (incl. GST)</label>
                                <input type="text" className="input-field font-bold text-primary" value={`₹${extractedData.totalAmount.toFixed(2)}`} readOnly />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="btn btn-primary w-full flex justify-center gap-2"
                                onClick={() => {
                                    addInvoice(extractedData);
                                    setShowInvoice(true);
                                }}
                            >
                                <FileText size={18} /> Confirm & Generate
                            </button>
                            <button
                                className="btn btn-outline w-full flex justify-center gap-2"
                                onClick={() => { setTranscript(''); setExtractedData(null); }}
                            >
                                <RefreshCw size={18} /> Clear
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full lg:w-1/2">
                {showInvoice ? (
                    <div className="card shadow-lg print:shadow-none print:border-none" ref={invoiceRef}>
                        <div className="flex justify-between items-center mb-8 border-b pb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-primary tracking-tight">INVOICE</h1>
                                <p className="text-text-muted font-medium mt-1">INV-2026-1042</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-bold text-primary flex items-center justify-end gap-1"><Mic className="text-secondary" size={24} /> Voice-to-Bill</h2>
                                <p className="text-text-muted text-sm mt-1">123 Tech Park, Bengaluru</p>
                                <p className="text-text-muted text-sm">GSTIN: 29AAACV1234D1Z5</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2">Billed To:</p>
                                <h3 className="font-bold text-lg text-primary">{extractedData.customerName}</h3>
                                <p className="text-text-muted text-sm mt-1">Acme Business Center, Mumbai</p>
                            </div>
                            <div className="text-right">
                                <div className="mb-2">
                                    <span className="text-sm font-semibold text-text-muted uppercase tracking-wide">Date:</span>
                                    <span className="font-medium ml-2">{"10-Mar-2026"}</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-text-muted uppercase tracking-wide">Due Date:</span>
                                    <span className="font-medium ml-2">{"25-Mar-2026"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="table-container mb-8 border border-border rounded-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-background">
                                    <tr>
                                        <th className="py-3 px-4 text-left font-semibold text-text-muted text-sm uppercase">Item Description</th>
                                        <th className="py-3 px-4 text-center font-semibold text-text-muted text-sm uppercase">Qty</th>
                                        <th className="py-3 px-4 text-right font-semibold text-text-muted text-sm uppercase">Rate</th>
                                        <th className="py-3 px-4 text-right font-semibold text-text-muted text-sm uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="py-4 px-4 font-medium text-primary">{extractedData.productName}</td>
                                        <td className="py-4 px-4 text-center">{extractedData.quantity}</td>
                                        <td className="py-4 px-4 text-right">₹{extractedData.unitPrice.toLocaleString()}</td>
                                        <td className="py-4 px-4 text-right font-medium">₹{(extractedData.quantity * extractedData.unitPrice).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mb-8">
                            <div className="w-1/2">
                                <div className="flex justify-between py-2 text-text-muted">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{(extractedData.quantity * extractedData.unitPrice).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 text-text-muted border-b">
                                    <span>GST ({extractedData.gstPercentage}%)</span>
                                    <span className="font-medium">₹{extractedData.gstAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-4 text-xl font-bold text-primary">
                                    <span>Total Amount</span>
                                    <span>₹{extractedData.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6 text-sm text-text-muted text-center">
                            <p>Thank you for your business. Please process the payment within 15 days.</p>
                            <p className="mt-1">Computer generated invoice via Voice-to-Bill AI.</p>
                        </div>

                        <div className="mt-8 flex gap-4 no-print justify-end">
                            <button className="btn btn-outline flex gap-2 items-center"><Save size={18} /> Save as Draft</button>
                            <button onClick={handlePrint} className="btn btn-primary flex gap-2 items-center"><Download size={18} /> Download PDF</button>
                        </div>
                    </div>
                ) : (
                    <div className="card h-full flex items-center justify-center bg-gray-50 border-dashed border-2 border-border no-print">
                        <div className="text-center text-text-muted">
                            <FileText size={48} className="m-auto mb-4 opacity-50" />
                            <p className="text-lg">Invoice preview will appear here</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VoiceBilling;
