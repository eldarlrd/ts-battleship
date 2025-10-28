const COLOR_VARIABLES = {
  primary: '#60a5fa', // tw-blue-400
  secondary: '#f8fafc', // tw-slate-50
  ship: '#334155', // tw-slate-700
  hover: '#cbd5e1', // tw-slate-300
  grid: '#1e293b', // tw-slate-800
  emptyHit: '#10b981', // tw-emerald-500
  shipHit: '#f59e0b', // tw-amber-500
  shipSunk: '#f43f5e' // tw-rose-500
} as const;

const MEDIA_QUERIES = {
  sm: '@media (min-width: 40rem)', // tw-sm
  md: '@media (min-width: 48rem)', // tw-md
  lg: '@media (min-width: 64rem)', // tw-lg
  mouse: '@media (pointer: fine)'
} as const;

export { COLOR_VARIABLES, MEDIA_QUERIES };
