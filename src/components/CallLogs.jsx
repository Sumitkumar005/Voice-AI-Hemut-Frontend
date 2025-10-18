import React from 'react';

function CallLogs({ logs }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📞 Call History</h2>
        <p style={styles.subtitle}>Complete log of all AI voice interactions</p>
      </div>

      {logs.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📞</div>
          <h3 style={styles.emptyTitle}>No Call History</h3>
          <p style={styles.emptyText}>Make your first call from the Drivers tab to see logs here</p>
        </div>
      ) : (
        <div style={styles.logsContainer}>
          <div style={styles.tableHeader}>
            <div style={styles.colDriver}>Driver</div>
            <div style={styles.colStatus}>Status</div>
            <div style={styles.colLocation}>Location</div>
            <div style={styles.colReason}>Reason/Notes</div>
            <div style={styles.colTime}>Time</div>
          </div>

          {logs.map((log) => (
            <div key={log.id} style={styles.logRow}>
              <div style={styles.colDriver}>
                <div style={styles.driverCell}>
                  <div style={styles.driverAvatar}>
                    {log.drivers?.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <div style={styles.driverName}>{log.drivers?.name || 'Unknown'}</div>
                    <div style={styles.driverPhone}>{log.drivers?.phone || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div style={styles.colStatus}>
                <span style={log.is_loaded ? styles.badgeLoaded : styles.badgeEmpty}>
                  {log.is_loaded ? '✅ Loaded' : '❌ Empty'}
                </span>
              </div>

              <div style={styles.colLocation}>
                <span style={styles.locationText}>
                  📍 {log.current_location || 'Not specified'}
                </span>
              </div>

              <div style={styles.colReason}>
                {log.is_loaded ? (
                  <span style={styles.successText}>En route to destination</span>
                ) : (
                  <span style={styles.reasonText}>
                    {log.reason_not_loaded || 'No reason provided'}
                  </span>
                )}
              </div>

              <div style={styles.colTime}>
                <div style={styles.timeText}>{formatDate(log.created_at)}</div>
                {log.call_sid && (
                  <div style={styles.callId}>ID: {log.call_sid.slice(0, 8)}...</div>
                )}
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
    padding: '80px 40px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '10px',
  },
  emptyText: {
    fontSize: '16px',
    color: '#6b7280',
  },
  logsContainer: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.5fr 2fr 1.5fr',
    gap: '15px',
    padding: '20px 25px',
    background: '#f9fafb',
    borderBottom: '2px solid #e5e7eb',
    fontWeight: '600',
    fontSize: '14px',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  logRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.5fr 2fr 1.5fr',
    gap: '15px',
    padding: '20px 25px',
    borderBottom: '1px solid #e5e7eb',
    transition: 'background 0.2s',
    alignItems: 'center',
  },
  colDriver: { display: 'flex', alignItems: 'center' },
  colStatus: { display: 'flex', alignItems: 'center' },
  colLocation: { display: 'flex', alignItems: 'center' },
  colReason: { display: 'flex', alignItems: 'center' },
  colTime: { display: 'flex', flexDirection: 'column', gap: '4px' },
  driverCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  driverAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  driverName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1f2937',
  },
  driverPhone: {
    fontSize: '13px',
    color: '#9ca3af',
  },
  badgeLoaded: {
    background: '#d1fae5',
    color: '#065f46',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'inline-block',
  },
  badgeEmpty: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'inline-block',
  },
  locationText: {
    fontSize: '14px',
    color: '#4b5563',
  },
  successText: {
    fontSize: '14px',
    color: '#059669',
    fontStyle: 'italic',
  },
  reasonText: {
    fontSize: '14px',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  timeText: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '500',
  },
  callId: {
    fontSize: '12px',
    color: '#9ca3af',
  },
};

export default CallLogs;