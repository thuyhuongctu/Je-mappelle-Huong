<div align="center">

# Je m'appelle Hương

### Personal Academic Homepage of Đỗ Thùy Hương

The standalone academic homepage and central hub of a digital ecosystem for
research, teaching and open educational software.

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22003853.svg)](https://doi.org/10.5281/zenodo.22003853)
[![Copyright](https://img.shields.io/badge/©%202026-all%20rights%20reserved-8d7166.svg)](#license-and-third-party-components)
[![Site](https://img.shields.io/badge/site-live-2ea44f)](https://thuyhuongctu.github.io/JESUISHUONG_WEBSITE_2026/)

**[▶ Live site: thuyhuongctu.github.io/JESUISHUONG_WEBSITE_2026](https://thuyhuongctu.github.io/JESUISHUONG_WEBSITE_2026/)**

</div>

---

## Contents

- [Overview](#overview)
- [Tóm tắt tiếng Việt](#tóm-tắt-tiếng-việt)
- [Digital ecosystem](#digital-ecosystem)
- [Site contents](#site-contents)
- [Technology](#technology)
- [Repository structure](#repository-structure)
- [Running locally and deployment](#running-locally-and-deployment)
- [Authoring tools](#authoring-tools)
- [How to cite](#how-to-cite)
- [License and third-party components](#license-and-third-party-components)
- [Author and contact](#author-and-contact)

## Overview

**Je m'appelle Hương** is the personal academic homepage of **Đỗ Thùy Hương**,
PhD candidate in Business Administration at Can Tho University, whose research
concerns the relationship between internationalization and firm performance
among enterprises in Asia.

The site serves three purposes. It presents a bilingual (Vietnamese–English)
academic profile covering research, teaching and publications. It acts as the
central hub linking the author's open software projects, each of which is
separately archived and citable. And it functions as a public dissemination
channel, carrying an academic news blog, an interactive data globe backed by
World Bank Open Data, an illustrated virtual-guide character, an interactive
3D garden, and a songbook of original recordings.

The entire site is plain HTML, CSS and JavaScript. It requires no build step,
no framework and no server-side component, and is published as a static site on
GitHub Pages. This repository is therefore both the source code and the
deployable artefact: the archived release can be opened and read without any
toolchain, which is the property that makes the deposit useful in the long term.

## Tóm tắt tiếng Việt

**Je m'appelle Hương** là trang học thuật cá nhân của **Đỗ Thùy Hương** —
nghiên cứu sinh tiến sĩ ngành Quản trị kinh doanh tại Trường Đại học Cần Thơ,
nghiên cứu về quốc tế hóa và hiệu quả hoạt động kinh doanh của doanh nghiệp
ở châu Á.

Trang là cổng trung tâm của toàn bộ hệ sinh thái số: hồ sơ học thuật song ngữ,
liên kết các dự án phần mềm mở đã có DOI, blog tin tức học thuật, quả cầu dữ
liệu World Bank tương tác, nhân vật hướng dẫn Hương AI, trang viên 3D và tập
bài hát. Toàn bộ viết bằng HTML/CSS/JS thuần, không cần cài đặt, không cần
build, chạy trên GitHub Pages.

## Digital ecosystem

| Project | Description | Link | DOI |
|---|---|---|---|
| 🎓 **PhD dissertation** | *Internationalization and firm performance among enterprises in Asia* (World Bank Enterprise Surveys, 50 economies). Full page to follow on publication | *Forthcoming* | — |
| 🧩 **M-AIDA** | Meta-Analysis Intelligent Data Assistant: human-verified extraction of effect sizes for meta-analysis | [Site](https://thuyhuongctu.github.io/M-AIDA/) | — |
| 🎲 **BizOn AI** | Multi-agent "living market" business simulation game for higher education | [Site](https://thuyhuongctu.github.io/BizOn/) | — |
| 📝 **EnQuiz** | Bilingual revision app for an entrepreneurship course (300 questions, installable, offline) | [Site](https://thuyhuongctu.github.io/EnQuiz/) | [10.5281/zenodo.21850735](https://doi.org/10.5281/zenodo.21850735) |
| 📚 **ComDraft** | Teaching package for the course Communication and Document Drafting Skills: five lecture decks, three computer-lab workbooks, a 200-question bank, eight subtitled videos and an offline revision app | [Site](https://thuyhuongctu.github.io/ComDraft/) | [10.5281/zenodo.22003676](https://doi.org/10.5281/zenodo.22003676) |
| 🎵 **We Create Tomorrow** | Bilingual karaoke app for the anthem of the School of Economics, Can Tho University; co-authored with Assoc. Prof. Dr. Phan Anh Tu | [Site](https://thuyhuongctu.github.io/we-create-tomorrow/) | [10.5281/zenodo.22080061](https://doi.org/10.5281/zenodo.22080061) |
| 🎮 **ThuyHuong Digital 2026 — Games** | Vietnamese history game portal: Vân Đồn (1149), Bắc Hải Đảo (1780, 2D and 3D), Chợ Nổi (19th century) | [Site](https://thuyhuongctu.github.io/ThuyHuong_Digital-2026-Games/) | [10.5281/zenodo.21850564](https://doi.org/10.5281/zenodo.21850564) |

## Site contents

- **Bilingual academic profile** (Vietnamese and English) with light and dark themes
- **Ecosystem cards** linking each open project and its archived release
- **Interactive map homepage**: a hand-drawn estate map through which a 3D
  character cycles between the main sections of the site
- **Hương AI virtual guide**: an illustrated character with narrated tours in
  English and French
- **Interactive 3D globe** with live World Bank Open Data charts
- **Trang viên (3D garden)**: an explorable scene with a time-of-day cycle,
  ambient audio and a small game
- **Songbook**: original recordings with synchronised lyrics
- **Academic news blog** and an ecosystem slide deck

## Technology

| Layer | Implementation |
|---|---|
| Pages | Plain HTML5, CSS and vanilla JavaScript; no framework, no build step |
| 3D | [three.js](https://threejs.org/) r128, vendored in `assets/vendor/` for offline operation |
| Data | World Bank Open Data API; Zenodo API for live download statistics |
| Audio | Web Audio API for ambience; HTML5 audio for recordings |
| App platform | Progressive Web App: web manifest, service worker with versioned cache |
| Hosting | GitHub Pages, deployed automatically on each push to the default branch |
| Archiving | Releases are deposited in [Zenodo](https://doi.org/10.5281/zenodo.22003853) with a DOI |

## Repository structure

```
.
├── index.html               Homepage: estate map, 3D character, ecosystem
├── blog.html                Academic news blog
├── trangvien.html           3D garden scene
├── songbook.html            Songbook with synchronised lyrics
├── music.html               Recordings
├── audio.html               Audio index
├── assets/                  css, js, img, audio, vendored libraries
├── deck-ecosystem/          Ecosystem slide deck and design specification
├── design-demos/            Design directions and approval record
├── docs/                    Supporting documentation
├── icons/                   Application icon set
├── manifest.webmanifest     Web application manifest
├── sw.js                    Service worker (versioned offline cache)
├── zenodo-stats.js          Live Zenodo download statistics
└── sitemap.xml, robots.txt  Search-engine metadata
```

## Running locally and deployment

```bash
git clone https://github.com/thuyhuongctu/JESUISHUONG_WEBSITE_2026.git
cd JESUISHUONG_WEBSITE_2026
python3 -m http.server 8000     # then open http://localhost:8000
```

Serving the directory over HTTP is required only for the service worker and the
installation prompt; individual pages also open directly from the file system.

Deployment is handled by GitHub Pages from the repository's default branch at
the root path. No build or release pipeline is involved.

## Authoring tools

The repository carries agent skills used to produce the site's media, kept
under `.claude/skills/`:

- **MiniMax H3 video skills** (from
  [thuyhuongctu/MiniMax-H3](https://github.com/thuyhuongctu/MiniMax-H3)) for
  short-form video: prompt writing, brand promotion, 3D animation, music-video
  subtitling, product advertising, and several illustrated explainer styles.
  Rendering is performed through [hailuoai.video](https://hailuoai.video/tools/minimax-h3)
  or the MiniMax API.
- **huashu-design** (MIT, from
  [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design)) for
  interactive prototypes, 1920×1080 HTML slide decks, motion design and design
  review. Installed in reduced form; see
  `.claude/skills/huashu-design/LOCAL-NOTE.md`.

Longer-form video is produced with
[OpenMontage](https://github.com/calesthio/OpenMontage) (AGPL-3.0), used as an
external tool and deliberately **not** vendored into this repository:

```bash
GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/calesthio/openmontage
```

It requires Python 3.10 or later, FFmpeg and Node 18 or later, and offers a
fully free generation path (Piper TTS, Pexels, Archive.org) without API keys.

## How to cite

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22003853.svg)](https://doi.org/10.5281/zenodo.22003853)

Citation metadata is maintained in [`CITATION.cff`](CITATION.cff); GitHub's
**Cite this repository** control exports APA and BibTeX from that file.

> Do, T. H. (2026). *Je m'appelle Hương: personal academic homepage*
> [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.22003853

```bibtex
@software{do_je_mappelle_huong_2026,
  author    = {Do, Thuy Huong},
  title     = {{Je m'appelle Hương: personal academic homepage}},
  year      = {2026},
  publisher = {Zenodo},
  version   = {1.0},
  doi       = {10.5281/zenodo.22003853},
  url       = {https://doi.org/10.5281/zenodo.22003853}
}
```

The DOI above is the **concept DOI**, which represents all versions and always
resolves to the most recent release. Individual releases carry their own DOIs:

| Version | Released | DOI |
|---|---|---|
| 1.0 | 18 August 2026 | [10.5281/zenodo.22003854](https://doi.org/10.5281/zenodo.22003854) |

## License and third-party components

**© 2026 Đỗ Thùy Hương. All rights reserved.**

This work is published for reading, consultation and citation. It is **not**
released under an open-source or open-content licence. No permission is granted
to copy, redistribute, republish, modify, translate or reuse the site, its
source code, its written content, its images, its recordings or the *Hương AI*
character, in whole or in part, whether for commercial or non-commercial
purposes, without the prior written permission of the author.

Quotation for academic purposes, with attribution and a citation to the record
below, is permitted under normal scholarly practice and applicable copyright
exceptions.

Permission requests: [thuyhuongctu@gmail.com](mailto:thuyhuongctu@gmail.com)

Third-party components used by the site remain under their own licences and are
not covered by the reservation above:

| Component | Use | Licence |
|---|---|---|
| [three.js](https://threejs.org/) r128 | 3D scenes, vendored in `assets/vendor/` | MIT |
| [huashu-design](https://github.com/alchaincyf/huashu-design) | Design skill, `.claude/skills/` | MIT |
| [OpenMontage](https://github.com/calesthio/OpenMontage) | External video tool, not vendored | AGPL-3.0 |

## Author and contact

**Đỗ Thùy Hương** (Do Thuy Huong)
PhD candidate in Business Administration, Can Tho University

- ORCID: [0000-0002-7711-2487](https://orcid.org/0000-0002-7711-2487)
- Google Scholar: [profile](https://scholar.google.com/citations?hl=vi&user=jSvAVnsAAAAJ)
- OSF: [m25qs](https://osf.io/m25qs/)
- Email: [thuyhuongctu@gmail.com](mailto:thuyhuongctu@gmail.com)

---

<div align="center">

© 2026 Đỗ Thùy Hương. All rights reserved.

</div>
