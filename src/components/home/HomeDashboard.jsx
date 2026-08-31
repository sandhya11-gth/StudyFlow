import { useState } from 'react';
import TimeHero from '../hero/TimeHero.jsx';
import Px from '../Px.jsx';
import { useStudyFlow } from '../../context/useStudyFlow.js';
import { usePlayer } from '../../hooks/usePlayer.js';
import { TIMER_DUR, TIMER_LABEL } from '../../utils/times.js';
import { unlockState } from '../../utils/achievements.js';
import { sfx } from '../../three/sfx.js';
import './Home.css';

const todayKey = () => new Date().toISOString().slice(0, 10);
const dateKey = (d) => new Date(d).toISOString().slice(0, 10);
const SUBJECT_COLORS = ['#ff5fa6', '#38d2ac', '#a45cff', '#ffd85e', '#59b0ff', '#8a86a8'];

function Card({ title, badge, link, onLink, children, className = '' }) {
  return (
    <section className={'d-card ' + className}>
      <header className="d-head">
        <h3><span className="d-dot" aria-hidden="true" />{title}</h3>
        {badge && <span className="d-badge">{badge}</span>}
        {link && <button className="d-link" onClick={onLink} aria-label={link}>{link}<span className="d-fwd">→</span></button>}
      </header>
      {children}
    </section>
  );
}

function TodayPlan({ tasks, subjectName, toggleTask, notify, openTask, onAddTask, setTab }) {
  const todays = tasks.filter(t => t.date === todayKey()).sort((a, b) => (a.completed !== b.completed ? (a.completed ? 1 : -1) : (a.time || '').localeCompare(b.time || '')));
  const done = todays.filter(t => t.completed).length;
  return (
    <Card title="Today's Plan" badge={`${done}/${todays.length}`} link="View Full Plan" onLink={() => setTab('QUESTS')}>
      <div className="plan-head">
        <div className="plan-progress"><i style={{ width: todays.length ? Math.round(done / todays.length * 100) + '%' : '0%' }} /></div>
        <span>{done} of {todays.length} tasks done</span>
      </div>
      <div className="plan-wrap">
        {todays.map(t => (
          <div className="plan-row" key={t.id}>
            <span className="plan-time">{t.time || '—'}</span>
            <button className={'plan-check' + (t.completed ? ' on' : '')} onClick={() => { const next = toggleTask(t.id); notify(next ? 'TASK COMPLETE! +' + (t.xpReward || 0) + ' XP' : 'TASK REOPENED.'); }} aria-label={t.completed ? 'Mark not done' : 'Mark done'}>{t.completed ? '✓' : ''}</button>
            <button className={'plan-t' + (t.completed ? ' done' : '')} onClick={() => openTask(t)}><b>{t.title}</b>{t.subjectId ? <small>{subjectName(t.subjectId)}</small> : <small>General</small>}</button>
          </div>
        ))}
        {!todays.length && <span className="plan-empty">No tasks planned today.</span>}
        <button className="plan-add" onClick={onAddTask}>+ ADD TASK</button>
      </div>
    </Card>
  );
}

