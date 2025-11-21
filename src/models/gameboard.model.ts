import { type JSXElement, type Setter } from 'solid-js';

import type OnlinePlayer from '@/logic/onlinePlayer.ts';
import type Player from '@/logic/player.ts';

interface Coordinates {
  row: number;
  col: number;
}

interface BoardControls {
  handleAction: () => void;
  icon: JSXElement;
  isDisabled: boolean;
  title: string;
}

interface GameboardSettings {
  isPlacing: boolean;
  isVertical: boolean;
  isPlayerBoard: boolean;
  isOpponentTurn?: boolean;
  shipInfo?: HTMLSpanElement;
  game: Player | OnlinePlayer;
  startButton?: HTMLButtonElement;
  setIsDoneSetup?: Setter<boolean>;
  boardUpdateTrigger?: () => number;
  setIsOpponentTurn?: Setter<boolean>;
  placementRefreshTrigger?: () => number;
}

export { type Coordinates, type BoardControls, type GameboardSettings };
