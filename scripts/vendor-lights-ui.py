#!/usr/bin/env python3
"""Vendor the linked_friend_lights web app into this repo as lichter.html.

Takes the upstream file and re-applies the two local changes this app needs,
so syncing from upstream never loses them:

  1. favicon → this app's icon (the upstream SVG lives in the other repo)
  2. a back control in the header → returns to whichever player's page you
     came from (history.back(), falling back to index.html on a cold open)

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

BACK_LINK = (
    '<a href="./index.html" aria-label="Zurück zum Gacha"\n'
    '     onclick="if (history.length > 1) { history.back(); return false; }"\n'
    '     style="text-decoration:none;font-size:1.05rem;line-height:1;color:var(--text2);'
    'padding:0.35rem 0.55rem;border:1px solid var(--border);border-radius:10px;'
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
