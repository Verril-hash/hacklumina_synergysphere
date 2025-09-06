import React, { useState } from 'react';

const MergeConflictResolver = ({ local, server, onResolve }) => {
  const [merged, setMerged] = useState({ ...server });

  return (
    <div className="flex">
      <div>Local: {JSON.stringify(local)}</div>
      <div>Server: {JSON.stringify(server)}</div>
      <button onClick={() => onResolve(merged)}>Merge</button>
    </div>
  );
};

export default MergeConflictResolver;