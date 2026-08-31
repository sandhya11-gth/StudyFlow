/* eslint-disable react-refresh/only-export-components */
const R = (x, y, w, h, f) => <rect x={x} y={y} width={w} height={h} fill={f} />;

export const ICONS = {
 home: <path d="M6 1h4v2H6V1zm-2 2h8v2H4V3zm-2 2h12v2H2V5zm-1 2h14v9H1V7zm3 2v5h3V9H4zm5 0v5h3V9H9z" />,
 calendar: <path d="M3 1h2v2H3V1zm8 0h2v2h-2V1zM1 3h14v12H1V3zm2 4h2v2H3V7zm4 0h2v2H7V7zm4 0h2v2h-2V7zm-8 4h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2z" />,
 quest: <path d="M3 2h2v12H3V2zm3 0h8l-2 4 2 4H6V2z" />,
 timer: <path d="M5 1h6v2H5V1zM3 3h10v2H3V3zM1 5h14v6H1V5zm2 6h10v2H3v-2zm2 2h6v2H5v-2zm2-7h2v3H7V7z" />,
 subjects: <path d="M1 2h6v12H1V2zm8 0h6v12H9V2zm-6 3h3v1.5H3V5zm0 3h3v1.5H3V8zm8-3h3v1.5h-3V5zm0 3h3v1.5h-3V8z" />,
 stats: <path d="M1 13h14v2H1v-2zm1-3h3v2H2v-2zm4-4h3v6H6V6zm4-3h3v9h-3V3z" />,
 star: <path d="M7 1h2v2H7V1zm-2 2h6v2H5V3zm-4 3h14v2H1V6zm2 2h10v2H3V8zm2 2h6v2H5v-2zm-2 2h2v3H3v-3zm8 0h2v3h-2v-3z" />,
 trophy: <g>{R(3,2,2,3)}{R(11,2,2,3)}{R(4,2,8,5)}{R(3,6,10,1)}{R(7,7,2,4)}{R(5,11,6,2)}</g>,
 gear: <g>{R(6,6,4,4)}{R(4,6,2,4)}{R(10,6,2,4)}{R(6,4,4,2)}{R(6,10,4,2)}{R(3,3,2,2)}{R(11,3,2,2)}{R(3,11,2,2)}{R(11,11,2,2)}{R(7,7,2,2,'var(--paper)')}</g>,
 lock: <g><path d="M6 7V5a2 2 0 0 1 4 0v2z" />{R(4,7,8,7)}{R(7,9,2,2,'var(--paper)')}</g>,
 flame: <g>{R(7,1,2,2)}{R(6,3,4,3)}{R(5,5,6,3)}{R(4,7,8,5)}{R(6,4,2,1,'var(--paper)')}{R(8,11,1,1,'var(--paper)')}</g>,
 sun: <g>{R(5,4,6,6,'var(--yellow)')}{R(7,1,2,2,'var(--yellow)')}{R(1,7,1,2,'var(--yellow)')}{R(14,7,1,2,'var(--yellow)')}{R(7,13,2,2,'var(--yellow)')}{R(3,3,1,1,'var(--yellow)')}{R(12,3,1,1,'var(--yellow)')}{R(3,12,1,1,'var(--yellow)')}{R(12,12,1,1,'var(--yellow)')}</g>,
 moon: <g>{R(3,3,10,10)}{R(6,3,6,5,'var(--card)')}{R(3,3,1,1)}</g>,
 coffee: <g>{R(3,5,7,5,'var(--pink)')}{R(10,6,2,1,'var(--pink)')}{R(10,8,2,1,'var(--pink)')}{R(11,7,1,1,'var(--pink)')}{R(5,2,1,1,'var(--paper)')}{R(7,1,1,1,'var(--paper)')}{R(6,3,1,1,'var(--paper)')}</g>,
 laptop: <g>{R(5,2,6,5,'var(--line)')}{R(6,3,4,3,'var(--mint)')}{R(4,7,8,1,'var(--line)')}{R(3,8,10,4,'var(--pink)')}{R(5,9,2,1,'var(--paper)')}{R(8,9,2,1,'var(--paper)')}{R(11,9,1,1,'var(--paper)')}</g>,
 plant: <g>{R(6,4,4,6,'var(--mint)')}{R(4,7,3,3,'var(--mint)')}{R(9,7,3,3,'var(--mint)')}{R(6,10,4,5,'var(--pink)')}{R(5,10,6,1,'var(--line)')}</g>,
 books: <g>{R(4,3,8,2,'var(--pink)')}{R(3,6,9,2,'var(--yellow)')}{R(5,9,7,2,'var(--purple)')}{R(6,11,5,2,'var(--mint)')}</g>,
 lamp: <g>{R(5,11,6,2,'var(--line)')}{R(7,6,2,5,'var(--line)')}{R(4,4,8,2,'var(--yellow)')}{R(7,7,2,2,'var(--yellow)')}</g>,
 cat: <g>{R(3,5,10,7,'var(--ink)')}{R(4,3,2,3,'var(--ink)')}{R(10,3,2,3,'var(--ink)')}{R(4,4,1,1,'var(--paper)')}{R(11,4,1,1,'var(--paper)')}{R(5,7,2,1,'var(--paper)')}{R(9,7,2,1,'var(--paper)')}{R(7,8,2,1,'var(--paper)')}</g>,
 bell: <g>{R(6,2,4,3)}{R(4,5,8,6)}{R(6,11,4,2)}{R(7,13,2,1)}</g>,
 music: <g>{R(6,2,6,2)}{R(6,2,2,9)}{R(4,10,3,3)}{R(8,9,5,4)}</g>,
 play: <path d="M5 3l8 5-8 5z" />,
 pause: <g>{R(5,3,2,10)}{R(9,3,2,10)}</g>,
 ix: <g>{R(3,3,3,2)}{R(3,5,1,2)}{R(8,10,1,2)}{R(12,4,2,1)}{R(10,11,3,2)}{R(5,6,2,3)}{R(6,3,2,3)}{R(13,8,2,3)}{R(8,8,2,3)}</g>,
 idiscord: <g>{R(4,3,8,2)}{R(3,5,10,2)}{R(3,7,1,4)}{R(12,7,1,4)}{R(4,9,4,1)}{R(4,10,1,2)}{R(12,10,1,2)}{R(9,9,3,1)}</g>,
 iinsta: <g>{R(4,3,8,8)}{R(6,5,4,4,'var(--paper)')}{R(10,8,2,2)}</g>,
 igh: <g>{R(3,4,2,7)}{R(6,4,2,7)}{R(4,2,6,5)}{R(8,4,4,7)}</g>,
};

export default function Px({ n, s = 20, c }) {
 return <svg className="px" viewBox="0 0 16 16" width={s} height={s} shapeRendering="crispEdges" fill={c || 'currentColor'} style={{ display: 'inline-block', verticalAlign: '-0.22em' }} aria-hidden="true">{ICONS[n] || ICONS.star}</svg>;
}