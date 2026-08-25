# ORINOCO Lite team briefing — content draft

This is the working content draft for the CON team presentation. Each slide is
represented by a section so we can discuss and revise the story before changing
the web presentation again.

The deck's communication job is: by the end, the CON team should understand
why ORINOCO Lite keeps the upstream Things model while changing the curation
transport, and feel ready to review and curate records in the GitHub workflow.

Global navigation, slide numbers, and the progress indicator are presentation
chrome rather than slide content. Status-sensitive claims are dated **24 August
2026**.

## Slide 1 — ORINOCO Lite: what CON knows

**Eyebrow:** Center for Open Neuroscience · team briefing

**Title:**

> ORINOCO Lite<br />
> *what CON knows*

**Subtitle:** Upstream Things semantics, GitHub-centered curation, and a shared
research-information foundation for the lab.

**Actions:**

- [Upstream ORINOCO](https://www.psychoinformatics.de/projects/orinoco/)
- [Lite engineering](https://github.com/con/orinoco-lite-dev)

**Presenter:** John Lee · CON team · 2026

## Slide 2 — Every lab task reconstructs facts the lab already knows

**Eyebrow:** The recurring problem

**Title:** Every lab task reconstructs facts the lab already knows.

**Body:** People, projects, publications, datasets, instruments, grants, roles,
and relationships are scattered across systems—and copied again for every
output.

**Repeated outputs:**

1. Website
2. Grant
3. CV
4. Annual report
5. Discovery
6. AI-assisted workflow

**Callout:** A website is a useful first view. The durable asset is the curated,
structured knowledge beneath it.

**Sources:**

- [CON US-RSE draft](https://github.com/con/talks/blob/e321a1da0c34a12c6411fea26c7718a58e4fedb6/2026-usrse/orinoco-lite-poster-draft.md)
- [Barcelona Declaration / open research information](https://barcelona-declaration.org/)

## Slide 3 — Focused metadata systems contribute to—and learn from—a curated knowledge base

**Eyebrow:** Upstream ORINOCO · concept

| Purpose-built UI or API | Integrated knowledge |
| --- | --- |
| **custom data model**<br />
submission → curation → application records | **generic Things model**<br />
submission → curation → knowledge graph |

The two sides transform, filter, and export between one another.

**Key points:**

- **Thing** = an identified record with a `pid` and `schema_type`.
- **Both sides are modeled data.** The generic representation is the
  integration layer—not every application's ideal working shape.
- **Curators control entry.** Submissions enter an inbox before joining the
  curated area.

**Sources:**

- [Things usage considerations](https://concepts.datalad.org/usage-considerations/)
- [Things v1 schema](https://concepts.datalad.org/s/things/v1/)
- [Schema composition](https://concepts.datalad.org/about/)
- [Pinned Things schema mirror](https://github.com/leej3/things-schemas/tree/cb6c791aec4c5309775437df4bd58e94e1bfcc3c)

**Status note:** ORINOCO Lite deliberately pins the source Things v1 contract;
upstream documentation continues to evolve.

## Slide 4 — ORINOCO is an interoperating ecosystem, not one application

**Eyebrow:** Upstream ORINOCO · components

| Role | Component | What it contributes | Link |
| --- | --- | --- | --- |
| Model | Things Schemas | LinkML definitions, identifiers, validation shapes | [upstream](https://hub.psychoinformatics.de/orinoco/things-schemas) |
| View | SHACL Vue | Schema-generated browser navigation and forms | [upstream](https://hub.psychoinformatics.de/orinoco/shacl-vue) |
| Store | Dump Things Service | Collections, inboxes, curated area, validation, audit | [upstream](https://hub.psychoinformatics.de/orinoco/dump-things-service) |
| Acquire | Enrichment tools | Importers and enrichers with assertion provenance | [upstream](https://hub.psychoinformatics.de/orinoco/things-enrichment-tools) |
| Query | query-things | Selection and serialization for downstream uses | [upstream](https://hub.psychoinformatics.de/orinoco/query-things) |
| Present | FLOW / www-from-model | Linked reports and complete websites | [FLOW](https://hub.psychoinformatics.de/orinoco/flow) |
| Explore | things-graph-renderer | Graph navigation over the knowledge pool | [upstream](https://hub.psychoinformatics.de/orinoco/things-graph-renderer) |

**Further reading and Lite pins:**

- [ORINOCO repository collection](https://hub.psychoinformatics.de/orinoco/)
- [Dump Things introduction](https://dump-things-service.readthedocs.io/en/latest/introduction.html)
- [SHACL Vue](https://www.psychoinformatics.de/instruments/shacl-vue/)
- [Lite Dump Things Service pin](https://github.com/leej3/dump-things-service/tree/9f101d97c7f15d491f602db5a9c33ad9a19ad8bf)
- [Lite query-things pin](https://github.com/leej3/query-things/tree/ef1141430a471455d4a5f4e07d7989ec717f56f4)
- [Lite www-from-model pin](https://github.com/leej3/www-from-model/tree/6c8b9a5b7260dc20dfe1453dd863b353e8f90f06)

## Slide 5 — CON already has a collaboration and review system: GitHub

**Eyebrow:** Why a Lite operating profile?

**Title:** CON already has a collaboration and review system: GitHub.

**Thesis:** Keep the upstream semantic model. Change the curation transport to
fit a lab that already reviews durable work in Git.

**Why this helps:**

1. **One ordinary repository.** Human-readable YAML, editorial content,
   assets, and policy travel together.
2. **Pull requests are the inbox.** Familiar diffs, comments, authorship,
   checks, and merge history.
3. **Static work stays static.** Validate, build, edit, preview, and deploy
   without a continuously running metadata service.
4. **Upstream remains the center.** Pin, reuse, parity-test, contribute fixes
   upstream, and retire local seams when possible.

**Sources:**

- [Lite roadmap](https://github.com/con/orinoco-lite-dev/blob/main/docs/lightweight-architecture-roadmap.md)
- [Engineering overview](https://github.com/con/orinoco-lite-dev#architecture)
- [Capability map](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-capability-map.md)

## Slide 6 — Lite changes where curation happens—not what a Thing means

**Eyebrow:** Same model · different transport

| Concern | Upstream ORINOCO | ORINOCO Lite |
| --- | --- | --- |
| Submission | Incoming area / user inbox | Proposal branch + pull request |
| Curated state | Dump Things curated area | Reviewed default branch |
| Human review | Curation UI and service APIs | GitHub review + curation interface |
| Semantics | Things records and qualified assertions | The same pinned Things contract |
| Machine provenance | Inline PAV annotations | PAV companions joined before validation |
| Presentation | Query and export from a pool | Deterministic static projection |

**Terminology note:** “Source adapter,” “proposal branch,” and “annotation
overlay” are Lite implementation terms; importer, enricher, inbox, curated
area, and PAV remain the upstream semantic anchors.

**Sources:**

- [Upstream inbox / curated model](https://dump-things-service.readthedocs.io/en/latest/introduction.html)
- [Lite vocabulary](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#scope-and-vocabulary)
- [Alignment table](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#upstream-alignment-and-deviations)

## Slide 7 — A simpler deployment must not quietly become a different data model

**Eyebrow:** Preserve semantic fidelity · Challenge 01

**Statement:** Lite is not a new schema.

**How we preserve fidelity:**

- **Pin the source Things schema.** Exact `dlthings:*` type designators remain
  the contract.
- **Validate the complete graph.** Records, relationships, and qualified
  assertions cross the same schema/RDF boundary.
- **Match upstream serialization.** Deterministic YAML ordering prevents
  formatting churn from masquerading as curation.
- **Test replacement seams.** Local projection or compatibility code carries
  executable parity evidence.

**Sources:**

- [Pinned schema contract](https://github.com/con/orinoco-lite-dev/blob/main/docs/explaining-schema-issues.md)
- [Canonical ordering](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#canonical-ordering)
- [Alignment policy](https://github.com/con/orinoco-lite-dev/blob/main/docs/lightweight-architecture-roadmap.md#upstream-alignment-policy)
- [Things source pin](https://github.com/leej3/things-schemas/tree/cb6c791aec4c5309775437df4bd58e94e1bfcc3c)

## Slide 8 — Easier extraction increases the need for explicit provenance and human judgment

**Eyebrow:** Capture evidence without inventing facts · Challenge 02

**Flow:**

> **Read-only source**<br />
> Zotero · Git · APIs
>
> → **Importer / enricher**<br />
> candidate assertion
>
> → **Human review**<br />
> accept · reject · defer · edit
>
> → **Curated Thing**<br />
> assertion + PAV

**Provenance and review rules:**

- `pav:importedBy` identifies the versioned machine agent.
- `pav:importedFrom` identifies the source record.
- Machines do not silently overwrite human knowledge.
- Unresolved identities, venues, topics, and eligibility remain visible review
  queues.

**Sources:**

- [Upstream machine annotations](https://hub.psychoinformatics.de/orinoco/things-enrichment-tools/raw/branch/main/docs/machine_annotations.md)
- [Lite enrichment pin](https://github.com/leej3/things-enrichment-tools/tree/2e6a5ddc92928a6165b81fdae24a52c447967c7d)
- [Lite PAV storage](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#semantic-annotation-overlay)
- [Preserved review queues](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-3-acceptance.md#publication-migration-result)

## Slide 9 — Hide engineering complexity without hiding authority, versions, or failure

**Eyebrow:** Make it sustainable for a small lab · Challenge 03

| Property | Meaning for the operating profile |
| --- | --- |
| Reproducibility | Engine, runtime, schema, renderer, and workflow are pinned to immutable coordinates. |
| Determinism | Projection and static builds regenerate from source and must repeat byte-for-byte. |
| Maintenance | Framework updates stop at a reviewable pull request and preserve site-owned content. |
| Availability | Normal validation, editing, preview, and Pages hosting need no persistent service. |
| Recovery | Git history and exact release coordinates supply rollback; automation never self-merges. |

**Sources:**

- [Distribution contract](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-4.md)
- [Accepted evidence](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-4-acceptance.md)
- [Versioned template](https://github.com/con/orinoco-lite-template)
- [Engine interface](https://github.com/con/orinoco-lite-dev/blob/main/packages/orinoco-lite/README.md)

## Slide 10 — A normal site maintainer sees one repository, not the component graph

**Eyebrow:** A complex engineering stack · a simple downstream

| Layer | Repository or operating surface | Contents / direction |
| --- | --- | --- |
| Engineering + release | [con/orinoco-lite-dev](https://github.com/con/orinoco-lite-dev) | Pinned upstream sources · engine/runtime · reusable CI · compatibility evidence |
| Distribution | [con/orinoco-lite-template](https://github.com/con/orinoco-lite-template) | Copier source · ownership rules · updater · generated GitHub template |
| Lab-owned downstream | [one ordinary Git repository](https://github.com/con/test-orinoco-downstream-website) | Things · editorial content · assets · policy · source-specific importers/enrichers |

The arrows are release/update direction—not repository nesting.

**Sources:**

- [Repository map](https://github.com/con/orinoco-lite-dev#repository-map)
- [Ownership model](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-4.md#repository-and-ownership-model)
- [Carried capabilities](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-capability-map.md)

## Slide 11 — We have a complete working knowledge graph—and an honest curation backlog

**Eyebrow:** The current CON corpus

**Current counts:**

| Count | Meaning |
| ---: | --- |
| 199 | Things in the input tree |
| 186 | Site + editor records |
| 185 | Rendered pages |
| 467 | Native graph edges |

**Record breakdown:**

- 33 people
- 24 projects
- 126 publications
- 1 instrument
- 1 organization
- 1 topic
- 13 reference records

**Intentionally unresolved—not silently invented:** 6 DOI duplicate groups ·
1,817 creator observations / 1,221 names · 42 venue observations · 49 topic
observations / 36 tags.

**Terminology note:** The older 186 canonical + 13 reference vocabulary
describes the same accepted content that the current contract treats as one
199-Thing input tree.

**Sources:**

- [Full-fidelity counts](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-4-acceptance.md#full-fidelity-parity)
- [Zotero migration evidence](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-3-acceptance.md#publication-migration-result)
- [Current 199-record terminology](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-capability-map.md#carried-into-the-supported-product)

## Slide 12 — Humans and machines can propose knowledge; neither bypasses curation

**Eyebrow:** Sustainable creation

### Human path

**Navigate and edit with SHACL Vue**

1. Open a validated Thing and schema-generated form.
2. Correct or add facts and relationships.
3. Submit a review bundle into the GitHub workflow.

[Open the static editor](https://con.github.io/test-orinoco-downstream-website/edit/)

### Machine path

**Importers and enrichers propose a diff**

1. Read an identified source without writing back.
2. Transform only declared, metadata-affecting facts.
3. Open a proposal with source and assertion provenance.

Example source: Zotero · `dump-research-info`

**Terminology note:** **Source adapter** is Lite's umbrella term. Prefer the
upstream role—**importer**, **enricher**, or **scraper**—when it is known.

**Sources:**

- [Upstream SHACL Vue](https://www.psychoinformatics.de/instruments/shacl-vue/)
- [Adapter vocabulary](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#scope-and-vocabulary)
- [Proposal contract](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#core-adapter-contract)
- [CON importer source](https://github.com/con/dump-research-info)

## Slide 13 — Different proposal paths converge on a visible diff and a human merge

**Eyebrow:** One GitHub-centered curation loop

**Meeting target:** The PR-based curation path should be available for the
meeting.

### Human correction

> SHACL Vue → review bundle → PR edit

### Source update

> Importer / enricher → draft proposal PR → accept · reject · defer

### Common gate

> Schema + relationship + provenance validation

### Human authority

> CON review + merge commit

### Curated state

> Default branch rebuilds the site

**Rule:** Missing, unchecked, failed, or closed is never a curation decision.

**Status note:** As of 24 August 2026, adapter-PR curation is implemented on
draft branches; direct SHACL Vue bundle-to-PR submission is a separate profile to
verify before the meeting.

**Sources:**

- [Human finalization](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#human-modification-and-finalization)
- [GitHub profile](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#github-profile)
- [Hosted curation interface](https://orinoco-curation-review.pages.dev/)
- [Engineering PR #16](https://github.com/con/orinoco-lite-dev/pull/16)

## Slide 14 — Follow one Thing from page to graph to edit—and back through review

**Eyebrow:** Live walkthrough

This slide is a live demo rather than a static explanation.

1. **Browse.** Open a person, project, and publication; follow their
   relationships.
2. **Explore.** Use graph navigation to see how independently curated records
   connect.
3. **Edit.** Open the schema-generated SHACL Vue form and prepare a review
   bundle.
4. **Curate.** Inspect the accompanying PR/curation view and the validation
   boundary.

**Demo links:**

- [Downstream site](https://con.github.io/test-orinoco-downstream-website/)
- [Static editor](https://con.github.io/test-orinoco-downstream-website/edit/)
- [Source repository](https://github.com/con/test-orinoco-downstream-website)
- [Curation interface](https://orinoco-curation-review.pages.dev/)

**Example records:**

- [Person example](https://con.github.io/test-orinoco-downstream-website/persons/yaroslav-halchenko/)
- [Project example](https://con.github.io/test-orinoco-downstream-website/projects/datalad/)
- [Publication example](https://con.github.io/test-orinoco-downstream-website/publications/datalad-joss-2021/)

**Evidence:** [Accepted consumer scenarios](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-4-acceptance.md#ordinary-consumer-scenarios)

## Slide 15 — You have merge authority; judgment—not form entry—is the important work

**Eyebrow:** The team is the curation layer

**Callout:** You are being voluntold as curators.

**Curator checklist:**

1. **Verify facts.** Does the assertion match an authoritative or clearly
   identified source?
2. **Resolve identity.** Is this the same person, project, publication, or a
   distinct Thing?
3. **Check relationships.** Do roles, attributions, generations, and links
   mean what we claim?
4. **Respect provenance.** Can we distinguish human knowledge from
   machine-imported assertions?
5. **Merge deliberately.** Read the diff and checks; edit, accept, reject, or
   defer explicitly.

**Governance note:** Working-corpus merge access does not itself settle
production-site ownership or publication policy.

**Sources:**

- [Human decision queue](https://github.com/con/orinoco-lite-dev/blob/main/docs/human-review-decisions.md)
- [Accept / reject / defer](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#decisions-and-cache)
- [Authority boundaries](https://github.com/con/orinoco-lite-dev/blob/main/docs/source-adapters.md#authorities-and-state)

## Slide 16 — The static site is accepted; the sustainable curation loop is the active frontier

**Eyebrow:** What remains · 24 August 2026

| Status | Workstream | Current meaning |
| --- | --- | --- |
| Accepted | Distribution | Engine/runtime, template, ordinary downstream, static site + editor |
| In review | Source adapters | Zotero + dump-research-info, PAV join, accept/reject/defer, hosted UI |
| Next gate | Operational proof | Merge releases, approve app permission, green hosted checks, first real proposal |
| Follow-up | Human edit submission | Complete and verify the SHACL Vue review-bundle-to-PR profile |
| Broaden | Beyond the website | Canonical RDF/N-Triples export before designing a generic projection API |
| Graduate | Production | Decide cutover, governance, identity, rights, accessibility, hosting, and rollback |

**Sources:**

- [Milestone 5 plan](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-5.md)
- [Acceptance record](https://github.com/con/orinoco-lite-dev/blob/main/docs/milestone-5-acceptance.md)
- [Engineering PR #16](https://github.com/con/orinoco-lite-dev/pull/16)
- [Consumer PR #28](https://github.com/con/test-orinoco-downstream-website/pull/28)
- [Longer roadmap](https://github.com/con/orinoco-lite-dev/blob/main/docs/lightweight-architecture-roadmap.md#delivery-plan)

## Slide 17 — Same upstream model. GitHub-native curation. Shared responsibility.

**Eyebrow:** Take home

**Title:**

> Same upstream model.<br />
> GitHub-native curation.<br />
> *Shared responsibility.*

**Closing action:** Start with one record: follow its links, verify one claim,
and leave the knowledge graph better than you found it.

**Links:**

- [Understand upstream](https://concepts.datalad.org/usage-considerations/)
- [Explore CON metadata](https://con.github.io/test-orinoco-downstream-website/)
- [Curate a Thing](https://con.github.io/test-orinoco-downstream-website/edit/)
- [Follow development](https://github.com/con/orinoco-lite-dev)

**Acknowledgments:** With thanks to Michael Hanke, Stephan Heunis, the
Psychoinformatics / ORINOCO contributors, and the CON team.

**Additional source:** [Upstream ORINOCO sources](https://hub.psychoinformatics.de/orinoco/)
