import React, { useEffect, useState } from 'react';
import localAnalytics from '../services/localAnalytics';

const RiskAlert = ({ task }) => {
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const checkRisk = () => {
      const due = new Date(task.dueDate);
      if (due < new Date(Date.now() + 86400000) && task.status === 'To-Do') {
        setAlert('At Risk ⚠');
      }
    };
    checkRisk();
  }, [task]);

  return alert ? <div className="bg-red-200 p-2">{alert}</div> : null;
};

export default RiskAlert;