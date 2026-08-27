import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'studyflow_app_data_v3';

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000];

const defaultInitialData = {
  profile: {
    playerName: 'Player 1',
    username: 'player_1',
    character: 'pixel_cat',
    createdAt: new Date().toISOString()
  },
  xp: 0,
  level: 1,
  activeTab: 'HOME',
  tasks: [],
  events: [],
  sessions: [],
  notes: [],
  dailyNotes: {},
  moods: {},
  timerSettings: {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15
  }
};

const StudyFlowContext = createContext(null);

export const StudyFlowProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultInitialData,
          ...parsed,
          xp: isNaN(parsed.xp) ? 0 : parsed.xp,
          level: isNaN(parsed.level) || !parsed.level ? 1 : parsed.level,
          activeTab: parsed.activeTab || 'HOME'
        };
      }
    } catch (e) {
      console.error('Failed to parse localStorage:', e);
    }
    return defaultInitialData;
  });

  // Dedicated Persistent Focus Timer Engine
  const [timerState, setTimerState] = useState({
    mode: 'POMODORO', // 'POMODORO' | 'SHORT' | 'LONG'
    timeLeft: 25 * 60,
    isRunning: false,
    subject: 'General Study'
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Timer Tick Handling across page navigation
  useEffect(() => {
    let interval = null;
    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (timerState.timeLeft === 0 && timerState.isRunning) {
      completeSession();
    }
    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeLeft]);

  const getTodayKey = () => new Date().toISOString().split('T')[0];

  // Navigation
  const setActiveTab = (tab) => {
    setData(prev => ({ ...prev, activeTab: tab }));
  };

  // Profile & Progression
  const addXP = (amount) => {
    setData(prev => {
      const currentXP = isNaN(prev.xp) ? 0 : prev.xp;
      let newXP = Math.max(0, currentXP + amount);
      let newLevel = isNaN(prev.level) || !prev.level ? 1 : prev.level;

      while (newLevel < LEVEL_THRESHOLDS.length && newXP >= LEVEL_THRESHOLDS[newLevel]) {
        newLevel++;
      }
      while (newLevel > 1 && newXP < LEVEL_THRESHOLDS[newLevel - 1]) {
        newLevel--;
      }

      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  // Task Actions
  const addTask = (task) => {
    const newTask = {
      id: 'task_' + Date.now(),
      title: task.title,
      category: task.category || 'OTHER',
      priority: task.priority || 'MEDIUM',
      dueDate: task.dueDate || getTodayKey(),
      completed: false,
      xpReward: task.priority === 'HIGH' ? 30 : task.priority === 'MEDIUM' ? 20 : 10,
      createdAt: new Date().toISOString()
    };
    setData(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
  };

  const updateTask = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updatedFields } : t)
    }));
  };

  const toggleTask = (id) => {
    const task = data.tasks.find(t => t.id === id);
    if (!task) return;

    const willBeCompleted = !task.completed;
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: willBeCompleted } : t)
    }));

    addXP(willBeCompleted ? task.xpReward : -task.xpReward);
  };

  const deleteTask = (id) => {
    const task = data.tasks.find(t => t.id === id);
    if (task && task.completed) {
      addXP(-task.xpReward);
    }
    setData(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  // Event / Calendar Actions
  const addEvent = (event) => {
    const newEvent = {
      id: 'event_' + Date.now(),
      title: event.title,
      date: event.date,
      time: event.time || '12:00',
      type: event.type || 'Study',
      createdAt: new Date().toISOString()
    };
    setData(prev => ({ ...prev, events: [...prev.events, newEvent] }));
  };

  const updateEvent = (id, updated) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === id ? { ...e, ...updated } : e)
    }));
  };

  const deleteEvent = (id) => {
    setData(prev => ({ ...prev, events: prev.events.filter(e => e.id !== id) }));
  };

  // Focus Timer Actions
  const startTimer = () => setTimerState(prev => ({ ...prev, isRunning: true }));
  const pauseTimer = () => setTimerState(prev => ({ ...prev, isRunning: false }));
  
  const resetTimer = (mode = timerState.mode) => {
    const durations = {
      POMODORO: data.timerSettings.focusDuration * 60,
      SHORT: data.timerSettings.shortBreakDuration * 60,
      LONG: data.timerSettings.longBreakDuration * 60
    };
    setTimerState({
      mode,
      timeLeft: durations[mode],
      isRunning: false,
      subject: timerState.subject
    });
  };

  const updateTimerSubject = (subject) => {
    setTimerState(prev => ({ ...prev, subject }));
  };

  const updateTimerSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      timerSettings: { ...prev.timerSettings, ...newSettings }
    }));
  };

  const completeSession = () => {
    const durationMin = timerState.mode === 'POMODORO' 
      ? data.timerSettings.focusDuration 
      : timerState.mode === 'SHORT' ? data.timerSettings.shortBreakDuration : data.timerSettings.longBreakDuration;
    
    const xpEarned = durationMin * 2;

    const newSession = {
      id: 'sess_' + Date.now(),
      mode: timerState.mode,
      duration: durationMin,
      subject: timerState.subject,
      xpEarned,
      date: getTodayKey(),
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setData(prev => ({ ...prev, sessions: [newSession, ...prev.sessions] }));
    if (timerState.mode === 'POMODORO') {
      addXP(xpEarned);
    }
    resetTimer(timerState.mode);
  };

  // Notes Actions
  const addNote = (note) => {
    const newNote = {
      id: 'note_' + Date.now(),
      title: note.title || 'Untitled Note',
      content: note.content || '',
      createdDate: getTodayKey(),
      updatedDate: getTodayKey()
    };
    setData(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
  };

  const updateNote = (id, fields) => {
    setData(prev => ({
      ...prev,
      notes: prev.notes.map(n => n.id === id ? { ...n, ...fields, updatedDate: getTodayKey() } : n)
    }));
  };

  const deleteNote = (id) => {
    setData(prev => ({ ...prev, notes: prev.notes.filter(n => n.id !== id) }));
  };

  // Daily Note & Mood
  const saveDailyNote = (text) => {
    const today = getTodayKey();
    setData(prev => ({
      ...prev,
      dailyNotes: { ...prev.dailyNotes, [today]: text }
    }));
  };

  const setMood = (moodId) => {
    const today = getTodayKey();
    setData(prev => ({
      ...prev,
      moods: { ...prev.moods, [today]: moodId }
    }));
  };

  // Analytics Helpers
  const getTotalStudyMinutes = () => {
    return data.sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  };

  const getTotalStudyTimeFormatted = () => {
    const totalMinutes = getTotalStudyMinutes();
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  };

  const getStreak = () => {
    const activeDates = new Set([
      ...data.tasks.filter(t => t.completed).map(t => t.createdAt.split('T')[0]),
      ...data.sessions.map(s => s.date)
    ]);

    let streak = 0;
    let curr = new Date();

    while (true) {
      const key = curr.toISOString().split('T')[0];
      if (activeDates.has(key)) {
        streak++;
        curr.setDate(curr.getDate() - 1);
      } else if (streak === 0 && key === getTodayKey()) {
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const value = {
    ...data,
    timerState,
    setActiveTab,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    addEvent,
    updateEvent,
    deleteEvent,
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimerSubject,
    updateTimerSettings,
    completeSession,
    addNote,
    updateNote,
    deleteNote,
    saveDailyNote,
    setMood,
    getTotalStudyMinutes,
    getTotalStudyTimeFormatted,
    getStreak
  };

  return <StudyFlowContext.Provider value={value}>{children}</StudyFlowContext.Provider>;
};

export const useStudyFlow = () => useContext(StudyFlowContext);