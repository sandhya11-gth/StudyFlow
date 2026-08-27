import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const SessionsView = () => {
  const { sessions, getTotalStudyTimeFormatted } = useStudyFlow();

  return (
    <div className="space-y-4">
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] flex justify-between items-center">
        <h1 className="font-press-start text-sm text-[#34263f]">STUDY SESSION LOGS</h1>
        <span className="font-vt323 text-base font-bold bg-white border border-[#34263f] px-3 py-1">
          TOTAL: {getTotalStudyTimeFormatted()}
        </span>
      </div>

      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-press-start text-xs text-[#34263f] mb-2">NO STUDY SESSIONS YET</p>
            <p className="font-vt323 text-base text-[#645273]">
              Start your first focus session in the FOCUS tab to begin your log.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-12 font-press-start text-[10px] text-[#34263f] border-b border-[#34263f] pb-2 px-2">
              <span className="col-span-3">DATE</span>
              <span className="col-span-4">SUBJECT</span>
              <span className="col-span-3">DURATION</span>
              <span className="col-span-2 text-right">XP EARNED</span>
            </div>

            {sessions.map(s => (
              <div
                key={s.id}
                className="grid grid-cols-12 bg-white border border-[#34263f] p-2 items-center font-vt323 text-base text-[#34263f]"
              >
                <span className="col-span-3 font-bold">{s.date} ({s.completedAt})</span>
                <span className="col-span-4">{s.subject || 'General Focus'}</span>
                <span className="col-span-3">{s.duration} min [{s.mode}]</span>
                <span className="col-span-2 text-right font-bold text-green-700">+{s.xpEarned} XP</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};