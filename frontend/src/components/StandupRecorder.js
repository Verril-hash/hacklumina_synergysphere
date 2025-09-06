import React, { useState } from 'react';
import speechService from '../services/speechService';
import api from '../services/api';
import offlineSync from '../services/offlineSync';

const StandupRecorder = () => {
  const [update, setUpdate] = useState('');
  const [recording, setRecording] = useState(false);

  const handleRecord = () => {
    setRecording(true);
    speechService.start((text) => {
      setUpdate(text);
      setRecording(false);
    });
  };

  const handleSubmit = () => {
    if (navigator.onLine) {
      api.post('/users/standup', { update });
    } else {
      offlineSync.addStandupOffline(update);
    }
  };

  return (
    <div>
      <h3>Mini Stand-up</h3>
      <button onClick={handleRecord} className="bg-purple-500 text-white p-2">{recording ? 'Recording...' : 'Record Update'}</button>
      <textarea value={update} onChange={e => setUpdate(e.target.value)} placeholder="What I did / Blockers / Next" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StandupRecorder;