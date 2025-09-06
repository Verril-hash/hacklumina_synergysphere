import React from 'react';
import ProjectList from '../components/ProjectList';
import NotificationBell from '../components/NotificationBell';
import UnifiedInbox from '../components/UnifiedInbox';

const Dashboard = () => {
  return (
    <div>
      <NotificationBell />
      <ProjectList />
      <UnifiedInbox />
    </div>
  );
};

export default Dashboard;