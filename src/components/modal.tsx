import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

import { type Player } from '@/game/player.ts';

export const Modal = (props: { game: Player }): JSXElement => {
  return (
    <div
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
        <h1 id='victor'>{props.game.playerVictorious}</h1>
      </section>
    </div>
  );
};