function MiniCalendar({ events, calendarDate, setCalendarDate, setTab, openEvent, openAddEvent }) {
  const base = calendarDate || new Date();
  const year = base.getFullYear(), mon = base.getMonth();
  const start = new Date(year, mon, 1);
  const offset = (start.getDay() + 6) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(i - offset + 1); return d; });
  const sel = dateKey(base), today = todayKey();
  const monthLabel = base.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }).toUpperCase();
  const wd = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const selEvents = events.filter(e => e.date === sel).slice(0, 3);
  const selLabel = base.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }).toUpperCase();
  return (
    <Card title="Calendar" link="Open Calendar" onLink={() => setTab('CALENDAR')}>
      <div className="cal-wrap">
        <div className="cal-tools">
          <button onClick={() => setCalendarDate(new Date(year, mon - 1, 1))} aria-label="Previous month">‹</button>
          <b>{monthLabel}</b>
          <button onClick={() => setCalendarDate(new Date(year, mon + 1, 1))} aria-label="Next month">›</button>
          <button className="cal-today" onClick={() => setCalendarDate(new Date())}>TODAY</button>
        </div>
        <div className="cal-grid">
          {wd.map(d => <b key={d}>{d}</b>)}
          {cells.map((c) => {
            const key = dateKey(c);
            return (
              <button className={'cal-cell' + (key === today ? ' today' : '') + (key === sel && key !== today ? ' sel' : '') + (c.getMonth() !== mon ? ' muted' : '') + (events.some(e => e.date === key) ? ' has' : '')} key={key} onClick={() => setCalendarDate(new Date(c))}>{c.getDate()}</button>
            );
          })}
        </div>
        <div className="cal-events">
          <div className="cal-ev-head"><b className="cal-ev-title">EVENTS · {selLabel}</b><button className="cal-add" onClick={() => openAddEvent(sel)} aria-label="Add event">＋</button></div>
          {selEvents.map(e => (
            <button className="cal-ev" key={e.id} onClick={() => openEvent(e)}>
              <span className="cal-ev-time">{e.startTime || 'ALL DAY'}</span>
              <i>{e.title}</i>
            </button>
          ))}
          {!selEvents.length && <span className="cal-none">No events on this date.</span>}
        </div>
      </div>
    </Card>
  );
}

function FocusCard({ timer, setTimer, stats }) {
  const fmt = String(Math.floor(timer.seconds / 60)).padStart(2, '0') + ':' + String(timer.seconds % 60).padStart(2, '0');
  const reset = mode => setTimer({ ...timer, running: false, mode, seconds: TIMER_DUR[mode] });
  return (
    <Card title="Focus Timer">
      <div className="tm-wrap">
        <div className="tm-tabs">
          {[['focus', TIMER_LABEL.focus], ['short', TIMER_LABEL.short], ['long', TIMER_LABEL.long]].map(([m, label]) => (
            <button className={timer.mode === m ? 'on' : ''} onClick={() => reset(m)} key={m}>{label}</button>
          ))}
        </div>
        <div className="tm-digits">{fmt}</div>
        <div className="tm-session">POMODORO ◆ {stats.sessions + 1}</div>
        <div className="tm-ctl">
          <button className="tm-start" onClick={() => { timer.running ? sfx.pause() : sfx.start(); setTimer({ ...timer, running: !timer.running }); }}>{timer.running ? 'Ⅱ PAUSE' : '▶ START FOCUS'}</button>
          <button className="tm-reset" aria-label="Reset timer" onClick={() => { reset(timer.mode); sfx.reset(); }}>↻</button>
        </div>
      </div>
    </Card>
  );
}

function NowPlaying() {
  const p = usePlayer();
  const [url, setUrl] = useState('');
  const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  const pct = p.duration ? Math.min(100, p.currentTime / p.duration * 100) : 0;
  const hasTrack = !!p.currentTrack;
  return (
    <Card title="Now Playing">
      <div className="np-wrap">
        <div className="np-row">
          <div className={'np-disc' + (p.isPlaying ? ' spin' : '')}><Px n="music" s={26} c="#ff5fa6" /></div>
          <div className="np-track">
            <b>{hasTrack ? p.currentTrack.title : 'NO TRACKS LOADED'}</b>
            <span>{hasTrack ? 'STUDYFOCUS RADIO' : 'Add an audio track to start playing.'}</span>
          </div>
        </div>
        <div className="np-progress"><i style={{ width: pct + '%' }} /></div>
        <div className="np-time"><span>{fmt(p.currentTime)}</span><span>{fmt(p.duration)}</span></div>
        <div className="np-controls">
          <button aria-label="Previous" disabled={!hasTrack} onClick={p.prev}>◀◀</button>
          <button className="np-play" aria-label={p.isPlaying ? 'Pause' : 'Play'} disabled={!hasTrack} onClick={p.toggle}>{p.isPlaying ? 'Ⅱ' : '▶'}</button>
          <button aria-label="Next" disabled={!hasTrack} onClick={p.next}>▶▶</button>
        </div>
        <div className="np-vol">
          <small>VOL</small>
          <input type="range" min="0" max="100" value={Math.round(p.volume * 100)} onChange={e => p.setVol(Number(e.target.value) / 100)} aria-label="Volume" />
        </div>
        <form className="np-add" onSubmit={e => { e.preventDefault(); if (url.trim()) { p.addTrack(url.trim()); setUrl(''); } }}>
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste MP3 / stream URL…" aria-label="Track URL" />
          <button type="submit" aria-label="Add track">＋</button>
        </form>
      </div>
    </Card>
  );
}

