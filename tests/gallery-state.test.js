import assert from 'node:assert/strict';
import test from 'node:test';
import { getGallerySelection } from '../src/gallery-state.js';

test('gallery preserves a selected template in its current format', () => {
  const selection = getGallerySelection('2r', '2r-3');

  assert.equal(selection.selectedTemplate.id, '2r-3');
  assert.equal(selection.templates.length, 8);
});

test('gallery selects the first template when switching formats', () => {
  const selection = getGallerySelection('4r', '2r-3');

  assert.equal(selection.format, '4r');
  assert.equal(selection.selectedTemplate.id, '4r-1');
});

test('gallery rejects unsupported formats', () => {
  assert.throws(() => getGallerySelection('unsupported', null), RangeError);
});

test('gallery selects new strip formats and falls back when switching formats', () => {
  const sixByTwo = getGallerySelection('6x2', null);
  const sixByFour = getGallerySelection('6x4', sixByTwo.selectedTemplate.id);
  const fourR = getGallerySelection('4r', sixByFour.selectedTemplate.id);

  assert.equal(sixByTwo.templates.length, 8);
  assert.equal(sixByTwo.selectedTemplate.id, '6x2-a');
  assert.equal(sixByFour.templates.length, 7);
  assert.equal(sixByFour.selectedTemplate.id, '6x4-i');
  assert.equal(fourR.selectedTemplate.id, '4r-1');
});
