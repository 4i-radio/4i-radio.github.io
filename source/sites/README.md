# 4i RADIO GitHub Pages ports

Each folder contains the original public-facing Next.js app adjusted for its GitHub Pages subpath. The corresponding static output is checked in at the repository root under `members/ichijo`, `members/yamada`, `members/miyazaki`, `live`, `stream`, `farm`, and `cover-notes`. Kanzaki's existing static version and its source remain separate.

To rebuild a port, run `npm ci` in this directory. In the desired app folder, restore its public assets under `public/` from the matching published subpath (not generated `_next`, `__next*`, HTML, or RSC text files), then run `npx next build --webpack`. Copy the app's `out/` contents back to its published subpath. Keep the repository's `.nojekyll` file so that GitHub Pages serves `_next` assets.

Private Sites, account credentials, and user data are not part of these ports.
