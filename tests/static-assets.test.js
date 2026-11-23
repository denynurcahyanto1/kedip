import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pages = ['index.html', 'auth.html'];

test('all pages declare the Kedip SVG favicon and preload local fonts', async () => {
  for (const page of pages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');

    assert.match(html, /rel="icon"[^>]*href="\/assets\/kedip-mark\.svg"/, `${page} should declare the brand icon`);
    assert.match(html, /rel="preload"[^>]*href="\/fonts\/fredoka-latin\.woff2"[^>]*as="font"[^>]*crossorigin/, `${page} should preload the local display font`);
    assert.doesNotMatch(html, /fonts\.googleapis\.com/, `${page} should not load a blocking external font stylesheet`);
  }
});

test('robots.txt is a valid plain-text crawler policy', async () => {
  const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8');

  assert.match(robots, /^User-agent:\s*\*\s*$/m);
  assert.match(robots, /^Allow:\s*\/\s*$/m);
  assert.doesNotMatch(robots, /^\s*<!doctype html>/i);
});

test('self-hosted Latin font files are present for production use', async () => {
  for (const font of ['fredoka-latin.woff2', 'nunito-latin.woff2']) {
    const contents = await readFile(new URL(`../public/fonts/${font}`, import.meta.url));
    assert.ok(contents.byteLength > 0, `${font} should not be empty`);
    assert.equal(contents.toString('ascii', 0, 4), 'wOF2', `${font} should be a WOFF2 file`);
  }

  for (const license of ['OFL-Fredoka.txt', 'OFL-Nunito.txt']) {
    const contents = await readFile(new URL(`../public/fonts/${license}`, import.meta.url), 'utf8');
    assert.match(contents, /SIL OPEN FONT LICENSE Version 1\.1/);
  }
});

test('local font faces use swap and the downloaded font assets', async () => {
  const styles = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(styles, /@font-face\s*{[^}]*font-family:\s*"Fredoka"[^}]*font-display:\s*swap;[^}]*url\("\/fonts\/fredoka-latin\.woff2"\)/);
  assert.match(styles, /@font-face\s*{[^}]*font-family:\s*"Nunito"[^}]*font-display:\s*swap;[^}]*url\("\/fonts\/nunito-latin\.woff2"\)/);
});
