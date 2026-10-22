# AGENTS.md

## Rules

- The site is a single-page scroll layout: all content renders on `/` as stacked sections (`#home`, `#about`, `#research`, `#contact`). The nav scrolls to a section with `scrollIntoView` and tracks the active one from scroll position — do not reintroduce per-page routes or router navigation for content, because the sections must stay reachable in one document.
- Keep the old paths `/about`, `/projects` and `/contact` as redirects to the matching hash anchor, so links already published elsewhere (ORCID, university page) still land on the right section.
- Only the hero carries an `<h1>`; every other section heading starts at `<h2>` so the single document keeps one heading hierarchy.
- Section components in `src/pages/` stay importable as standalone blocks so the layout can be split again later without rewriting content.
