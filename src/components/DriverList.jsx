import React, { useState } from 'react';

function DriverList({ drivers, loads, onMakeCall, onAssignLoad }) {
  const [calling, setCalling] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedLoad, setSelectedLoad] = useState('');

  const handleCall = async (driverId) => {
    setCalling(driverId);
    await onMakeCall(driverId);
    setTimeout(() => setCalling(null), 3000);
  };

  const handleAssignLoad = (driver) => {
    setSelectedDriver(driver);
    setShowAssignModal(true);
  };

  const confirmAssignment = async () => {
    if (selectedDriver && selectedLoad) {
      setCalling(selectedDriver.id);
      await onAssignLoad(selectedDriver.id, selectedLoad);
      setShowAssignModal(false);
      setSelectedDriver(null);
      setSelectedLoad('');
      setTimeout(() => setCalling(null), 3000);
    }
  };

  const availableLoads = loads?.filter(load => load.status === 'available') || [];

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
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => handleCall(driver.id)}
                    disabled={calling === driver.id}
                    style={calling === driver.id ? {...styles.callBtn, ...styles.callBtnDisabled} : styles.callBtn}
                  >
                    {calling === driver.id ? '📞 Calling...' : '📞 Call Driver'}
                  </button>
                  
                  <button
                    onClick={() => handleAssignLoad(driver)}
                    disabled={calling === driver.id || availableLoads.length === 0}
                    style={availableLoads.length === 0 ? {...styles.assignBtn, ...styles.assignBtnDisabled} : styles.assignBtn}
                  >
                    🚛 Assign Load
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Load Assignment Modal */}
      {showAssignModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>🚛 Assign Load to {selectedDriver?.name}</h3>
              <button 
                onClick={() => setShowAssignModal(false)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <p style={styles.modalText}>
                Select a load to assign to <strong>{selectedDriver?.name}</strong>:
              </p>
              
              <select 
                value={selectedLoad} 
                onChange={(e) => setSelectedLoad(e.target.value)}
                style={styles.loadSelect}
              >
                <option value="">Select a load...</option>
                {availableLoads.map(load => (
                  <option key={load.id} value={load.id}>
                    {load.load_number} - {load.pickup_location} → {load.delivery_location} ({load.weight} lbs)
                  </option>
                ))}
              </select>
              
              <div style={styles.modalButtons}>
                <button 
                  onClick={() => setShowAssignModal(false)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmAssignment}
                  disabled={!selectedLoad}
                  style={selectedLoad ? styles.confirmBtn : {...styles.confirmBtn, ...styles.confirmBtnDisabled}}
                >
                  📞 Assign & Call Driver
                </button>
              </div>
            </div>
          </div>
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
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  assignBtn: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    flex: 1,
    minWidth: '120px',
  },
  assignBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '0',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
  modalHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
  },
  modalContent: {
    padding: '24px',
  },
  modalText: {
    marginBottom: '16px',
    color: '#374151',
    fontSize: '16px',
  },
  loadSelect: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '24px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    background: '#f3f4f6',
    color: '#374151',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  confirmBtn: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  confirmBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
};

export default DriverList;
