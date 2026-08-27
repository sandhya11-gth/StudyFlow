import React from 'react';
import { StudyWorld } from './dashboard/StudyWorld';
import { TaskList } from './TaskList'; // Existing task list component
import { FocusTimer } from './FocusTimer'; // Existing focus timer
import { CalendarWidget } from './CalendarWidget'; // Existing calendar
import { useStudyFlow } from '../context/StudyFlowContext';

export const Dashboard: React.FC = () => {
  const { profile } = useStudyFlow();

  return (
    <div className="home-dashboard-layout">
      {/* Top Greeting */}
      <header className="dashboard-welcome-bar">
        <h2>GOOD {getGreetingTime()}, {profile.name?.toUpperCase() || 'STUDENT'}</h2>
        <p className="subtitle">One small step each day becomes a long journey.</p>
      </header>

      {/* Main 3-Column Retro Layout */}
      <div className="dashboard-main-grid">
        {/* CENTER COLUMN (55–65% Width): Visual Study World Top + Quests Bottom */}
        <main className="dashboard-center-column">
          {/* PRIMARY VISUAL CENTERPIECE */}
          <section className="study-world-wrapper">
            <StudyWorld />
          </section>

          {/* SECONDARY TASK LIST SECTION */}
          <section className="todays-quests-wrapper">
            <h3 className="section-title">TODAY'S QUESTS</h3>
            <TaskList />
          </section>
        </main>

        {/* RIGHT SIDEBAR COLUMN: Timer & Calendar */}
        <aside className="dashboard-right-sidebar">
          <FocusTimer />
          <CalendarWidget />
        </aside>
      </div>
    </div>
  );
};

function getGreetingTime(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'MORNING';
  if (hour < 18) return 'AFTERNOON';
  return 'EVENING';
}