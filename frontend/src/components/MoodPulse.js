import React, { useState } from 'react';
import api from '../services/api';
import offlineSync from '../services/offlineSync';

const MoodPulse = () => {
  const emojis = ['🙂', '😐', '😞'];
  const [selectedMood, setSelectedMood] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckIn = async (emoji) => {
    setSelectedMood(emoji);
    setMessage('');

    try {
      if (navigator.onLine) {
        await api.post('/users/mood', { emoji });
        setMessage('Mood recorded successfully!');
      } else {
        offlineSync.addMoodOffline(emoji);
        setMessage('Mood saved offline');
      }
    } catch (error) {
      console.error('Mood check-in error:', error);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="card-modern">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">😊</span>
        </div>
        <h3 className="text-xl font-bold text-gradient">Mood Check-in</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">How are you feeling today?</p>
        
        <div className="flex justify-center space-x-4">
          {emojis.map(emoji => (
            <button 
              key={emoji} 
              onClick={() => handleCheckIn(emoji)} 
              className={`text-4xl p-4 rounded-2xl transition-all duration-200 transform hover:scale-110 ${
                selectedMood === emoji 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg scale-110' 
                  : 'hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Selected: <span className="font-medium">{selectedMood}</span>
            </p>
          </div>
        )}

        {message && (
          <div className={`p-4 rounded-xl ${
            message.includes('success') || message.includes('saved') 
              ? 'bg-green-100 border border-green-300 text-green-800' 
              : 'bg-red-100 border border-red-300 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              <span>{message.includes('success') || message.includes('saved') ? '✅' : '❌'}</span>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodPulse;