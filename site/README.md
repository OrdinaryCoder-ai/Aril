# Calyx — site

Static site for Ad Tray and Calyx. No build step, no dependencies.

## Publishing on GitHub Pages

Two reasonable setups:

**A user/organisation site** at `https://<username>.github.io` — create a repo
named exactly `<username>.github.io`, push these files to the default branch,
done. Best if Calyx is the thing you want at that address.

**A project site** at `https://<username>.github.io/calyx-site` — push to any
repo, then Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.
Better if you want to keep the extension and the site in separate repos and
not commit to the top-level address yet.

Either way the privacy policy lands at `.../privacy.html`, which is the URL
the Chrome Web Store listing needs.

A custom domain is optional and free apart from the domain itself: add a
`CNAME` file containing the bare domain, point a DNS `A` record at GitHub's
Pages IPs, and enable *Enforce HTTPS*.

## Before it goes live

- `index.html` — replace the two placeholder links in the Get it section
  (`#storeLink`, `#repoLink`) and delete the note under them.
- `privacy.html` — replace `REPLACE@EXAMPLE.COM` with a real address, and
  keep the "last updated" date honest.
- Footer GitHub links in both pages.

## Suggested repo layout

Keeping the extension and the site apart is cleaner, since they version at
different rates:

```
calyx-adtray/     the extension — tagged releases, matches manifest version
calyx-site/       this site — deploys on every push
```

If you would rather have one repo, put the extension in `extension/` and the
site in `docs/`, then point Pages at the `docs` folder.

## Versioning the extension

The Chrome Web Store requires the version in `manifest.json` to increase on
every upload, and versions cannot be reused even after a rejection. A simple
scheme that works:

- `1.0.0` — first public release
- `1.0.1` — bug fixes only
- `1.1.0` — new user-visible feature
- `2.0.0` — a change that alters how the extension behaves by default

Tag each store submission in git (`git tag v1.0.1`) so you can always check
out exactly what a published version contained. That matters the first time a
user reports something you cannot reproduce on your working copy.

Keep a `CHANGELOG.md` from the start. It costs nothing now and is painful to
reconstruct later.
