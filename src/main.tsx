/**
 * @license AGPL-3.0-only
 * TS Battleship - A Battleship game
 * Copyright (C) 2023-2025 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of TS Battleship.
 *
 * TS Battleship is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * TS Battleship is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TS Battleship. If not, see <https://www.gnu.org/licenses/>.
 */

import { render } from 'solid-js/web';

import { App } from '@/app.tsx';

const root = document.getElementById('root');

if (root) render(() => <App />, root);

const registerSW = (): void => {
  if ('serviceWorker' in navigator)
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/ts-battleship/sw.js', {
          scope: '/ts-battleship/'
        })
        .catch((error: unknown) => {
          if (error instanceof Error) console.error(error);
        });
    });
};

registerSW();
