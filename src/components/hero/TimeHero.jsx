import { useEffect, useRef, useState } from 'react';
import './TimeHero.css';
import heroMorning from '../../assets/characters/hero-morning.png';
import heroAfternoon from '../../assets/characters/hero-afternoon.png';
import heroEvening from '../../assets/characters/hero-evening.png';
import heroNight from '../../assets/characters/hero-night.png';

const VARIANTS = { morning: heroMorning, afternoon: heroAfternoon, evening: heroEvening, night: heroNight };
const SLOT = ['night', 'night', 'night', 'night', 'night', 'morning', 'morning', 'morning', 'morning', 'morning', 'morning', 'morning', 'afternoon', 'afternoon', 'afternoon', 'afternoon', 'afternoon', 'evening', 'evening', 'evening', 'evening', 'night', 'night', 'night'];
const slotForHour = hour => SLOT[hour] || 'night';

const initialSlot = () => {
  const forced = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('hero-slot') : null;
  return forced && forced in VARIANTS ? forced : slotForHour(new Date().getHours());
};

export default function TimeHero({ onStart, onQuests }) {
  const [slot, setSlot] = useState(initialSlot);
  const hero = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (new URLSearchParams(window.location.search).get('hero-slot')) return;
      setSlot(slotForHour(new Date().getHours()));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="study-hero" ref={hero} aria-label="Your study room at this hour">
      <div className="sh-bg">
        <img className="hero-art" src={VARIANTS[slot]} alt="Your study room" />
        <div className="sh-scrim" aria-hidden="true" />
      </div>
      <div className="sh-text">
        <label>DAILY STUDY BASECAMP <span className="sh-heart">♥</span></label>
        <h1>YOUR DAY, <em>YOUR FLOW.</em></h1>
        <p>Plan the next step, focus deeply, then watch your progress take shape.</p>
        <div className="hero-actions">
          <button onClick={onStart}>▶ START STUDYING</button>
          <button onClick={onQuests}>VIEW QUESTS <span className="sh-star">★</span></button>
        </div>
      </div>
    </section>
  );
}