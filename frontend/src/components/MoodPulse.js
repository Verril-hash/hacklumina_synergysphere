import React from 'react';
import api from '../services/api';
import offlineSync from '../services/offlineSync';

const MoodPulse = () => {
  const emojis = ['🙂', '😐', '😞'];

  const handleCheckIn = (emoji) => {
    if (navigator.onLine) {
      api.post('/users/mood', { emoji });
    } else {
      offlineSync.addMoodOffline(emoji);
    }
  };

  return (
    <div>
      <h3>Mood Check-in</h3>
      {emojis.map(e => <button key={e} onClick={() => handleCheckIn(e)} className="text-2xl mx-2">{e}</button>)}
    </div>
  );
};

export default MoodPulse;