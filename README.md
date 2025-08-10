# Couch-Stats

Couch-Stats is a small React + Vite app that generates jokey sports stat lines with selectable themes.
This repo is configured to auto-deploy to GitHub Pages using GitHub Actions (on pushes to `main`), or you can deploy manually with `gh-pages`.

## Quick start

1. Fork this repo to your GitHub account.
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Couch-Stats.git
   cd Couch-Stats
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run locally:
   ```bash
   npm run dev
   ```
5. Push to `main` and Pages will auto-deploy (GitHub Actions included).

## Notes
- The `vite.config.ts` has `base: '/Couch-Stats/'`. If you rename the repo, update that value.
- The app uses `html2canvas` to export stat cards as images.
- The "Copy Link" feature serializes the card into the URL so others can open the same card.
