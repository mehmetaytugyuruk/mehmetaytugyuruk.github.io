# Mehmet Aytuğ Yürük — Personal Website

Personal academic website for computer-vision research, medical image analysis,
reproducible deep learning, and research engineering.

**Live site:** [mehmetaytugyuruk.github.io](https://mehmetaytugyuruk.github.io)

## Architecture

The site uses the native Jekyll support provided by GitHub Pages:

```text
_config.yml             Site configuration
_data/                  Profile, navigation, research, publication, and software data
_includes/              Shared header and footer
_layouts/               Shared HTML document and page layouts
index.html               Homepage
publications.html         Canonical publication record
open-source.html          Research-engineering and computer-vision software
education.html            Education and certificates
about.html                Profile and contact details
pages/                    Legacy route redirects
```

Publication facts and links are stored in `_data/publications.yml`; the Home
and Publications views read from that source.

## Local development

With Jekyll available, build and serve the repository root:

```bash
jekyll build
jekyll serve
```

The site deliberately has no JavaScript framework, Node build pipeline, custom
plugin, or animated background process.

## Route compatibility

The canonical content routes are `/publications/`, `/open-source/`,
`/education/`, and `/about/`. The former `/pages/.../` URLs remain as native
HTML meta-refresh redirects with canonical tags and visible fallback links.
