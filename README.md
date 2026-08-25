# ORINOCO Lite presentation

A source-rich web presentation for the Center for Open Neuroscience team about
upstream ORINOCO, CON's GitHub-centered operating profile, the current metadata
corpus, and the team's shared curation role.

The published deck is at
<https://leej3.github.io/orinoco-lite-presentation/>.

## Navigate

- Arrow keys, Page Up/Page Down, Space, Home, and End move through the deck.
- The navigation dots and mobile controls jump between slides.
- Every technical slide includes direct sources or further-reading links.
- Slide IDs are stable URL fragments, for example `#metadata` and `#curation`.

The [presentation content draft](docs/presentation-content.md) is the working
Markdown version of the deck, with one section per slide for discussion and
revision.

## Run locally

Node.js 22.13 or newer is required.

```console
npm install
npm run dev
```

Open <http://localhost:3000/>.

## Validate and build

```console
npm run lint
npm test
```

The static export is written to `out/`. GitHub Actions rebuilds it with the
repository base path and deploys it to GitHub Pages.

## Sources and terminology

The upstream slides anchor on the [ORINOCO project][orinoco],
[DataLad Concepts][concepts], the [Things usage considerations][usage], and the
[ORINOCO repository collection][hub]. Orinoco Lite terms are identified as
local transport or storage choices rather than presented as upstream
vocabulary.

Current Lite claims link to the corresponding plans, specifications,
acceptance records, repositories, and review pull requests. Status-sensitive
slides are dated 25 August 2026.

## Credits and license

The responsive interaction model was informed by John's
[STAMPED study presentation][stamped]. The warm beige visual identity,
CON/Dartmouth letterhead, and Ukraine ribbon adapt the established
[`con/talks`][talks] presentation style. The social-preview image was generated
for this project with OpenAI image generation.

The project is licensed under [CC BY-SA 4.0](LICENSE). Upstream projects and
linked sources retain their own licenses. Project and institutional marks do
not grant trademark rights or imply endorsement beyond this CON presentation.

[concepts]: https://concepts.datalad.org/
[hub]: https://hub.psychoinformatics.de/orinoco/
[orinoco]: https://www.psychoinformatics.de/projects/orinoco/
[stamped]: https://github.com/leej3/stamped-study-presentation
[talks]: https://github.com/con/talks
[usage]: https://concepts.datalad.org/usage-considerations/
