'use client';

/* eslint-disable @next/next/no-img-element -- static SVG marks stay unoptimized on GitHub Pages */

import { useCallback, useEffect, useState, type ReactNode } from 'react';

const URLS = {
  upstreamProject: 'https://www.psychoinformatics.de/projects/orinoco/',
  upstreamHub: 'https://hub.psychoinformatics.de/orinoco/',
  concepts: 'https://concepts.datalad.org/',
  usage: 'https://concepts.datalad.org/usage-considerations/',
  thingsV1: 'https://concepts.datalad.org/s/things/v1/',
  thingsAbout: 'https://concepts.datalad.org/s/things/v1/about/',
  thingClass: 'https://concepts.datalad.org/s/things/v1/Thing/',
  pidSlot: 'https://concepts.datalad.org/s/things/v1/pid/',
  schemaTypeSlot: 'https://concepts.datalad.org/s/things/v1/schema_type/',
  attributeClass: 'https://concepts.datalad.org/s/things/v1/AttributeSpecification/',
  attributesSlot: 'https://concepts.datalad.org/s/things/v1/attributes/',
  statementClass: 'https://concepts.datalad.org/s/things/v1/Statement/',
  characterizedBySlot: 'https://concepts.datalad.org/s/things/v1/characterized_by/',
  mappingsSlot: 'https://concepts.datalad.org/s/things/v1/mappings/',
  thingsContext: 'https://concepts.datalad.org/s/things/v1.context.jsonld',
  thingsShacl: 'https://concepts.datalad.org/s/things/v1.shacl.ttl',
  thingsOwl: 'https://concepts.datalad.org/s/things/v1.owl.ttl',
  schemaAbout: 'https://concepts.datalad.org/about/',
  dumpThingsDocs: 'https://dump-things-service.readthedocs.io/en/latest/introduction.html',
  shaclVue: 'https://www.psychoinformatics.de/instruments/shacl-vue/',
  lite: 'https://github.com/con/orinoco-lite-dev',
  template: 'https://github.com/con/orinoco-lite-template',
  consumer: 'https://github.com/con/test-orinoco-downstream-website',
  site: 'https://con.github.io/test-orinoco-downstream-website/',
  editor: 'https://con.github.io/test-orinoco-downstream-website/edit/',
  reviewApp: 'https://orinoco-curation-review.pages.dev/',
  engineeringPr: 'https://github.com/con/orinoco-lite-dev/pull/16',
  consumerPr: 'https://github.com/con/test-orinoco-downstream-website/pull/28',
};

const SUBMODULE_PINS = {
  'dump-things-service':
    'https://github.com/leej3/dump-things-service/tree/9f101d97c7f15d491f602db5a9c33ad9a19ad8bf',
  'query-things':
    'https://github.com/leej3/query-things/tree/ef1141430a471455d4a5f4e07d7989ec717f56f4',
  'things-enrichment-tools':
    'https://github.com/leej3/things-enrichment-tools/tree/2e6a5ddc92928a6165b81fdae24a52c447967c7d',
  'things-schemas':
    'https://github.com/leej3/things-schemas/tree/cb6c791aec4c5309775437df4bd58e94e1bfcc3c',
  'www-from-model':
    'https://github.com/leej3/www-from-model/tree/6c8b9a5b7260dc20dfe1453dd863b353e8f90f06',
} as const;

const doc = (path: string) => `${URLS.lite}/blob/main/${path}`;
const pin = (name: keyof typeof SUBMODULE_PINS) => SUBMODULE_PINS[name];
const upstreamRepo = (name: string) => `https://hub.psychoinformatics.de/orinoco/${name}`;

type SourceLink = { href: string; label: string };

const slides = [
  { id: 'opening', label: 'Opening' },
  { id: 'problem', label: 'The recurring problem' },
  { id: 'upstream-model', label: 'Three interoperability layers' },
  { id: 'things-identity', label: 'Identified Things' },
  { id: 'things-types', label: 'Typed records' },
  { id: 'things-attributes', label: 'Literal facts' },
  { id: 'things-relationships', label: 'Relationships' },
  { id: 'things-semantics', label: 'Semantic alignment' },
  { id: 'upstream-components', label: 'Upstream components' },
  { id: 'why-lite', label: 'Why Lite' },
  { id: 'transport', label: 'Same model, different transport' },
  { id: 'challenge-semantics', label: 'Challenge: semantics' },
  { id: 'challenge-provenance', label: 'Challenge: provenance' },
  { id: 'challenge-operation', label: 'Challenge: operation' },
  { id: 'architecture', label: 'Distribution architecture' },
  { id: 'metadata', label: 'Metadata today' },
  { id: 'creation', label: 'Sustainable creation' },
  { id: 'curation', label: 'Curation loop' },
  { id: 'demo', label: 'Live demo' },
  { id: 'curators', label: 'The team curates' },
  { id: 'roadmap', label: 'Remaining work' },
  { id: 'closing', label: 'Take home' },
];

