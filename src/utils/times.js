const periodForHour = (hour) => {
  if (hour < 5 || hour >= 21) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

export const todayPeriod = () => periodForHour(new Date().getHours());

export const greeting = () => {
  const period = todayPeriod();
  if (period === 'night') return 'GOOD NIGHT';
  if (period === 'morning') return 'GOOD MORNING';
  if (period === 'afternoon') return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
};

export const TIMER_DUR = { focus: 1500, short: 300, long: 600 };
export const TIMER_LABEL = { focus: 'FOCUS', short: 'SHORT BREAK', long: 'LONG BREAK' };