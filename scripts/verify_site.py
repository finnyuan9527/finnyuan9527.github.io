"""Validate the built site's routes, reading outline and navigation paths.

Run after `npm run build`: python3 scripts/verify_site.py
"""
from html.parser import HTMLParser
from ast import literal_eval
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links = []
        self.ids = set()
        self.headings = []
        self.current = []
        self.feed(html)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate id: {attrs['id']}"
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.headings.append(int(tag[1]))
        if attrs.get('aria-current') == 'page':
            self.current.append(attrs.get('href'))


files = sorted(DIST.rglob('index.html'))
expected = 5 + sum(len(list((ROOT / 'src/content' / name).glob('*.mdx'))) for name in ['projects', 'notes'])
assert len(files) == expected, f'Expected {expected} content pages, got {len(files)}'
pages = {file: Page(file.read_text()) for file in files}
links_checked = 0
for file, page in pages.items():
    relative = file.relative_to(DIST)
    assert page.headings.count(1) == 1, f'{relative}: expected one H1'
    assert page.headings[0] == 1, f'{relative}: first heading must be H1'
    previous = 0
    for level in page.headings:
        assert level <= previous + 1, f'{relative}: heading skips from H{previous} to H{level}'
        previous = level
    assert len(page.current) == 1, f'{relative}: current navigation item missing or ambiguous'
    assert '/contact' in page.links, f'{relative}: contact path missing'
    assert '#main-content' in page.links and 'main-content' in page.ids, f'{relative}: skip link broken'
    assert 'nav-toggle' in page.ids and 'main-nav' in page.ids, f'{relative}: mobile navigation missing'
    if relative.parts[0] == 'projects' and len(relative.parts) == 3:
        assert 'evidence-heading' in page.ids, f'{relative}: evidence scope missing'
        assert any(link.startswith('/notes/') for link in page.links), f'{relative}: related methods missing'
    if relative.parts[0] == 'notes' and len(relative.parts) == 3:
        assert any(link.startswith('/projects/') for link in page.links), f'{relative}: related cases missing'
    for href in page.links:
        parsed = urlsplit(href)
        if parsed.scheme or parsed.netloc:
            continue
        candidate = (DIST / parsed.path.lstrip('/')) if parsed.path.startswith('/') else (file.parent / parsed.path) if parsed.path else file
        if candidate.is_dir():
            candidate /= 'index.html'
        if not candidate.exists() and not candidate.suffix:
            candidate /= 'index.html'
        assert candidate.exists(), f'{relative}: broken link {href}'
        if parsed.fragment and candidate.suffix == '.html':
            assert unquote(parsed.fragment) in pages[candidate].ids, f'{relative}: broken anchor {href}'
        links_checked += 1
print(f'PASS: {len(files)} pages; {links_checked} internal links; H1/outline/current navigation/contact/skip links/related reading verified.')

# Check authored relationships too: unknown IDs must not silently disappear.
for collection, field, destination in [('projects', 'relatedNotes', 'notes'), ('notes', 'relatedProjects', 'projects')]:
    for source in (ROOT / 'src' / 'content' / collection).glob('*.mdx'):
        lines = source.read_text().split('---', 2)[1].splitlines()
        reference = next(line for line in lines if line.startswith(field + ':'))
        targets = literal_eval(reference.split(':', 1)[1].strip())
        page = pages[DIST / collection / source.stem / 'index.html']
        for target in targets:
            assert (ROOT / 'src' / 'content' / destination / (target + '.mdx')).exists(), f'{source.name}: unknown related ID {target}'
            assert f'/{destination}/{target}' in page.links, f'{source.name}: authored related link not rendered {target}'
print('PASS: all authored case/article relationships exist and render.')
