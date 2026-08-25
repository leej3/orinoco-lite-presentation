import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('exports the complete ORINOCO Lite presentation', async () => {
  const html = await readFile(new URL('out/index.html', root), 'utf8');

  assert.match(html, /<title>ORINOCO Lite — A shared research-information system for CON<\/title>/i);
  assert.match(html, /Every lab task reconstructs facts the lab already knows/);
  assert.match(html, /three interoperability layers/i);
  assert.match(html, /Only the small relationship description is inline/);
  assert.match(html, /Literal fact = predicate \+ value/);
  assert.match(html, /ORINOCO is an interoperating ecosystem/);
  assert.match(html, /You are being voluntold as curators/);
  assert.match(html, /Same upstream model/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);

  for (const id of [
    'opening',
    'problem',
    'upstream-model',
    'things-identity',
    'things-types',
    'things-attributes',
    'things-relationships',
    'things-semantics',
    'upstream-components',
    'why-lite',
    'transport',
    'challenge-semantics',
    'challenge-provenance',
    'challenge-operation',
    'architecture',
    'metadata',
    'creation',
    'curation',
    'demo',
    'curators',
    'roadmap',
    'closing',
  ]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
});

test('ships self-contained presentation assets and source links', async () => {
  await Promise.all([
    access(new URL('out/og.png', root)),
    access(new URL('out/con-letterhead.svg', root)),
    access(new URL('out/ukraine-ribbon.svg', root)),
    access(new URL('out/favicon.svg', root)),
  ]);

  const presentation = await readFile(new URL('app/Presentation.tsx', root), 'utf8');
  assert.match(presentation, /concepts\.datalad\.org\/usage-considerations/);
  assert.match(presentation, /hub\.psychoinformatics\.de\/orinoco/);
  assert.match(presentation, /github\.com\/con\/orinoco-lite-dev/);
  assert.match(presentation, /con\.github\.io\/test-orinoco-downstream-website/);
  assert.doesNotMatch(presentation, /token|password|secret/i);
});
