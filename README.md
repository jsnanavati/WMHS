# WMHS — NeurIPS 2026 Workshop Website

**World Models for High-Stakes Health: Reliable Clinical Trial Simulation and Intervention-Aware Reasoning**

Static site for the NeurIPS 2026 workshop (Atlanta).

## Local preview

```bash
python3 -m http.server 8080
```

Visit [http://localhost:8080](http://localhost:8080).

## Publish to GitHub Pages

From this repo root (requires [GitHub CLI](https://cli.github.com/) authenticated once with `gh auth login`):

```bash
# Create the GitHub repo and push
gh repo create WMHS --public --source=. --remote=origin --push

# Enable GitHub Pages from the main branch root
gh api repos/{owner}/{repo}/pages -X POST -f build_type=legacy -f source[branch]=main -f source[path]=/

# Or via UI: Settings → Pages → Deploy from branch → main /root → Save
```

Site URL will be:

`https://<your-github-username>.github.io/WMHS/`

If the repo is already created:

```bash
git remote add origin git@github.com:<your-username>/WMHS.git
git push -u origin main
```

Then enable Pages on `main` / root (includes `.nojekyll` for static assets).
