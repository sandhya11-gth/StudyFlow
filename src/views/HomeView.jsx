import React from 'react';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { QuestsWidget } from '../components/QuestsWidget';
import {
  FocusTimerCard,
  StudyBuddyCard,
  DailyNoteCard,
  DailyMoodCard
} from '../components/RightSidebarWidgets';

export const HomeView = () => {
  return (
    <div className="space-y-3">
      <WelcomeHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Main Center Quests Pane */}
        <div className="lg:col-span-8">
          <QuestsWidget />
        </div>

        {/* Right Sidebar Utility Pane */}
        <div className="lg:col-span-4 space-y-3">
          <FocusTimerCard />
          <StudyBuddyCard />
          <DailyMoodCard />
          <DailyNoteCard />
        </div>
      </div>
    </div>
  );
};