function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={`external-link ${className}`} href={href} target="_blank" rel="noreferrer">
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function SourceStrip({ links, note }: { links: SourceLink[]; note?: string }) {
  return (
    <footer className="source-strip">
      <span className="source-label">Sources</span>
      <div>
        {links.map((link) => (
          <ExternalLink key={`${link.href}-${link.label}`} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
      </div>
      {note ? <p>{note}</p> : null}
    </footer>
  );
}

function SlideNumber({ value }: { value: number }) {
  return <span className="slide-number">{String(value).padStart(2, '0')}</span>;
}

function SlideHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <header className="slide-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
    </header>
  );
}

export function Presentation() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const next = Math.min(Math.max(index, 0), slides.length - 1);
    const slide = slides[next];
    document.getElementById(slide.id)?.scrollIntoView({ behavior, block: 'start' });
    window.history.replaceState(null, '', `#${slide.id}`);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const initial = slides.findIndex((slide) => slide.id === hash);
    if (initial >= 0) goTo(initial, 'auto');

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slides.findIndex((slide) => slide.id === visible.target.id);
        if (index >= 0) {
          setActiveIndex(index);
          window.history.replaceState(null, '', `#${slides[index].id}`);
        }
      },
      { threshold: [0.45, 0.7] },
    );

    slides.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, summary')) return;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex + 1);
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
      if (event.key === 'Home') goTo(0);
      if (event.key === 'End') goTo(slides.length - 1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, goTo]);

  return (
    <main>
      <nav className="deck-nav" aria-label="Presentation navigation">
        <button className="wordmark" type="button" onClick={() => goTo(0)}>
          CON <span>/ ORINOCO Lite</span>
        </button>
        <div className="nav-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={index === activeIndex ? 'nav-dot active' : 'nav-dot'}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.label}`}
              aria-current={index === activeIndex ? 'page' : undefined}
              title={slide.label}
            />
          ))}
        </div>
        <span className="nav-count">
          {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </nav>

      <section className="slide hero-slide" id="opening">
        <div className="hero-copy">
          <a className="con-lockup" href="https://centerforopenneuroscience.org/" target="_blank" rel="noreferrer">
            <img src="./con-letterhead.svg" alt="Center for Open Neuroscience, Dartmouth College" />
          </a>
          <p className="eyebrow">Center for Open Neuroscience · team briefing</p>
          <h1>
            ORINOCO Lite
            <br />
            <em>what CON knows</em>
          </h1>
          <p className="hero-subtitle">
            Upstream Things semantics, GitHub-centered curation, and a shared research-information
            foundation for the lab.
          </p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => goTo(1)}>
              Begin <span aria-hidden="true">↓</span>
            </button>
            <ExternalLink href={URLS.upstreamProject}>Upstream ORINOCO</ExternalLink>
            <ExternalLink href={URLS.lite}>Lite engineering</ExternalLink>
          </div>
          <p className="presenter">John Lee · CON team · 2026</p>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span>O</span>
          <b>linked</b>
          <i>curated</i>
          <strong>reusable</strong>
        </div>
        <SlideNumber value={1} />
      </section>

      <section className="slide problem-slide" id="problem">
        <SlideHeading eyebrow="The recurring problem">
          Every lab task reconstructs facts the lab already knows.
        </SlideHeading>
        <div className="problem-layout">
          <p className="large-copy">
            People, projects, publications, datasets, instruments, grants, roles, and relationships
            are scattered across systems—and copied again for every output.
          </p>
          <div className="application-list" aria-label="Repeated application outputs">
            {['Website', 'Grant', 'CV', 'Annual report', 'Discovery', 'AI-assisted workflow'].map(
              (item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ),
            )}
          </div>
        </div>
        <blockquote>
          A website is a useful first view. The durable asset is the curated, structured knowledge
          beneath it.
        </blockquote>
        <SourceStrip
          links={[
            {
              href: 'https://github.com/con/talks/blob/e321a1da0c34a12c6411fea26c7718a58e4fedb6/2026-usrse/orinoco-lite-poster-draft.md',
              label: 'CON US-RSE draft',
            },
            { href: 'https://barcelona-declaration.org/', label: 'Open research information' },
          ]}
        />
        <SlideNumber value={2} />
      </section>

      <section className="slide upstream-slide" id="upstream-model">
        <SlideHeading eyebrow="Upstream ORINOCO · three interoperability layers">
          ORINOCO connects focused applications, a constrained knowledge graph, and semantic technologies.
        </SlideHeading>
        <div className="interoperability-stack" aria-label="Three interoperability layers">
          <div>
            <span>01 · Transform</span>
            <strong>Application-specific models</strong>
            <p>Reduced records and interfaces optimized for one task: submission, editing, reporting, or presentation.</p>
          </div>
          <b aria-hidden="true">⇅</b>
          <div className="knowledge-layer">
            <span>02 · Integrate</span>
            <strong>Curated Things knowledge graph</strong>
            <p>Arbitrarily detailed descriptions assembled from a deliberately limited family of record structures.</p>
          </div>
          <b aria-hidden="true">⇅</b>
          <div>
            <span>03 · Interpret and project</span>
            <strong>Semantic ecosystem</strong>
            <p>RDF, JSON-LD, SHACL, OWL, shared identifiers, vocabularies, ontologies, and graph tooling.</p>
          </div>
        </div>
        <p className="schema-thesis">
          ORINOCO is worth using because applications keep useful local shapes while the curated
          middle layer supplies shared identity, validation, relationships, and semantic reach.
        </p>
        <SourceStrip
          links={[
            { href: URLS.usage, label: 'System proposal + diagram' },
            { href: URLS.thingsAbout, label: 'Things design principles' },
            { href: URLS.thingsV1, label: 'Things v1 schema' },
            { href: URLS.schemaAbout, label: 'Schema composition' },
            { href: doc('docs/explaining-schema-issues.md#what-the-schema-pin-means'), label: 'What the schema pin means' },
          ]}
          note="ORINOCO Lite uses a fixed, tested schema-and-runtime tuple. New upstream behavior enters only through a deliberate compatibility update."
        />
        <SlideNumber value={3} />
      </section>

      <section className="slide schema-detail-slide" id="things-identity">
        <SlideHeading eyebrow="The Things record algebra · identity">
          Identified Things can be described once and referenced everywhere.
        </SlideHeading>
        <div className="schema-detail-layout">
          <div className="schema-example">
            <span>One independently referenceable record</span>
            <pre><code>{`pid: https://orcid.org/0000-0002-1825-0097`}</code></pre>
          </div>
          <div className="schema-explanation">
            <p><strong>A Thing represents something with an identity.</strong> Its required <code>pid</code> is a URI or CURIE that other records can use as a stable reference.</p>
            <p><strong>Identity keeps descriptions independent.</strong> A person, publication, project, or instrument can be updated without copying its complete record into every related record.</p>
            <blockquote>Linking replaces repeated nesting.</blockquote>
          </div>
        </div>
        <SourceStrip links={[
          { href: URLS.thingClass, label: 'Thing class' },
          { href: URLS.pidSlot, label: 'pid slot' },
          { href: `${URLS.thingsAbout}#every-thing-must-have-an-identifier`, label: 'Identifier principle' },
          { href: `${URLS.thingsAbout}#linking-not-nesting`, label: 'Linking, not nesting' },
        ]} />
        <SlideNumber value={4} />
      </section>

      <section className="slide schema-detail-slide" id="things-types">
        <SlideHeading eyebrow="The Things record algebra · interpretation">
          Typed records select precise validation without closing the generic model.
        </SlideHeading>
        <div className="schema-detail-layout">
          <div className="schema-example">
            <span>Identity plus a schema class designator</span>
            <pre><code>{`pid: ex:paper-1\nschema_type: xyzri:XYZPublication`}</code></pre>
          </div>
          <div className="schema-explanation">
            <p><strong><code>schema_type</code> says which specialized schema class governs this record.</strong> A validator can apply publication-specific fields and constraints even when the surrounding collection accepts generic Things.</p>
            <p><strong>The foundation stays small; derived schemas add domain precision.</strong> ORINOCO can integrate many kinds of Things without pretending that every kind has the same detailed model.</p>
            <blockquote>Generic integration does not require generic validation.</blockquote>
          </div>
        </div>
        <SourceStrip links={[
          { href: URLS.schemaTypeSlot, label: 'schema_type slot' },
          { href: `${URLS.thingsAbout}#type-designator-slot`, label: 'Type designator principle' },
          { href: URLS.schemaAbout, label: 'Schema composition' },
          { href: pin('things-schemas'), label: 'Lite schema pin' },
        ]} />
        <SlideNumber value={5} />
      </section>

      <section className="slide schema-detail-slide" id="things-attributes">
        <SlideHeading eyebrow="The Things record algebra · literal facts">
          Attributes attach values and local characteristics without inventing new identities.
        </SlideHeading>
        <div className="schema-detail-layout">
          <div className="schema-example">
            <span>A predicate, literal value, and optional datatype</span>
            <pre><code>{`pid: ex:paper-1\nattributes:\n  - predicate: schema:datePublished\n    value: "2026-08-25"\n    range: xsd:date`}</code></pre>
          </div>
          <div className="schema-explanation">
            <p><strong>An <code>AttributeSpecification</code> attaches a literal or locally described characteristic to a Thing.</strong> The attribute exists inside this description and does not need its own <code>pid</code>.</p>
            <p><strong>The predicate states what the value means.</strong> An optional <code>range</code> states its datatype; nested attributes can further qualify the local characteristic.</p>
            <blockquote>Literal fact = predicate + value, optionally typed and qualified.</blockquote>
          </div>
        </div>
        <SourceStrip links={[
          { href: URLS.attributesSlot, label: 'attributes slot' },
          { href: URLS.attributeClass, label: 'AttributeSpecification' },
          { href: `${URLS.thingsV1}value/`, label: 'value slot' },
          { href: `${URLS.thingsV1}range/`, label: 'range slot' },
        ]} />
        <SlideNumber value={6} />
      </section>

      <section className="slide schema-detail-slide" id="things-relationships">
        <SlideHeading eyebrow="The Things record algebra · relationships">
          Statements qualify links between independently identified Things.
        </SlideHeading>
        <div className="schema-detail-layout">
          <div className="schema-example">
            <span>The subject is the containing Thing</span>
            <pre><code>{`pid: ex:paper-1\ncharacterized_by:\n  - predicate: schema:author\n    object: ex:person-1`}</code></pre>
            <div className="triple-reading"><code>ex:paper-1</code><b>schema:author</b><code>ex:person-1</code></div>
          </div>
          <div className="schema-explanation">
            <p><strong>The inline <code>Statement</code> records the predicate and object.</strong> Its subject is the Thing that contains the statement.</p>
            <p><strong>Only the small relationship description is inline.</strong> The author record is not nested; <code>object</code> references that Thing by its identifier.</p>
            <blockquote>Relationship = identified subject + predicate + identified object.</blockquote>
          </div>
        </div>
        <SourceStrip links={[
          { href: URLS.characterizedBySlot, label: 'characterized_by slot' },
          { href: URLS.statementClass, label: 'Statement class' },
          { href: `${URLS.thingsAbout}#qualified-relationships`, label: 'Qualified relationships' },
          { href: `${URLS.thingsV1}predicate/`, label: 'predicate slot' },
          { href: `${URLS.thingsV1}object/`, label: 'object slot' },
        ]} />
        <SlideNumber value={7} />
      </section>

      <section className="slide schema-detail-slide" id="things-semantics">
        <SlideHeading eyebrow="The Things record algebra · semantic reach">
          Identifiers, predicates, types, and mappings connect records to shared meaning.
        </SlideHeading>
        <div className="semantic-interface">
          <div><span>Identity</span><code>https://doi.org/…</code><p>Which Thing is meant?</p></div>
          <div><span>Relationship</span><code>schema:author</code><p>What does this link mean?</p></div>
          <div><span>Validation</span><code>xyzri:XYZPublication</code><p>Which record contract applies?</p></div>
          <div><span>Alignment</span><code>bibo:AcademicArticle</code><p>Which external concept corresponds?</p></div>
        </div>
        <p className="schema-thesis">
          The record containers are the programming interface. Identifiers, type designators,
          predicates, datatypes, and mappings carry the semantic commitments.
        </p>
        <SourceStrip links={[
          { href: URLS.mappingsSlot, label: 'mappings slots' },
          { href: `${URLS.thingsV1}exact_mappings/`, label: 'exact mappings' },
          { href: URLS.thingsContext, label: 'JSON-LD context' },
          { href: URLS.thingsShacl, label: 'SHACL representation' },
          { href: URLS.thingsOwl, label: 'OWL representation' },
        ]} />
        <SlideNumber value={8} />
      </section>

      <section className="slide components-slide" id="upstream-components">
        <SlideHeading eyebrow="Upstream ORINOCO · components">
          ORINOCO is an interoperating ecosystem, not one application.
        </SlideHeading>
        <div className="component-spine">
          {[
            ['Model', 'Things Schemas', 'LinkML definitions, identifiers, validation shapes', upstreamRepo('things-schemas')],
            ['View', 'SHACL Vue', 'schema-generated browser navigation and forms', upstreamRepo('shacl-vue')],
            ['Store', 'Dump Things Service', 'collections, inboxes, curated area, validation, audit', upstreamRepo('dump-things-service')],
            ['Acquire', 'Enrichment tools', 'importers and enrichers with assertion provenance', upstreamRepo('things-enrichment-tools')],
            ['Query', 'query-things', 'selection and serialization for downstream uses', upstreamRepo('query-things')],
            ['Present', 'FLOW / www-from-model', 'linked reports and complete websites', upstreamRepo('flow')],
            ['Explore', 'things-graph-renderer', 'graph navigation over the knowledge pool', upstreamRepo('things-graph-renderer')],
          ].map(([role, name, detail, href], index) => (
            <a key={name} className="component-row" href={href} target="_blank" rel="noreferrer">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <em>{role}</em>
              <strong>{name}</strong>
              <p>{detail}</p>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <SourceStrip
          links={[
            { href: URLS.upstreamHub, label: 'All ORINOCO repositories' },
            { href: URLS.dumpThingsDocs, label: 'Dump Things introduction' },
            { href: URLS.shaclVue, label: 'SHACL Vue' },
            { href: pin('dump-things-service'), label: 'Lite DTS pin' },
            { href: pin('query-things'), label: 'Lite query pin' },
            { href: pin('www-from-model'), label: 'Lite website pin' },
          ]}
        />
        <SlideNumber value={9} />
      </section>

      <section className="slide why-slide" id="why-lite">
        <SlideHeading eyebrow="Why a Lite operating profile?">
          CON already has a collaboration and review system: GitHub.
        </SlideHeading>
        <div className="why-layout">
          <p className="why-thesis">
            Keep the upstream semantic model. Change the curation transport to fit a lab that
            already reviews durable work in Git.
          </p>
          <ol className="why-list">
            <li>
              <span>01</span>
              <div><strong>One ordinary repository</strong><p>Human-readable YAML, editorial content, assets, and policy travel together.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><strong>Pull requests are the inbox</strong><p>Familiar diffs, comments, authorship, checks, and merge history.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><strong>Static work stays static</strong><p>Validate, build, edit, preview, and deploy without a continuously running metadata service.</p></div>
            </li>
            <li>
              <span>04</span>
              <div><strong>Upstream remains the center</strong><p>Pin, reuse, parity-test, contribute fixes upstream, and retire local seams when possible.</p></div>
            </li>
          </ol>
        </div>
        <SourceStrip
          links={[
            { href: doc('docs/lightweight-architecture-roadmap.md'), label: 'Lite roadmap' },
            { href: `${URLS.lite}#architecture`, label: 'Engineering overview' },
            { href: doc('docs/milestone-capability-map.md'), label: 'Capability map' },
          ]}
        />
        <SlideNumber value={10} />
      </section>

      <section className="slide translation-slide" id="transport">
        <SlideHeading eyebrow="Same model · different transport">
          Lite changes where curation happens—not what a Thing means.
        </SlideHeading>
        <div className="comparison" role="table" aria-label="Upstream and Lite operating comparison">
          <div className="comparison-head" role="row">
            <span role="columnheader">Concern</span>
            <strong role="columnheader">Upstream ORINOCO</strong>
            <strong role="columnheader">Orinoco Lite</strong>
          </div>
          {[
            ['Submission', 'incoming area / user inbox', 'proposal branch + pull request'],
            ['Curated state', 'Dump Things curated area', 'reviewed default branch'],
            ['Human review', 'curation UI and service APIs', 'GitHub review + curation interface'],
            ['Semantics', 'Things records and qualified assertions', 'the same pinned Things contract'],
            ['Machine provenance', 'inline PAV annotations', 'PAV companions joined before validation'],
            ['Presentation', 'query and export from a pool', 'deterministic static projection'],
          ].map(([concern, upstream, lite]) => (
            <div className="comparison-row" role="row" key={concern}>
              <span role="cell">{concern}</span>
              <p role="cell">{upstream}</p>
              <p role="cell">{lite}</p>
            </div>
          ))}
        </div>
        <SourceStrip
          links={[
            { href: URLS.dumpThingsDocs, label: 'Upstream inbox / curated model' },
            { href: doc('docs/source-adapters.md#scope-and-vocabulary'), label: 'Lite vocabulary' },
            { href: doc('docs/source-adapters.md#upstream-alignment-and-deviations'), label: 'Alignment table' },
          ]}
          note="“Source adapter,” “proposal branch,” and “annotation overlay” are Lite implementation terms; importer, enricher, inbox, curated area, and PAV remain the upstream semantic anchors."
        />
        <SlideNumber value={11} />
      </section>

      <section className="slide challenge-slide" id="challenge-semantics">
        <div className="challenge-index">Challenge 01</div>
        <SlideHeading eyebrow="Preserve semantic fidelity">
          A simpler deployment must not quietly become a different data model.
        </SlideHeading>
        <div className="challenge-layout">
          <p className="challenge-statement">Lite is not a new schema.</p>
          <div className="challenge-evidence">
            <p><strong>Pin the source Things schema.</strong> Exact <code>dlthings:*</code> type designators remain the contract.</p>
            <p><strong>Validate the complete graph.</strong> Records, relationships, and qualified assertions cross the same schema/RDF boundary.</p>
            <p><strong>Match upstream serialization.</strong> Deterministic YAML ordering prevents formatting churn from masquerading as curation.</p>
            <p><strong>Test replacement seams.</strong> Local projection or compatibility code carries executable parity evidence.</p>
          </div>
        </div>
        <SourceStrip
          links={[
            { href: doc('docs/explaining-schema-issues.md'), label: 'Pinned schema contract' },
            { href: doc('docs/source-adapters.md#canonical-ordering'), label: 'Canonical ordering' },
            { href: doc('docs/lightweight-architecture-roadmap.md#upstream-alignment-policy'), label: 'Alignment policy' },
            { href: pin('things-schemas'), label: 'Things source pin' },
          ]}
        />
        <SlideNumber value={12} />
      </section>

      <section className="slide challenge-slide provenance-slide" id="challenge-provenance">
        <div className="challenge-index">Challenge 02</div>
        <SlideHeading eyebrow="Capture evidence without inventing facts">
          Easier extraction increases the need for explicit provenance and human judgment.
        </SlideHeading>
        <div className="provenance-layout">
          <div className="provenance-chain" aria-label="Source to curated assertion flow">
            <div><span>Read-only source</span><strong>Zotero · Git · APIs</strong></div>
            <b aria-hidden="true">→</b>
            <div><span>Importer / enricher</span><strong>candidate assertion</strong></div>
            <b aria-hidden="true">→</b>
            <div><span>Human review</span><strong>accept · reject · defer · edit</strong></div>
            <b aria-hidden="true">→</b>
            <div><span>Curated Thing</span><strong>assertion + PAV</strong></div>
          </div>
          <div className="provenance-rules">
            <p><code>pav:importedBy</code> identifies the versioned machine agent.</p>
            <p><code>pav:importedFrom</code> identifies the source record.</p>
            <p>Machines do not silently overwrite human knowledge.</p>
            <p>Unresolved identities, venues, topics, and eligibility remain visible review queues.</p>
          </div>
        </div>
        <SourceStrip
          links={[
            {
              href: upstreamRepo(
                'things-enrichment-tools/raw/branch/main/docs/machine_annotations.md',
              ),
              label: 'Upstream machine annotations',
            },
            { href: pin('things-enrichment-tools'), label: 'Lite enrichment pin' },
            { href: doc('docs/source-adapters.md#semantic-annotation-overlay'), label: 'Lite PAV storage' },
            { href: doc('docs/milestone-3-acceptance.md#publication-migration-result'), label: 'Preserved review queues' },
          ]}
        />
        <SlideNumber value={13} />
      </section>

      <section className="slide challenge-slide operation-slide" id="challenge-operation">
        <div className="challenge-index">Challenge 03</div>
        <SlideHeading eyebrow="Make it sustainable for a small lab">
          Hide engineering complexity without hiding authority, versions, or failure.
        </SlideHeading>
        <div className="operation-ledger">
          {[
            ['Reproducibility', 'Engine, runtime, schema, renderer, and workflow are pinned to immutable coordinates.'],
            ['Determinism', 'Projection and static builds regenerate from source and must repeat byte-for-byte.'],
            ['Maintenance', 'Framework updates stop at a reviewable pull request and preserve site-owned content.'],
            ['Availability', 'Normal validation, editing, preview, and Pages hosting need no persistent service.'],
            ['Recovery', 'Git history and exact release coordinates supply rollback; automation never self-merges.'],
          ].map(([name, detail], index) => (
            <div key={name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{name}</strong>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <SourceStrip
          links={[
            { href: doc('docs/milestone-4.md'), label: 'Distribution contract' },
            { href: doc('docs/milestone-4-acceptance.md'), label: 'Accepted evidence' },
            { href: URLS.template, label: 'Versioned template' },
            { href: doc('packages/orinoco-lite/README.md'), label: 'Engine interface' },
          ]}
        />
        <SlideNumber value={14} />
      </section>

      <section className="slide architecture-slide" id="architecture">
        <SlideHeading eyebrow="A complex engineering stack · a simple downstream">
          A normal site maintainer sees one repository, not the component graph.
        </SlideHeading>
        <div className="architecture-layers" aria-label="Orinoco Lite repository layers">
          <a href={URLS.lite} target="_blank" rel="noreferrer">
            <span>Engineering + release</span>
            <strong>con/orinoco-lite-dev</strong>
            <p>Pinned upstream sources · engine/runtime · reusable CI · compatibility evidence</p>
            <b>↗</b>
          </a>
          <i aria-hidden="true">versioned release</i>
          <a href={URLS.template} target="_blank" rel="noreferrer">
            <span>Distribution</span>
            <strong>con/orinoco-lite-template</strong>
            <p>Copier source · ownership rules · updater · generated GitHub template</p>
            <b>↗</b>
          </a>
          <i aria-hidden="true">create / update PR</i>
          <a href={URLS.consumer} target="_blank" rel="noreferrer">
            <span>Lab-owned downstream</span>
            <strong>one ordinary Git repository</strong>
            <p>Things · editorial content · assets · policy · source-specific importers/enrichers</p>
            <b>↗</b>
          </a>
        </div>
        <p className="architecture-punchline">The arrows are release/update direction—not repository nesting.</p>
        <SourceStrip
          links={[
            { href: `${URLS.lite}#repository-map`, label: 'Repository map' },
            { href: doc('docs/milestone-4.md#repository-and-ownership-model'), label: 'Ownership model' },
            { href: doc('docs/milestone-capability-map.md'), label: 'Carried capabilities' },
          ]}
        />
        <SlideNumber value={15} />
      </section>

      <section className="slide metadata-slide" id="metadata">
        <SlideHeading eyebrow="The current CON corpus">
          We have a complete working knowledge graph—and an honest curation backlog.
        </SlideHeading>
        <div className="metadata-layout">
          <div className="metadata-stats">
            <div><strong>199</strong><span>Things in the input tree</span></div>
            <div><strong>186</strong><span>site + editor records</span></div>
            <div><strong>185</strong><span>rendered pages</span></div>
            <div><strong>467</strong><span>native graph edges</span></div>
          </div>
          <div className="record-breakdown">
            {[
              ['33', 'people'], ['24', 'projects'], ['126', 'publications'],
              ['1', 'instrument'], ['1', 'organization'], ['1', 'topic'], ['13', 'reference records'],
            ].map(([number, label]) => (
              <p key={label}><strong>{number}</strong><span>{label}</span></p>
            ))}
          </div>
        </div>
        <div className="review-queue">
          <span>Intentionally unresolved—not silently invented</span>
          <p>6 DOI duplicate groups · 1,817 creator observations / 1,221 names · 42 venue observations · 49 topic observations / 36 tags</p>
        </div>
        <SourceStrip
          links={[
            { href: doc('docs/milestone-4-acceptance.md#full-fidelity-parity'), label: 'Full-fidelity counts' },
            { href: doc('docs/milestone-3-acceptance.md#publication-migration-result'), label: 'Zotero migration evidence' },
            { href: doc('docs/milestone-capability-map.md#carried-into-the-supported-product'), label: 'Current 199-record terminology' },
          ]}
          note="The older 186 canonical + 13 reference vocabulary describes the same accepted content that the current contract treats as one 199-Thing input tree."
        />
        <SlideNumber value={16} />
      </section>

      <section className="slide creation-slide" id="creation">
        <SlideHeading eyebrow="Sustainable creation">
          Humans and machines can propose knowledge; neither bypasses curation.
        </SlideHeading>
        <div className="creation-paths">
          <div className="creation-path human-path">
            <span>Human path</span>
            <h3>Navigate and edit with SHACL Vue</h3>
            <ol>
              <li>Open a validated Thing and schema-generated form</li>
              <li>Correct or add facts and relationships</li>
              <li>Submit a review bundle into the GitHub workflow</li>
            </ol>
            <ExternalLink href={URLS.editor}>Open the static editor</ExternalLink>
          </div>
          <div className="creation-divider" aria-hidden="true">+</div>
          <div className="creation-path machine-path">
            <span>Machine path</span>
            <h3>Importers and enrichers propose a diff</h3>
            <ol>
              <li>Read an identified source without writing back</li>
              <li>Transform only declared, metadata-affecting facts</li>
              <li>Open a proposal with source and assertion provenance</li>
            </ol>
            <p className="mini-code">Zotero · dump-research-info</p>
          </div>
        </div>
        <p className="creation-note">
          <strong>Source adapter</strong> is Lite&apos;s umbrella term. Prefer the upstream role—
          <strong>importer</strong>, <strong>enricher</strong>, or <strong>scraper</strong>—when it is known.
        </p>
        <SourceStrip
          links={[
            { href: URLS.shaclVue, label: 'Upstream SHACL Vue' },
            { href: doc('docs/source-adapters.md#scope-and-vocabulary'), label: 'Adapter vocabulary' },
            { href: doc('docs/source-adapters.md#core-adapter-contract'), label: 'Proposal contract' },
            { href: 'https://github.com/con/dump-research-info', label: 'CON importer source' },
          ]}
        />
        <SlideNumber value={17} />
      </section>

      <section className="slide curation-slide" id="curation">
        <div className="meeting-target">Meeting target</div>
        <SlideHeading eyebrow="One GitHub-centered curation loop">
          Different proposal paths converge on a visible diff and a human merge.
        </SlideHeading>
        <div className="curation-lanes" aria-label="Human and machine curation paths">
          <div>
            <span>Human correction</span>
            <strong>SHACL Vue</strong>
            <b aria-hidden="true">→</b>
            <strong>review bundle</strong>
            <b aria-hidden="true">→</b>
            <strong>PR edit</strong>
          </div>
          <div>
            <span>Source update</span>
            <strong>importer / enricher</strong>
            <b aria-hidden="true">→</b>
            <strong>draft proposal PR</strong>
            <b aria-hidden="true">→</b>
            <strong>accept · reject · defer</strong>
          </div>
        </div>
        <div className="curation-common">
          <b aria-hidden="true">↓</b>
          <div><span>Common gate</span><strong>schema + relationship + provenance validation</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>Human authority</span><strong>CON review + merge commit</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>Curated state</span><strong>default branch rebuilds the site</strong></div>
        </div>
        <p className="curation-rule">Missing, unchecked, failed, or closed is never a curation decision.</p>
        <SourceStrip
          links={[
            { href: doc('docs/source-adapters.md#human-modification-and-finalization'), label: 'Human finalization' },
            { href: doc('docs/source-adapters.md#github-profile'), label: 'GitHub profile' },
            { href: URLS.reviewApp, label: 'Hosted curation interface' },
            { href: URLS.engineeringPr, label: 'Engineering PR #16' },
          ]}
          note="As of 25 Aug 2026, the adapter and SHACL Vue paths are released and integrated. A real Zotero proposal is green; authenticated human disposition and finalization remain pending."
        />
        <SlideNumber value={18} />
      </section>

      <section className="slide demo-slide" id="demo">
        <div className="demo-kicker">Live walkthrough</div>
        <h2>Follow one Thing from page to graph to edit—and back through review.</h2>
        <div className="demo-steps">
          {[
            ['01', 'Browse', 'Open a person, project, and publication; follow their relationships.'],
            ['02', 'Explore', 'Use graph navigation to see how independently curated records connect.'],
            ['03', 'Edit', 'Open the schema-generated SHACL Vue form and prepare a review bundle.'],
            ['04', 'Curate', 'Inspect the accompanying PR/curation view and the validation boundary.'],
          ].map(([number, name, detail]) => (
            <div key={name}><span>{number}</span><strong>{name}</strong><p>{detail}</p></div>
          ))}
        </div>
        <div className="demo-actions">
          <ExternalLink href={URLS.site} className="prominent-link">Open the downstream site</ExternalLink>
          <ExternalLink href={URLS.editor}>Open the editor</ExternalLink>
          <ExternalLink href={URLS.consumer}>Open the source repository</ExternalLink>
          <ExternalLink href={URLS.reviewApp}>Open the curation interface</ExternalLink>
        </div>
        <SourceStrip
          links={[
            { href: `${URLS.site}persons/yaroslav-halchenko/`, label: 'Person example' },
            { href: `${URLS.site}projects/datalad/`, label: 'Project example' },
            { href: `${URLS.site}publications/datalad-joss-2021/`, label: 'Publication example' },
            { href: doc('docs/milestone-4-acceptance.md#ordinary-consumer-scenarios'), label: 'Accepted demo evidence' },
          ]}
        />
        <SlideNumber value={19} />
      </section>

      <section className="slide curators-slide" id="curators">
        <SlideHeading eyebrow="The team is the curation layer">
          You have merge authority. That makes judgment—not form entry—the important work.
        </SlideHeading>
        <div className="curator-layout">
          <p className="curator-callout">You are being voluntold as curators.</p>
          <div className="curator-checklist">
            {[
              ['Verify facts', 'Does the assertion match an authoritative or clearly identified source?'],
              ['Resolve identity', 'Is this the same person, project, publication, or a distinct Thing?'],
              ['Check relationships', 'Do roles, attributions, generations, and links mean what we claim?'],
              ['Respect provenance', 'Can we distinguish human knowledge from machine-imported assertions?'],
              ['Merge deliberately', 'Read the diff and checks; edit, accept, reject, or defer explicitly.'],
            ].map(([name, detail], index) => (
              <div key={name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><p>{detail}</p></div>
            ))}
          </div>
        </div>
        <p className="governance-note">Working-corpus merge access does not itself settle production-site ownership or publication policy.</p>
        <SourceStrip
          links={[
            { href: doc('docs/human-review-decisions.md'), label: 'Human decision queue' },
            { href: doc('docs/source-adapters.md#decisions-and-cache'), label: 'Accept / reject / defer' },
            { href: doc('docs/source-adapters.md#authorities-and-state'), label: 'Authority boundaries' },
          ]}
        />
        <SlideNumber value={20} />
      </section>

      <section className="slide roadmap-slide" id="roadmap">
        <SlideHeading eyebrow="What remains · 25 Aug 2026">
          Milestone 5 is implemented; live review and production governance are the active gates.
        </SlideHeading>
        <div className="roadmap-track">
          {[
            ['Accepted', 'Milestone 5 implementation', 'Released runtime, adapters, PAV join, hosted review, SHACL Vue handoff'],
            ['Integrated', 'Distribution', 'Engine v0.2.0rc3, template v0.2.0rc4, ordinary downstream, static site + editor'],
            ['Live gate', 'Authenticated review', 'Submit and finalize the green real Zotero proposal through the hosted interface'],
            ['Semantic gate', 'dump-research-info', 'Resolve the dangling source assertion explicitly; do not invent a mapping'],
            ['Broaden', 'Beyond the website', 'Canonical RDF/N-Triples export before designing a generic projection API'],
            ['Graduate', 'Production', 'Decide cutover, governance, identity, rights, accessibility, hosting, and rollback'],
          ].map(([status, name, detail], index) => (
            <div className={`roadmap-row roadmap-${index}`} key={name}>
              <span>{status}</span><b /><strong>{name}</strong><p>{detail}</p>
            </div>
          ))}
        </div>
        <SourceStrip
          links={[
            { href: doc('docs/milestone-5.md'), label: 'Milestone 5 plan' },
            { href: doc('docs/milestone-5-acceptance.md'), label: 'Acceptance record' },
            { href: URLS.engineeringPr, label: 'Engineering PR #16' },
            { href: URLS.consumerPr, label: 'Consumer PR #28' },
            { href: doc('docs/lightweight-architecture-roadmap.md#delivery-plan'), label: 'Longer roadmap' },
          ]}
        />
        <SlideNumber value={21} />
      </section>

      <section className="slide closing-slide" id="closing">
        <div className="closing-copy">
          <p className="eyebrow">Take home</p>
          <h2>Same upstream model.<br />GitHub-native curation.<br /><em>Shared responsibility.</em></h2>
          <p>
            Start with one record: follow its links, verify one claim, and leave the knowledge graph
            better than you found it.
          </p>
        </div>
        <div className="closing-links">
          <ExternalLink href={URLS.usage}>Understand upstream</ExternalLink>
          <ExternalLink href={URLS.site}>Explore CON metadata</ExternalLink>
          <ExternalLink href={URLS.editor}>Curate a Thing</ExternalLink>
          <ExternalLink href={URLS.lite}>Follow development</ExternalLink>
        </div>
        <footer className="acknowledgments">
          <p>
            With thanks to Michael Hanke, Stephan Heunis, the Psychoinformatics / ORINOCO
            contributors, and the CON team.
          </p>
          <div>
            <ExternalLink href={URLS.upstreamHub}>Upstream ORINOCO sources</ExternalLink>
            <a className="ribbon-link" href="https://standforukraine.com/" target="_blank" rel="noreferrer">
              <img src="./ukraine-ribbon.svg" alt="Stand with Ukraine" />
            </a>
          </div>
        </footer>
        <SlideNumber value={22} />
      </section>

      <div className="mobile-controls" aria-label="Slide controls">
        <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous slide">←</button>
        <span>{activeIndex + 1} / {slides.length}</span>
        <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === slides.length - 1} aria-label="Next slide">→</button>
      </div>
    </main>
  );
}
