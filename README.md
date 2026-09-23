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
assets/css/             Site stylesheet
assets/images/          Site, publication, and project imagery
index.html               Homepage
publications.html         Canonical publication record
projects.html             Research-engineering and computer-vision projects
certificates.html         Awards, competitions, and conference certificates
about.html                Concise profile, education, and selected links
open-source.html          Redirect to the canonical Projects route
education.html            Academic background and education history
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

The site has no JavaScript framework, Node build pipeline, custom plugin, or
animated background process.

## Route compatibility

The canonical content routes are `/publications/`, `/projects/`,
`/education/`, `/certificates/`, and `/about/`. The former `/open-source/`
and `/pages/.../` URLs remain as native HTML meta-refresh redirects with
canonical tags and visible fallback links.
