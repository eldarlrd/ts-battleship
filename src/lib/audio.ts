import { createEffect, createSignal } from 'solid-js';

const initMuteState = localStorage.getItem('isMuted') === 'true';

const [isMuted, setIsMuted] = createSignal(initMuteState);

createEffect(() => {
  const muted = isMuted();

  localStorage.setItem('isMuted', muted.toString());
});

const playSound = (soundFile: string): void =>
  !isMuted() ? void new Audio(soundFile).play() : undefined;

const toggleMute = (): void => {
  setIsMuted(prev => !prev);
};

export { isMuted, playSound, toggleMute };
