/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [invoices, setInvoices] = useState(() => {
        const saved = localStorage.getItem('v2b_invoices');
        if (saved) return JSON.parse(saved);
        return []; // No mock data!
    });

    useEffect(() => {
        localStorage.setItem('v2b_invoices', JSON.stringify(invoices));
    }, [invoices]);

    const addInvoice = (invoice) => {
        setInvoices(prev => [invoice, ...prev]);
    };

    // Derive metrics
    const dashboardData = {
        dailySales: invoices.filter(inv => new Date(inv.date).toDateString() === new Date().toDateString()).reduce((acc, inv) => acc + inv.totalAmount, 0),
        totalRevenue: invoices.reduce((acc, inv) => acc + inv.totalAmount, 0),
        invoicesCreated: invoices.length,
        gstLiability: invoices.reduce((acc, inv) => acc + inv.gstAmount, 0),
        profitOverview: invoices.reduce((acc, inv) => acc + (inv.totalAmount * 0.3), 0) // Assume 30% margin
    };

    // Derive sales data (by month)
    const salesMap = {};
    invoices.forEach(inv => {
        const month = new Date(inv.date).toLocaleString('default', { month: 'short' });
        salesMap[month] = (salesMap[month] || 0) + inv.totalAmount;
    });
    const salesData = Object.keys(salesMap).map(k => ({ name: k, sales: salesMap[k] }));

    // Derive product revenue
    const productMap = {};
    invoices.forEach(inv => {
        productMap[inv.productName] = (productMap[inv.productName] || 0) + inv.totalAmount;
    });
    const productRevenue = Object.keys(productMap).map(k => ({ name: k, value: productMap[k] }));

    // Derive GST data
    const gstMap = {};
    let totalGstCollected = 0;
    let totalGstPayable = 0;
    let totalItc = 0;

    invoices.forEach(inv => {
        const month = new Date(inv.date).toLocaleString('default', { month: 'short' });
        if (!gstMap[month]) gstMap[month] = { collected: 0, payable: 0 };

        gstMap[month].collected += inv.gstAmount;
        gstMap[month].payable += inv.gstAmount * 0.9; // 10% input tax credit assumed for calculation

        totalGstCollected += inv.gstAmount;
        totalGstPayable += (inv.gstAmount * 0.9);
        totalItc += (inv.gstAmount * 0.1);
    });
    const gstData = Object.keys(gstMap).map(k => ({ month: k, ...gstMap[k] }));

    // Derive Journal Entries
    const journalEntries = invoices.flatMap((inv) => {
        return [
            { id: `${inv.id}-1`, date: inv.date, account: 'Accounts Receivable', debit: inv.totalAmount, credit: 0, ref: inv.id },
            { id: `${inv.id}-2`, date: inv.date, account: 'Sales Revenue', debit: 0, credit: (inv.totalAmount - inv.gstAmount), ref: inv.id },
            { id: `${inv.id}-3`, date: inv.date, account: 'GST Payable', debit: 0, credit: inv.gstAmount, ref: inv.id }
        ];
    });

    // Calculate profit margin array (for Analytics)
    const profitMarginData = Object.keys(salesMap).map(k => ({
        name: k,
        revenue: salesMap[k],
        cost: salesMap[k] * 0.7,
        profit: salesMap[k] * 0.3
    }));

    // Find risk alerts
    const riskAlerts = [];
    invoices.forEach(inv => {
        if (inv.totalAmount > 200000) {
            riskAlerts.push({ id: `risk-large-${inv.id}`, type: 'large-transaction', title: 'Large Transaction Alert', message: `${inv.id} value exceeds ₹2,00,000 threshold`, severity: 'info' });
        }
    });

    // Compute analytics numbers
    const totalCost = invoices.reduce((acc, inv) => acc + (inv.totalAmount - inv.gstAmount) * 0.7, 0);
    const revWithoutGst = invoices.reduce((acc, inv) => acc + (inv.totalAmount - inv.gstAmount), 0);
    const overallBusinessProfitability = revWithoutGst > 0 ? ((revWithoutGst - totalCost) / revWithoutGst * 100).toFixed(1) : 0;

    const avgInvoiceSize = invoices.length > 0 ? (dashboardData.totalRevenue / invoices.length).toFixed(0) : 0;

    return (
        <AppContext.Provider value={{
            invoices, addInvoice,
            dashboardData, salesData, productRevenue, gstData, journalEntries, profitMarginData, riskAlerts,
            totalGstCollected, totalGstPayable, totalItc, overallBusinessProfitability, avgInvoiceSize
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
