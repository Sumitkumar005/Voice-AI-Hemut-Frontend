import React from 'react';

function Dashboard({ drivers, loads, callLogs }) {
  const loadedDrivers = drivers.filter(d => d.is_loaded).length;
  const availableDrivers = drivers.filter(d => !d.is_loaded).length;
  const recentCalls = callLogs.slice(0, 5);

  return (
    <div style={styles.container}>
      <div style={styles.statsGrid}>
        <div style={{...styles.statCard, ...styles.cardBlue}}>
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{drivers.length}</h3>
            <p style={styles.statLabel}>Total Drivers</p>
          </div>
        </div>

        <div style={{...styles.statCard, ...styles.cardGreen}}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{loadedDrivers}</h3>
            <p style={styles.statLabel}>Loaded</p>
          </div>
        </div>

        <div style={{...styles.statCard, ...styles.cardOrange}}>
          <div style={styles.statIcon}>🚛</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{availableDrivers}</h3>
            <p style={styles.statLabel}>Available</p>
          </div>
        </div>

        <div style={{...styles.statCard, ...styles.cardPurple}}>
          <div style={styles.statIcon}>📦</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{loads.length}</h3>
            <p style={styles.statLabel}>Available Loads</p>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📞 Recent Calls</h2>
        {recentCalls.length === 0 ? (
          <p style={styles.emptyState}>No calls yet. Make a call from the Drivers tab!</p>
        ) : (
          <div style={styles.callsList}>
            {recentCalls.map((log) => (
              <div key={log.id} style={styles.callItem}>
                <div style={styles.callHeader}>
                  <span style={styles.driverName}>
                    {log.drivers?.name || 'Unknown Driver'}
                  </span>
                  <span style={log.is_loaded ? styles.badgeLoaded : styles.badgeEmpty}>
                    {log.is_loaded ? '✅ Loaded' : '❌ Empty'}
                  </span>
                </div>
                <div style={styles.callDetails}>
                  <span>📍 {log.current_location || 'N/A'}</span>
                  {!log.is_loaded && log.reason_not_loaded && (
                    <span style={styles.reason}>💬 {log.reason_not_loaded}</span>
                  )}
                </div>
                <div style={styles.callTime}>
                  {new Date(log.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  cardBlue: { borderLeft: '5px solid #3b82f6' },
  cardGreen: { borderLeft: '5px solid #10b981' },
  cardOrange: { borderLeft: '5px solid #f59e0b' },
  cardPurple: { borderLeft: '5px solid #8b5cf6' },
  statIcon: {
    fontSize: '40px',
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '5px 0 0 0',
  },
  section: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '20px',
  },
  emptyState: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '40px',
    fontSize: '16px',
  },
  callsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  callItem: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '15px',
    transition: 'all 0.2s',
  },
  callHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  driverName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
  },
  badgeLoaded: {
    background: '#d1fae5',
    color: '#065f46',
    padding: '5px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  badgeEmpty: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '5px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  callDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '8px',
    color: '#4b5563',
    fontSize: '14px',
  },
  reason: {
    fontStyle: 'italic',
    color: '#6b7280',
  },
  callTime: {
    fontSize: '12px',
    color: '#9ca3af',
  },
};

export default Dashboard;
