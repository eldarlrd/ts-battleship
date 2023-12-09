import { FaBrandsGithub } from 'solid-icons/fa';
import { type JSXElement } from 'solid-js';

export const Footer = (): JSXElement => {
  return (
    <footer>
      © 2023
      <FaBrandsGithub />
      <a
        title='Go to the Source'
        target='_blank'
        type='text/html'
        rel='noopener noreferrer nofollow external author'
        href='https://github.com/eldarlrd/ts-battleship'>
        eldarlrd
      </a>
    </footer>
  );
};
