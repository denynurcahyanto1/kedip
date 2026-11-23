import assert from 'node:assert/strict';
import test from 'node:test';
import { TEMPLATE_CATALOG, getTemplatesByFormat } from '../src/templates.js';

test('catalog preserves the supplied 2R template names and includes the requested formats', () => {
  assert.deepEqual(
    getTemplatesByFormat('2r').map((template) => template.name),
    ['Klasik', 'Coral Pop', 'Malam Kedip', 'Hati Mungil', 'Gingham', 'Neo Brutal', 'Langit Senja', 'Film'],
  );
  assert.equal(getTemplatesByFormat('4r').length, 8);
  assert.equal(getTemplatesByFormat('polaroid').length, 7);
  assert.deepEqual(
    getTemplatesByFormat('6x2').map((template) => template.name),
    ['Layout A', 'Layout B', 'Layout C', 'Layout D', 'Layout E', 'Layout F', 'Layout G', 'Layout H'],
  );
  assert.deepEqual(
    getTemplatesByFormat('6x4').map((template) => template.name),
    ['Layout I', 'Layout J', 'Layout K', 'Layout L', 'Layout M', 'Layout N', 'Layout O'],
  );
});

test('every template has a unique id and usable display metadata', () => {
  const ids = TEMPLATE_CATALOG.map((template) => template.id);

  assert.equal(new Set(ids).size, ids.length);
  for (const template of TEMPLATE_CATALOG) {
    assert.ok(template.name.trim());
    assert.ok(template.style.trim());
    assert.ok(template.photoCount > 0);
  }
});
