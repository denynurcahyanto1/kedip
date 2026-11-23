import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('the no-JavaScript gallery preview uses supplied Kedip 2R artwork', () => {
  assert.match(page, /class="static-art" src="\/assets\/strips\/2r\/klasik\.svg"/);
  assert.doesNotMatch(page, /class="static-frame"/);
});
