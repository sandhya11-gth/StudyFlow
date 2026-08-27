import React, { useState, useEffect } from 'react';

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const sequence = [
      { p: 20, text: 'INITIALIZING STUDYFLOW.EXE...' },
      { p: 45, text: 'LOADING PLAYER SYSTEM...' },
      { p: 70, text: 'LOADING QUEST DATABASE...' },
      { p: 90, text: 'SYNCHRONIZING STUDY WORLD...' },
      { p: 100, text: 'READY.' }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < sequence.length) {
        const item = sequence[step];
        setProgress(item.p);
        setLogs((prev) => [...prev, item.text]);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#10152B] flex flex-col items-center justify-center p-4 font-['Press_Start_2P'] text-[#4DE7FF] z-50">
      <div className="w-full max-w-lg bg-[#17265A] border-4 border-[#2463D4] p-6 shadow-[8px_8px_0px_0px_#8B6CFF]">
        <div className="text-center text-sm mb-6 text-[#FF5C9A] tracking-widest animate-pulse">
          STUDYFLOW.EXE
        </div>

        <div className="h-36 bg-[#10152B] border-2 border-[#2463D4] p-3 text-[10px] text-[#68D391] font-mono flex flex-col justify-end overflow-hidden mb-6 leading-relaxed">
          {logs.map((log, index) => (
            <div key={index}>&gt; {log}</div>
          ))}
        </div>

        {/* Pixel Loader Bar */}
        <div className="w-full bg-[#10152B] border-2 border-[#4DE7FF] h-6 p-1 mb-2">
          <div
            className="bg-[#FF5C9A] h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-[10px] text-[#FFE66D]">{progress}%</div>
      </div>
    </div>
  );
}