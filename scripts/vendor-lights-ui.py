#!/usr/bin/env python3
"""Vendor the linked_friend_lights web app into this repo as lichter.html.

Takes the upstream file and re-applies the local changes this app needs, so
syncing from upstream never loses them:

  1. favicon → this app's icon (the upstream SVG lives in the other repo)
  2. a back control in the header → returns to whichever player's page you
     came from (history.back(), falling back to index.html on a cold open)
  3. drop the manifest link — it resolves to the GACHA's manifest.json here,
     which would make the lights page advertise itself as the gacha PWA
  4. apple-touch-icon → this app's PNG (upstream points at favicon.svg, which
     does not exist in this repo)
  5. neuter the service-worker registration — "./sw.js" resolves to the
     gacha's service worker here, not the lights one. The gacha app already
     registers it for this origin; doing it again from a sub-page is at best
     redundant and at worst re-activates it at the wrong moment.

3-5 exist because upstream moved its web app to the repo root and picked up
PWA tags that only make sense when it is served standalone.

Usage: python3 scripts/vendor-lights-ui.py <upstream.html> <output.html>
Idempotent: running it on an already-vendored file changes nothing.
"""
import re
import sys

FAVICON_SRC = re.compile(
    r'<link rel="icon"[^>]*href="/?favicon\.svg"[^>]*>\s*'
    r'(?:<link rel="icon"[^>]*href="favicon\.svg"[^>]*>\s*)?'
)
FAVICON_OUT = '<link rel="icon" href="./media/icon-192.png" type="image/png">\n  '

# Resolves to this repo's own manifest.json — the gacha's — so the lights page
# would claim the gacha's name, start_url and scope. No manifest is correct
# here: lichter.html is a page inside the gacha PWA, not an app of its own.
MANIFEST_SRC = re.compile(r'\s*<link rel="manifest"[^>]*>')

# favicon.svg lives in the other repo and is not vendored.
APPLE_ICON_SRC = re.compile(r'<link rel="apple-touch-icon"[^>]*href="/?favicon\.svg"[^>]*>')
APPLE_ICON_OUT = '<link rel="apple-touch-icon" href="./media/apple-touch-icon.png">'

SW_SRC = re.compile(
    r'navigator\.serviceWorker\.register\(\s*"\.\/sw\.js"\s*\)'
)
SW_OUT = 'Promise.reject(new Error("vendored: gacha SW owns this origin"))'

# 44x44 minimum: this was 25x30, the smallest control on the page, and it is
# the one you reach for one-handed at the top-left corner of a small phone.
BACK_LINK = (
    '<a href="./index.html" aria-label="Zurück zum Gacha"\n'
    '     onclick="if (history.length > 1) { history.back(); return false; }"\n'
    '     style="text-decoration:none;font-size:1.05rem;line-height:1;color:var(--text2);'
    'min-width:44px;min-height:44px;display:inline-flex;align-items:center;justify-content:center;'
    'border:1px solid var(--border);border-radius:10px;'
    'margin-right:0.6rem;flex:none">‹</a>\n  '
)


def vendor(html: str) -> str:
    if 'href="./media/icon-192.png"' not in html:
        html, n = FAVICON_SRC.subn(FAVICON_OUT, html, count=1)
        if n == 0:
            print("warning: no favicon link found to replace", file=sys.stderr)

    if 'aria-label="Zurück zum Gacha"' not in html:
        marker = "<header>\n  "
        if marker in html:
            html = html.replace(marker, marker + BACK_LINK, 1)
        else:
            print("warning: no <header> found — back control not added", file=sys.stderr)
            sys.exit(1)

    html = MANIFEST_SRC.sub("", html)

    if 'href="./media/apple-touch-icon.png"' not in html:
        html = APPLE_ICON_SRC.sub(APPLE_ICON_OUT, html, count=1)

    # The .catch() upstream already wraps this, so a rejected promise just
    # logs a warning instead of throwing — the UI is untouched either way.
    if "vendored: gacha SW owns this origin" not in html:
        html = SW_SRC.sub(SW_OUT, html, count=1)

    return html


def main() -> None:
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    src, dst = sys.argv[1], sys.argv[2]
    with open(src, encoding="utf-8") as fh:
        html = fh.read()
    out = vendor(html)
    with open(dst, "w", encoding="utf-8") as fh:
        fh.write(out)
    print(f"Vendored {src} → {dst}")


if __name__ == "__main__":
    main()
