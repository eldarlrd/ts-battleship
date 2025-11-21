import { css } from '@emotion/css';
import { IoVolumeHighSharp, IoVolumeMuteSharp } from 'solid-icons/io';
import { type JSXElement } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { isMuted, toggleMute } from '@/lib/audio.ts';

const Mute = (): JSXElement => (
  <button
    type='button'
    onClick={toggleMute}
    class={css`
      width: 3rem;
      border: none;
      height: 3.5rem;
      cursor: pointer;
      display: inherit;
      font-size: 1.5rem;
      padding: 0.125rem;
      align-items: center;
      background: transparent;
      justify-content: center;
      color: ${COLOR_VARIABLES.secondary};

      &:active {
        color: ${COLOR_VARIABLES.hover};
      }

      ${MEDIA_QUERIES.mouse} {
        &:hover {
          color: ${COLOR_VARIABLES.hover};
        }
      }
    `}>
    {isMuted() ?
      <IoVolumeMuteSharp size='1.75rem' />
    : <IoVolumeHighSharp size='1.75rem' />}
  </button>
);

export default Mute;
