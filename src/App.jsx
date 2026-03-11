import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import VoiceBilling from './pages/VoiceBilling';
import Invoices from './pages/Invoices';
import GSTSummary from './pages/GSTSummary';
import Analytics from './pages/Analytics';
import RiskMonitoring from './pages/RiskMonitoring';
import Workflow from './pages/Workflow';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/voice-billing" element={<VoiceBilling />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/gst-summary" element={<GSTSummary />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/risk-monitoring" element={<RiskMonitoring />} />
            <Route path="/workflow" element={<Workflow />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
