import { css } from '@emotion/css';
import { createEffect, onCleanup, type JSXElement } from 'solid-js';

import { type Player } from '@/game/player.ts';

// eslint-disable-next-line prefer-const
let overlay: HTMLDivElement = document.getElementById(
  'overlay'
) as HTMLDivElement;

// eslint-disable-next-line prefer-const
let victor: HTMLHeadingElement = document.getElementById(
  'victor'
) as HTMLHeadingElement;

export const Modal = (props: { game: Player }): JSXElement => {
  createEffect(() => {
    const handleModal = (): void => {
      if (props.game.playerVictorious) {
        overlay.style.display = 'flex';
        if (props.game.pve)
          victor.innerText =
            props.game.playerVictorious === 1 ? 'Player wins' : 'Computer wins';
        else
          victor.innerText =
            props.game.playerVictorious === 1
              ? 'Player 1 wins'
              : 'Player 2 wins';
      }
    };

    document.addEventListener('attack', handleModal);
    onCleanup(() => {
      document.removeEventListener('attack', handleModal);
    });
  });

  return (
    <div
      ref={overlay}
      id='overlay'
      class={css`
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1;
        font-size: 2.5rem;
        font-weight: 600;
      `}>
      <section
        class={css`
          display: inherit;
          background: #000;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        `}>
        <h1 ref={victor} id='victor'>
          {props.game.playerVictorious}
        </h1>
      </section>
    </div>
  );
};
