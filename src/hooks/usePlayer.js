import { useEffect, useRef, useState } from 'react';

const KEY = 'studyflow-player';
const load = () => { try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return null; } };

export function usePlayer() {
  const saved = load();
  const [tracks, setTracks] = useState(saved?.tracks || []);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(typeof saved?.volume === 'number' ? saved.volume : 0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audio = useRef(null);
  const currentTrack = tracks[index] || null;

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify({ tracks, volume })); }, [tracks, volume]);

  useEffect(() => {
    if (!audio.current) audio.current = new Audio();
    const el = audio.current;
    el.volume = volume;
    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    const onEmpty = () => { setCurrentTime(0); setDuration(0); };
    const onPause = () => setIsPlaying(false);
    const onEnd = () => { if (tracks.length > 1) setIndex(i => (i + 1) % tracks.length); else el.currentTime = 0; };
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('emptied', onEmpty);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnd);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('emptied', onEmpty);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnd);
    };
  }, [volume, tracks.length]);

  useEffect(() => {
    const el = audio.current; if (!el) { return; }
    if (!currentTrack) { el.removeAttribute('src'); el.load(); el.pause(); return; }
    if (el.src !== currentTrack.url) { el.src = currentTrack.url; }
    if (isPlaying) el.play().catch(() => setIsPlaying(false)); else el.pause();
  }, [currentTrack, isPlaying]);

  const play = () => { if (currentTrack) setIsPlaying(true); };
  const pause = () => setIsPlaying(false);
  const toggle = () => { if (currentTrack) setIsPlaying(v => !v); };
  const next = () => { if (tracks.length) setIndex(i => (i + 1) % tracks.length); };
  const prev = () => { if (tracks.length) setIndex(i => (i - 1 + tracks.length) % tracks.length); };
  const seek = (fraction) => { const el = audio.current; if (el && Number.isFinite(duration) && duration > 0) { el.currentTime = fraction * duration; } };
  const setVol = (value) => setVolume(Math.min(1, Math.max(0, value)));
  const addTrack = (url, title) => { if (!url) return; setTracks(list => { const next = [...list, { url, title: title || url.split('/').pop() || url }]; if (!list.length) setIndex(0); return next; }); };
  const removeTrack = (i) => { setTracks(list => list.filter((_, x) => x !== i)); setIndex(0); };

  return { tracks, currentTrack, isPlaying, currentTime, duration, volume, play, pause, toggle, next, prev, seek, setVol, addTrack, removeTrack };
}