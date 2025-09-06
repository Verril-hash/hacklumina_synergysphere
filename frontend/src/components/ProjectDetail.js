import React from 'react';
import { useParams } from 'react-router-dom';
import TaskList from './TaskList';
import DiscussionThread from './DiscussionThread';
import MoodPulse from './MoodPulse';
import PriorityGrid from './PriorityGrid';
import UnifiedInbox from './UnifiedInbox';
import StandupRecorder from './StandupRecorder';

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Project {id}</h1>
      <TaskList projectId={id} />
      <DiscussionThread projectId={id} />
      <MoodPulse />
      <PriorityGrid projectId={id} />
      <UnifiedInbox />
      <StandupRecorder />
    </div>
  );
};

export default ProjectDetail;