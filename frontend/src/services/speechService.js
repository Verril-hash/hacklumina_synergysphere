const start = (callback) => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    // Simple parse: extract title, assignee, due date with regex
    const title = text.match(/title (.*?) assignee/)?.[1] || text;
    callback(title); // Expand for structured
  };
  recognition.start();
};

export default { start };