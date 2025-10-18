import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import DriverList from './components/DriverList';
import CallLogs from './components/CallLogs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [drivers, setDrivers] = useState([]);
  const [loads, setLoads] = useState([]);
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('drivers');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [driversRes, loadsRes, logsRes] = await Promise.all([
        fetch(`${API_URL}/api/drivers`),
        fetch(`${API_URL}/api/loads`),
        fetch(`${API_URL}/api/call-logs`)
      ]);

      const driversData = await driversRes.json();
      const loadsData = await loadsRes.json();
      const logsData = await logsRes.json();

      setDrivers(driversData.drivers || []);
      setLoads(loadsData.loads || []);
      setCallLogs(logsData.logs || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Make sure backend is running on port 8000');
    } finally {
      setLoading(false);
    }
  };

  const makeCall = async (driverId) => {
    try {
      const response = await fetch(`${API_URL}/api/make-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ driver_id: driverId }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const isTestMode = data.call_id?.startsWith('test_call_');
        const message = isTestMode 
          ? `🧪 TEST MODE: Simulated call to ${data.driver.name}\n(Status will update in 5 seconds)`
          : `✅ Call initiated to ${data.driver.name}`;
        
        alert(message);
        
        // Refresh data after appropriate delay
        const refreshDelay = isTestMode ? 6000 : 3000;
        setTimeout(fetchData, refreshDelay);
      } else {
        // Show the specific error message from backend
        const errorMsg = data.detail || data.message || 'Failed to initiate call';
        alert(`❌ ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error making call:', error);
      alert('❌ Network error - check if backend is running');
    }
  };

  useEffect(() => {
    fetchData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading Hemut Dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>🚚 Hemut Voice AI</h1>
          <p style={styles.subtitle}>Driver Management System</p>
        </div>
        <button onClick={fetchData} style={styles.refreshBtn}>
          🔄 Refresh
        </button>
      </header>

      <nav style={styles.nav}>
        <button
          style={activeTab === 'dashboard' ? {...styles.navBtn, ...styles.navBtnActive} : styles.navBtn}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          style={activeTab === 'drivers' ? {...styles.navBtn, ...styles.navBtnActive} : styles.navBtn}
          onClick={() => setActiveTab('drivers')}
        >
          👥 Drivers
        </button>
        <button
          style={activeTab === 'logs' ? {...styles.navBtn, ...styles.navBtnActive} : styles.navBtn}
          onClick={() => setActiveTab('logs')}
        >
          📞 Call Logs
        </button>
      </nav>

      <main style={styles.main}>
        {activeTab === 'dashboard' && <Dashboard drivers={drivers} loads={loads} callLogs={callLogs} />}
        {activeTab === 'drivers' && <DriverList drivers={drivers} onMakeCall={makeCall} />}
        {activeTab === 'logs' && <CallLogs logs={callLogs} />}
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7fa',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #e0e0e0',
    borderTop: '5px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '30px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '16px',
    opacity: 0.9,
  },
  refreshBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid white',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  nav: {
    background: 'white',
    padding: '0 40px',
    display: 'flex',
    gap: '10px',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  navBtn: {
    background: 'none',
    border: 'none',
    padding: '15px 25px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#6b7280',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s',
  },
  navBtnActive: {
    color: '#2563eb',
    borderBottom: '3px solid #2563eb',
  },
  main: {
    padding: '40px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
};

// Add spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default App;