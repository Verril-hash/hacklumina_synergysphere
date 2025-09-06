import React, { useState, useEffect } from 'react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);

    // Detect low bandwidth (simple: check connection type)
    if (navigator.connection) {
      setIsLowBandwidth(navigator.connection.downlink < 1); // <1Mbps
    }

    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  if (isLowBandwidth) {
    // Switch to text-only mode (add class to body or conditional render)
    document.body.classList.add('text-only');
  }

  return !isOnline ? <div className="bg-yellow-500 p-2 text-center">Offline Mode</div> : null;
};

export default OfflineIndicator;