# GitHub Pages deployment

This site is a static export deployed from the **main** branch root.

## Enable Pages (one-time setup)

1. Open **https://github.com/Frpratik/big-balloon/settings/pages**
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**
3. **Branch:** `main` — **Folder:** `/ (root)`
4. Click **Save**

After that, every `git push` to `main` updates the live site automatically.

## Do not use the GitHub Actions Pages workflow

The Actions-based Pages deploy requires repo admin API access that this repository does not grant to CI. Branch deploy is simpler and works with the static files already in this repo.

## Local update flow

```bash
cd next-monorepo
npm run export:pages --workspace=web
cd ../luxury-events
git add -A
git commit -m "Deploy site update"
git push origin main
```
