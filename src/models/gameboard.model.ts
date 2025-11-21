import { type Setter } from 'solid-js';

import type OnlinePlayer from '@/logic/onlinePlayer.ts';
import type Player from '@/logic/player.ts';

export interface GameboardSettings {
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
