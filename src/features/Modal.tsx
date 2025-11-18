import { css } from '@emotion/css';
import {
  createEffect,
  onCleanup,
  type JSXElement,
  type Setter,
  type Accessor
} from 'solid-js';

import defeatSound from '#/sfx/defeat.opus';
import victorySound from '#/sfx/victory.opus';
import { NewGame } from '@/components/buttons/NewGame.tsx';
import { type GameMode } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { playSound } from '@/lib/audio.ts';
import { type OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { type Player } from '@/logic/player.ts';

export const Modal = (props: {
  game: Player | OnlinePlayer;
  setGame: Setter<Player | OnlinePlayer>;
  setIsControlUp: Setter<boolean>;
  overlay: HTMLDivElement;
  gameMode?: GameMode | null;
  setGameMode: Setter<GameMode | null>;
  boardUpdateTrigger: Accessor<number>;
}): JSXElement => {
  // eslint-disable-next-line prefer-const
  let victor = document.getElementById('victor') as HTMLHeadingElement;

  const openModal = (winnerStatus: number): void => {
    if (props.gameMode === null) {
      props.overlay.style.display = 'none';

      return;
    }

    props.overlay.style.display = 'flex';

    if (winnerStatus === 1) {
      victor.innerText = 'Player Wins!';
      playSound(victorySound);
    } else {
      const opponentName = props.gameMode === 'pvp' ? 'Opponent' : 'Computer';

      victor.innerText = `${opponentName} Wins...`;
      playSound(defeatSound);
    }
  };

  createEffect(() => {
    const handleCheck = (): void => {
      const winnerStatus = props.game.playerVictorious;

      if (winnerStatus && props.gameMode) openModal(winnerStatus);
      else props.overlay.style.display = 'none';
    };

    props.boardUpdateTrigger();

    document.addEventListener('attack', handleCheck);
    onCleanup(() => {
      document.removeEventListener('attack', handleCheck);
    });
  });

  return (
    <div
      ref={props.overlay}
      id='overlay'
      class={css`
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 1;
      `}>
      <section
        class={css`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background: ${COLOR_VARIABLES.primary};
          border: 2px solid ${COLOR_VARIABLES.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

          ${MEDIA_QUERIES.sm} {
            padding: 3rem;
          }

          ${MEDIA_QUERIES.md} {
            padding: 4rem;
          }

          ${MEDIA_QUERIES.lg} {
            padding: 5rem;
          }
        `}>
        <h1
          ref={victor}
          id='victor'
          class={css`
            font-size: 2.5rem;
            text-align: center;
            line-height: 1em;
          `}>
          {props.game.playerVictorious}
        </h1>

        <NewGame
          game={props.game}
          setGame={props.setGame}
          setIsControlUp={props.setIsControlUp}
          overlay={props.overlay}
          gameMode={props.gameMode ?? undefined}
          setGameMode={props.setGameMode}
        />
      </section>
    </div>
  );
};
