const init = () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    // Register for push
  }
  // Local drafts: use localforage for offline notifications
};

export default { init };