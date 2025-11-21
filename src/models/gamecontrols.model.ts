import { type Accessor, type Setter } from 'solid-js';

import { type GameMode } from '@/config/rules.ts';
import type OnlinePlayer from '@/logic/onlinePlayer.ts';
import type Player from '@/logic/player.ts';

interface GameControls {
  gameMode?: GameMode;
  overlay?: HTMLDivElement;
  game: Player | OnlinePlayer;
  setIsControlUp: Setter<boolean>;
  setGameMode: Setter<GameMode | null>;
  setGame: Setter<Player | OnlinePlayer>;
}

interface ModalControls {
  overlay: HTMLDivElement;
  gameMode?: GameMode | null;
  game: Player | OnlinePlayer;
  setIsControlUp: Setter<boolean>;
  setGameMode: Setter<GameMode | null>;
  boardUpdateTrigger: Accessor<number>;
  setGame: Setter<Player | OnlinePlayer>;
}

export { type GameControls, type ModalControls };
