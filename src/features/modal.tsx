import { css } from '@emotion/css';
import {
  createEffect,
  onCleanup,
  type JSXElement,
  type Setter
} from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import defeatSound from '@/assets/sfx/defeat.opus';
import victorySound from '@/assets/sfx/victory.opus';
import { NewGame } from '@/components/buttons/newGame.tsx';
import { type Player } from '@/logic/player.ts';

// eslint-disable-next-line prefer-const
let victor: HTMLHeadingElement = document.getElementById(
  'victor'
) as HTMLHeadingElement;

export const Modal = (props: {
  game: Player;
  setGame: Setter<Player>;
  setIsControlUp: Setter<boolean>;
  overlay: HTMLDivElement;
}): JSXElement => {
  const victoryAudio = new Audio(victorySound);
  const defeatAudio = new Audio(defeatSound);

  const playAudio = (audio: HTMLAudioElement): void => {
    audio.play().catch((error: unknown) => {
      if (error instanceof Error) console.error(error);
    });
  };

  createEffect(() => {
    const handleModal = (): void => {
      if (props.game.playerVictorious) {
        props.overlay.style.display = 'flex';
        if (props.game.playerVictorious === 1) {
          victor.innerText = 'Player Wins!';
          playAudio(victoryAudio);
        } else {
          victor.innerText = 'Computer Wins...';
          playAudio(defeatAudio);
        }
      }
    };

    document.addEventListener('attack', handleModal);
    onCleanup(() => {
      document.removeEventListener('attack', handleModal);
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
        background-color: rgba(0, 0, 0, 0.75);
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
          background-color: ${COLOR_VARIABLES.primary};
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
          setGame={props.setGame}
          setIsControlUp={props.setIsControlUp}
          overlay={props.overlay}
        />
      </section>
    </div>
  );
};
