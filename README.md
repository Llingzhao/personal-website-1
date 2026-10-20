# Ling Zhao — Personal Academic Website

A personal academic website for **Ling Zhao**, first-year PhD student in Biology at
Temple University (Yang Lab). Built for a PhD coursework assignment and intended as a
long-term personal homepage.

- 🌐 Language: English
- 🎨 Palette: gray-green-blue — background `#EDF0ED`, text `#3F4A47`, primary `#7F9490`, light `#B4C2BC`
- 📄 Pure static HTML/CSS/JS — no build step, no frameworks, works offline after first load

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, quick intro, highlights (Research / My Lab / Beyond the Lab), publications teaser |
| `about.html` | About — portrait, bio, current PhD status, education & experience timeline, CV download |
| `research.html` | Research — research question, interests, current focus, planned directions, long-term goal, My Lab, publications ("stay tuned") |
| `beyond.html` | Beyond the Lab — photography gallery (with lightbox) and music |
| `contact.html` | Contact — name, identity, university, Yang Lab link, email (mailto), CV download |

Shared components (identical header/footer on all pages) are inlined in each file on purpose,
so the site works when served from any path without server-side includes.

## Assets

```
assets/css/style.css        site styles
assets/js/main.js            mobile menu, scroll reveal, gallery lightbox
assets/*.jpg|*.png          web-optimized photos, stored flat in assets/
  me-*.jpg                  personal photos
  research-*.jpg|png        research reference illustrations
  photo-*.jpg               photography works (photo-sea-cap.jpg.jpg and
                            photo-changbai-lake.jpg.jpg keep their uploaded
                            double-extension names; pages reference them as-is)
assets/CV_LingZhao.pdf  downloadable CV
.nojekyll                   disables Jekyll processing on GitHub Pages
```

All paths are **relative**, so the site loads correctly both at
`https://<username>.github.io/` and at `https://<username>.github.io/<repository-name>/`.
No absolute (`/assets/...`) or local (`C:/Users/...`) paths are used.

## Publish with GitHub Pages

1. Create a new repository on GitHub (e.g. `lingzhao.github.io`, or any name).
2. Upload the **contents of this folder** to the repository root (or push via git).
3. In the repository: **Settings → Pages → Deploy from a branch → `main` / root (`/`)**.
4. The site will be live at `https://<username>.github.io/` (or `/<repository-name>/`) within a few minutes.

## Content notes

- The Research page carefully distinguishes **research interests**, **current focus**,
  and **planned/future directions**; nothing is presented as a completed discovery.
- Microscopy/structural figures are captioned as reference illustrations, not original data.
- No publications, awards, ORCID, Google Scholar, or phone number were added — these were
  not provided. The Publications section says "stay tuned".
- The CV PDF is the file Ling Zhao provided (October 2026). If it changes, replace
  `assets/CV_LingZhao.pdf` with the new file (keep the same filename).

## To-do / can be improved later

- [ ] Update the CV PDF once it includes the Temple PhD entry and the current email.
- [ ] Fill in the "On repeat, lately" music shelf on `beyond.html` with actual favorites.
- [ ] Add publications to `research.html` / `index.html` when the first paper appears.
- [ ] Optionally add ORCID / Google Scholar links to `contact.html` when available.
