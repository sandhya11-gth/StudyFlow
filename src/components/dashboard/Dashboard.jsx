import React from 'react';
import { useStudyFlow } from '../../context/StudyFlowContext';
import StudyWorld from './StudyWorld';

export const Dashboard = () => {
  const context = useStudyFlow() || {};
  const { profile = { name: 'STUDENT', level: 1 } } = context;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>GOOD EVENING, {(profile?.name || 'STUDENT').toUpperCase()}</h1>
        <p>One small step each day becomes a long journey.</p>
      </header>

      <main className="dashboard-content">
        <StudyWorld />
      </main>
    </div>
  );
};

export default Dashboard;