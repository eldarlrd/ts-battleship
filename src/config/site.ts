const COLOR_VARIABLES = {
  primary: '#60a5fa', // tw-blue-400
  secondary: '#f8fafc', // tw-slate-50
  ship: '#334155', // tw-slate-700
  hover: '#cbd5e1', // tw-slate-300
  grid: '#1e293b', // tw-slate-800
  emptyHit: '#10b981', // tw-emerald-500
  shipHit: '#f59e0b', // tw-amber-500
  shipSunk: '#f43f5e', // tw-rose-500
  outOfBounds: '#fda4af' // tw-rose-300
} as const;

const MEDIA_QUERIES = {
  sm: '@media (min-width: 40rem)', // tw-sm
  md: '@media (min-width: 48rem)', // tw-md
  lg: '@media (min-width: 64rem)', // tw-lg
  mouse: '@media (hover: hover)'
} as const;

const MATCHMAKING_STATUS = {
  connecting: 'Connecting to matchmaking...',
  waitingToJoin: 'Waiting for opponent to join...',
  waitingForSetup: 'Waiting for opponent to setup...',
  ready: 'Both players ready! Starting game...'
};

export { COLOR_VARIABLES, MEDIA_QUERIES, MATCHMAKING_STATUS };
