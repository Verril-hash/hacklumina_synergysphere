import React, { useState } from 'react';
import speechService from '../services/speechService';
import api from '../services/api';
import offlineSync from '../services/offlineSync';

const StandupRecorder = () => {
  const [update, setUpdate] = useState('');
  const [recording, setRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleRecord = () => {
    setRecording(true);
    setMessage('');
    speechService.start((text) => {
      setUpdate(text);
      setRecording(false);
      if (text.includes('error') || text.includes('not supported')) {
        setMessage(text);
      }
    });
  };

  const handleSubmit = async () => {
    if (!update.trim()) {
      setMessage('Please enter or record an update');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      if (navigator.onLine) {
        await api.post('/users/standup', { update });
        setMessage('Standup submitted successfully!');
        setUpdate('');
      } else {
        offlineSync.addStandupOffline(update);
        setMessage('Standup saved offline');
        setUpdate('');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card-modern">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">🎤</span>
        </div>
        <h3 className="text-xl font-bold text-gradient">Daily Stand-up</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex space-x-3">
          <button 
            onClick={handleRecord} 
            disabled={recording}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              recording 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'btn-secondary hover:shadow-lg'
            }`}
          >
            {recording ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Recording...</span>
              </>
            ) : (
              <>
                <span>🎤</span>
                <span>Voice Record</span>
              </>
            )}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What I did / Blockers / Next
          </label>
          <textarea 
            value={update} 
            onChange={e => setUpdate(e.target.value)} 
            placeholder="Share your daily update..."
            className="input-modern w-full h-24 resize-none"
          />
        </div>

        <button 
          onClick={handleSubmit}
          disabled={submitting || !update.trim()}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            submitting || !update.trim() 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'btn-success hover:shadow-lg'
          }`}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>📝</span>
              <span>Submit Update</span>
            </>
          )}
        </button>

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

export default StandupRecorder;