import { css } from '@emotion/css';
import { createEffect, onCleanup, type JSXElement } from 'solid-js';

import defeatSound from '#/sfx/defeat.opus';
import victorySound from '#/sfx/victory.opus';
import NewGame from '@/components/buttons/NewGame.tsx';
import { SHIP_COUNT } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { playSound } from '@/lib/audio.ts';
import { type ModalControls } from '@/models/gamecontrols.model.ts';

const Modal = (props: ModalControls): JSXElement => {
  // eslint-disable-next-line prefer-const
  let victor = document.getElementById('victor') as HTMLHeadingElement;

  const openModal = (winnerStatus: number): void => {
    if (props.gameMode === null) {
      props.overlay.style.display = 'none';

      return;
    }

    props.overlay.style.display = 'flex';

    if (winnerStatus === 1) {
      victor.innerText = 'Player wins!';
      playSound(victorySound);
    } else {
      const opponentName = props.gameMode === 'pvp' ? 'Opponent' : 'Computer';

      victor.innerText = `${opponentName} wins...`;
      playSound(defeatSound);
    }
  };

  createEffect(() => {
    const handleCheck = (): void => {
      const winnerStatus = props.game.playerVictorious;
      const isGameActive = props.game.playerBoard.shipsPlaced >= SHIP_COUNT;

      if (winnerStatus && props.gameMode && isGameActive)
        openModal(winnerStatus);
      else props.overlay.style.display = 'none';
    };

    props.boardUpdateTrigger();
    handleCheck();

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
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: none;
        position: fixed;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.75);
      `}>
      <section
        class={css`
          margin: 1rem;
          gap: 0.75rem;
          padding: 1rem;
          display: inherit;
          line-height: 1rem;
          flex-direction: column;
          border-radius: 0.125rem;
          background: ${COLOR_VARIABLES.primary};
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          border: 0.125rem solid ${COLOR_VARIABLES.secondary};

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
            line-height: 1em;
            font-size: 2.5rem;
            text-align: center;
          `}>
          {props.game.playerVictorious}
        </h1>

        <NewGame
          game={props.game}
          setGame={props.setGame}
          overlay={props.overlay}
          setGameMode={props.setGameMode}
          setIsControlUp={props.setIsControlUp}
          gameMode={props.gameMode!}
        />
      </section>
    </div>
  );
};

export default Modal;