function ActiveQuests({ quests, questProgress, subjectName, openQuest, setTab, onAddQuest }) {
  const active = quests.filter(q => q.status !== 'complete').slice(0, 3);
  const unit = { tasks: 'tasks', sessions: 'sessions', streak: 'days', checklist: 'quest' };
  return (
    <Card title="Active Quests" link="View All" onLink={() => setTab('QUESTS')}>
      <div className="aq-wrap">
        {active.map(q => {
          const qp = questProgress[q.id] || { track: 'checklist', done: 0, target: 1, pct: 0 };
          return (
            <button className="aq-card" key={q.id} onClick={() => openQuest(q)}>
              <b className="aq-title">{q.title}</b>
              <span className="aq-sub">{q.subjectId ? subjectName(q.subjectId) : 'General'} · {q.priority || 'Medium'}</span>
              <span className="aq-meta">{qp.track === 'checklist' ? '◆ ' + (q.status === 'complete' ? 'DONE' : 'PENDING') : qp.done + ' / ' + qp.target + ' ' + unit[qp.track]}</span>
              <i className="aq-bar"><b style={{ width: qp.pct + '%' }} /></i>
            </button>
          );
        })}
        {!active.length && (
          <div className="aq-empty"><span>No active quests.</span><button onClick={onAddQuest}>+ NEW QUEST</button></div>
        )}
      </div>
    </Card>
  );
}

function StudyStats({ sessions, subjectName }) {
  const by = {};
  sessions.forEach(s => { const k = subjectName(s.subjectId); const name = k === 'No subject' ? 'Others' : k; by[name] = (by[name] || 0) + s.minutes; });
  const topics = Object.entries(by).map(([n, m], i) => ({ n, h: Math.round(m / 60 * 10) / 10, c: SUBJECT_COLORS[i % SUBJECT_COLORS.length] })).sort((a, b) => b.h - a.h);
  const total = topics.reduce((n, t) => n + t.h, 0);
  const ago = d => { const t = new Date(); t.setDate(t.getDate() - d); return t; };
  const weekMin = sessions.filter(s => new Date(s.completedAt) >= ago(7)).reduce((n, s) => n + s.minutes, 0);
  const prevMin = sessions.filter(s => { const t = new Date(s.completedAt); return t >= ago(14) && t < ago(7); }).reduce((n, s) => n + s.minutes, 0);
  const pct = weekMin || prevMin ? (prevMin ? (weekMin - prevMin) / prevMin * 100 : 100) : 0;
  const badge = (pct >= 0 ? '+' : '') + Math.round(pct) + '%';
  const segs = topics.reduce((acc, t) => { const from = acc.length ? acc[acc.length - 1].to : 0; const to = from + (total ? t.h / total * 100 : 0); acc.push({ c: t.c, from, to }); return acc; }, []).map(s => `${s.c} ${Math.max(0, s.from).toFixed(2)}% ${Math.max(0, s.to).toFixed(2)}%`);
  const donut = total ? `conic-gradient(${segs.join(', ')})` : '#1b1e3a';
  return (
    <Card title="Study Stats" badge={badge}>
      <div className="ss-wrap">
        <div className="ss-donut-box" style={{ background: donut }}><b>{total.toFixed(1)}h</b></div>
        <div className="ss-legend">
          {topics.slice(0, 5).map(t => <div className="ss-row" key={t.n}><i style={{ background: t.c }} /><span>{t.n}</span><b>{t.h}h</b></div>)}
          {!topics.length && <span className="ss-empty">Start studying to build your stats.</span>}
        </div>
      </div>
    </Card>
  );
}

