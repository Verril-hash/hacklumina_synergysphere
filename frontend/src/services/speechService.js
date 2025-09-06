const start = (callback) => {
  try {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      callback('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log('Speech recognized:', text);
      callback(text);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      callback(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };

    recognition.start();
  } catch (error) {
    console.error('Error starting speech recognition:', error);
    callback('Error starting speech recognition');
  }
};

export default { start };