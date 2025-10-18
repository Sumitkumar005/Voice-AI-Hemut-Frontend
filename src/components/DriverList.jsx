import React, { useState } from 'react';

function DriverList({ drivers, onMakeCall }) {
  const [calling, setCalling] = useState(null);

  const handleCall = async (driverId) => {
    setCalling(driverId);
    await onMakeCall(driverId);
    setTimeout(() => setCalling(null), 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>👥 Driver Fleet</h2>
        <p style={styles.subtitle}>Click "Call Driver" to check their status via AI voice call</p>
      </div>

      {drivers.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No drivers found. Add drivers to your database.</p>
        </div>
      ) : (
        <div style={styles.driverGrid}>
          {drivers.map((driver) => (
            <div key={driver.id} style={styles.driverCard}>
              <div style={styles.cardHeader}>
                <div style={styles.driverInfo}>
                  <h3 style={styles.driverName}>{driver.name}</h3>
                  <p style={styles.driverPhone}>📱 {driver.phone}</p>
                </div>
                <div style={driver.is_loaded ? styles.statusLoaded : styles.statusAvailable}>
                  {driver.is_loaded ? '🚛 Loaded' : '✅ Available'}
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span style={styles.label}>📍 Location:</span>
                  <span style={styles.value}>{driver.current_location || 'Unknown'}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>🏋️ Capacity:</span>
                  <span style={styles.value}>{driver.truck_capacity?.toLocaleString()} lbs</span>
                </div>
              </div>

              <div style={styles.cardFooter}>
                <button
                  onClick={() => handleCall(driver.id)}
                  disabled={calling === driver.id}
                  style={calling === driver.id ? {...styles.callBtn, ...styles.callBtnDisabled} : styles.callBtn}
                >
                  {calling === driver.id ? '📞 Calling...' : '📞 Call Driver'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
  },
  emptyState: {
    background: 'white',
    borderRadius: '12px',
    padding: '60px',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '16px',
  },
  driverGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  driverCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  cardHeader: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '5px',
  },
  driverPhone: {
    fontSize: '14px',
    color: '#6b7280',
  },
  statusLoaded: {
    background: '#d1fae5',
    color: '#065f46',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
  },
  statusAvailable: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
  },
  cardBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
  },
  value: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600',
  },
  cardFooter: {
    padding: '15px 20px',
    background: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
  },
  callBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
  },
  callBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    background: '#9ca3af',
    boxShadow: 'none',
  },
};

export default DriverList;