function AchTiles({ stats, setTab }) {
  const list = unlockState(stats);
  return (
    <Card title="Achievements" link="View All" onLink={() => setTab('ACHIEVEMENTS')}>
      <div className="ach-wrap">
        <div className="ach-grid">
          {list.map(a => (
            <div className={'ach-tile' + (a.unlocked ? ' got' : ' no')} key={a.title} title={a.desc}>
              <Px n={a.unlocked ? 'star' : 'lock'} s={14} />
              <span>{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Streak({ stats }) {
  const days = stats.streak;
  const wd = w => new Date(w.key + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase().slice(0, 3);
  const weekend = w => wd(w) === 'SAT' || wd(w) === 'SUN';
  return (
    <Card title="Current Streak">
      <div className="st-wrap">
        <div className="st-big"><Px n="flame" s={28} c="#ff5fa6" /><b>{days} DAY{days === 1 ? '' : 'S'}</b></div>
        <div className="st-week">
          {stats.week7.map(w => (
            <span className={[w.active ? 'hit' : '', !w.active && weekend(w) ? 'locked' : '', w.today ? 'today' : ''].filter(Boolean).join(' ')} key={w.key}>
              <b>{wd(w)}</b>
              <i>{w.active ? '✓' : (weekend(w) ? <Px n="lock" s={9} /> : '')}</i>
            </span>
          ))}
        </div>
        <span className="st-note">{days ? 'Study each day to keep the flame alive!' : 'Complete a task or focus session today to start your streak.'}</span>
      </div>
    </Card>
  );
}

export default function HomeDashboard({ timer, setTimer, calendarDate, setCalendarDate, setTab, notify, toggleTask, openQuest, openTask, openEvent, openAddTask, openAddEvent, onAddQuest }) {
  const store = useStudyFlow();
  const { data, stats, questProgress } = store;
  const subjectName = id => data.subjects.find(s => s.id === id)?.name || 'No subject';

  return (
    <div className="dash">
      <TimeHero onStart={() => setTab('TIMER')} onQuests={() => setTab('QUESTS')} />
      <div className="dash-grid">
        <TodayPlan tasks={data.tasks} subjectName={subjectName} toggleTask={toggleTask} notify={notify} openTask={openTask} onAddTask={openAddTask} setTab={setTab} />
        <MiniCalendar events={data.events} calendarDate={calendarDate} setCalendarDate={setCalendarDate} setTab={setTab} openEvent={openEvent} openAddEvent={openAddEvent} />
        <FocusCard timer={timer} setTimer={setTimer} stats={stats} />
        <NowPlaying />
        <ActiveQuests quests={data.quests} questProgress={questProgress} subjectName={subjectName} openQuest={openQuest} setTab={setTab} onAddQuest={onAddQuest} />
        <StudyStats sessions={data.sessions} subjectName={subjectName} />
        <AchTiles stats={stats} setTab={setTab} />
        <Streak stats={stats} />
      </div>
      <footer className="page-footer">
        <span className="f-copy">© 2025 StudyFlow</span>
        <span className="f-quote">Plan · Focus · Review — one step at a time.</span>
        <span className="f-last"><Px n="star" s={12} c="#ff5fa6" /> LAST ACTION · {data.activity[0] ? data.activity[0].text : 'NO ACTIVITY YET'}</span>
        <span className="f-soc">
          <a href="#" aria-label="Discord"><Px n="idiscord" s={15} /></a>
          <a href="#" aria-label="X"><Px n="ix" s={15} /></a>
          <a href="#" aria-label="Instagram"><Px n="iinsta" s={15} /></a>
          <a href="#" aria-label="GitHub"><Px n="igh" s={15} /></a>
        </span>
      </footer>
    </div>
  );
}