# Mehmet Aytuğ Yürük — Personal Website

Personal academic website for computer-vision research, medical image analysis,
reproducible deep learning, and research engineering.

**Live site:** [mehmetaytugyuruk.github.io](https://mehmetaytugyuruk.github.io)

## Architecture

The site uses the native Jekyll support provided by GitHub Pages:

```text
_config.yml             Site configuration
_data/                  Profile, education, publication, and software data
_includes/              Shared publication-card markup
_layouts/               Shared document and legacy-route redirect layouts
assets/css/             Site stylesheet
assets/images/          Site, publication, and project imagery
tools/og-card.html      Source for the social preview image
index.html               Homepage
publications.html         Redirect to the Publications section on the home page
projects.html             Redirect to the Projects section on the home page
certificates.html         Redirect to the Certificates section on the home page
about.html                Redirect to the home page
open-source.html          Redirect to the Projects section on the home page
education.html            Redirect to the Education section on the home page
pages/                    Legacy route redirects
```

Profile, education, publication, and project content is kept in `_data/`.

## Local development

With Jekyll available, build and serve the repository root:

```bash
jekyll build
jekyll serve
```

The site has no JavaScript framework, Node build pipeline, custom plugin, or
animated background process.

## Route compatibility

The home page is the canonical one-page site. The former content routes
`/publications/`, `/projects/`, `/education/`, `/certificates/`, and `/about/`
remain as native HTML meta-refresh redirects to their corresponding home-page
sections. Legacy `/open-source/` and `/pages/.../` URLs remain compatible too.
