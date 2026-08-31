const THEMES = {
  light: { ink: '#30233c', paper: '#fff8e9', card: '#fffdf7', line: '#382b40', pink: '#ff5d91', purple: '#8748fb', mint: '#38ca8c', yellow: '#ffd85e' },
  dark: { ink: '#f7efff', paper: '#0d1123', card: '#14182b', line: '#a582d6', pink: '#ff5ba9', purple: '#a45cff', mint: '#4cddad', yellow: '#ffe265' },
};

export function readPalette(theme = 'light') {
  return THEMES[theme === 'dark' ? 'dark' : 'light'];
}