import { type Setter } from 'solid-js';

import type OnlinePlayer from '@/logic/onlinePlayer.ts';
import type Player from '@/logic/player.ts';

export interface GameboardSettings {
  isPlayerBoard: boolean;
  isPlacing: boolean;
  isVertical: boolean;
  isOpponentTurn?: boolean;
  game: Player | OnlinePlayer;
  shipInfo?: HTMLSpanElement;
  startButton?: HTMLButtonElement;
  setIsDoneSetup?: Setter<boolean>;
  setIsOpponentTurn?: Setter<boolean>;
  boardUpdateTrigger?: () => number;
  placementRefreshTrigger?: () => number;
}
