import React, { useEffect, useState } from 'react';
import localAnalytics from '../services/localAnalytics';

const RiskAlert = ({ task }) => {
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const checkRisk = () => {
      if (!task || !task.dueDate) return;
      
      try {
        const due = new Date(task.dueDate);
        const now = new Date();
        const oneDayFromNow = new Date(now.getTime() + 86400000);
        
        if (due < oneDayFromNow && task.status === 'To-Do') {
          setAlert('At Risk ⚠️');
          localAnalytics.trackEvent('risk_alert', { taskId: task.id, dueDate: task.dueDate });
        } else if (due < now && task.status !== 'Done') {
          setAlert('Overdue 🚨');
          localAnalytics.trackEvent('overdue_alert', { taskId: task.id, dueDate: task.dueDate });
        } else {
          setAlert('');
        }
      } catch (error) {
        console.error('Error checking risk:', error);
      }
    };
    
    checkRisk();
  }, [task]);

  if (!alert) return null;

  return (
    <div className={`p-2 rounded text-sm font-medium ${
      alert.includes('Overdue') ? 'bg-red-300 text-red-800' : 'bg-yellow-200 text-yellow-800'
    }`}>
      {alert}
    </div>
  );
};

export default RiskAlert;