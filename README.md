# Couch Stats

Generate stat lines from your couch. Couch Stats makes fake, broadcast-style player stat cards for you and your friends, with your name, team and photo, then exports them as an image or a shareable link. For entertainment only.

**Live:** https://vmannusa.github.io/Couch-Stats/

## Features

- **Four sports**, each with its own stat set:

| Sport | Stats |
| --- | --- |
| Basketball | Minutes, points, FGM/FGA, 3PM/3PA, rebounds, assists, fouls |
| Football | Passing, rushing and receiving yards, TDs, INTs |
| Baseball | AB, H, R, RBI, HR |
| Soccer | Minutes, goals, assists, shots, yellow and red cards |

- **Three card themes:** ESPN-like (red), ESPN Fantasy-like (blue), Yahoo Fantasy-like (purple).
- **Randomize** rolls a believable (usually unimpressive) stat line for the selected sport.
- **Editable stats:** tweak any number by hand.
- **Photo:** add a picture from your device; it stays on your device and isn't uploaded.
- **Download Image** saves the card as a PNG (via `html2canvas`).
- **Copy Link** puts the whole card (sport, theme, name, team, stats) into a URL so anyone can open the same card. Photos aren't included in links.

## Tech

React 18 + TypeScript, built with Vite 7. Deployed to GitHub Pages.

| Path | What it is |
| --- | --- |
| `src/App.tsx` | The whole app: sports, themes, stat generator, export and share link. |
| `src/styles.css` | Layout and theme colors. |
| `src/main.tsx` | React entry point. |
| `vite.config.ts` | Vite config; `base` is set to `/Couch-Stats/` for GitHub Pages. |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages on every push to `main`. |

## Run locally

Requires Node.js 20+.

```bash
git clone https://github.com/vmannusa/Couch-Stats.git
cd Couch-Stats
npm install
npm run dev
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run deploy` | Manual deploy of `dist/` to a `gh-pages` branch. |

## Deploying

Pushes to `main` run the **Deploy Vite App to GitHub Pages** workflow. For it to publish, **Settings > Pages > Source** must be set to **GitHub Actions**.

If you rename the repo, update `base` in `vite.config.ts` to match.

See the [change log](CHANGELOG.md) for history.
