import assert from 'node:assert/strict';
import test from 'node:test';
import { getGallerySelection } from '../src/gallery-state.js';
import { renderGallery } from '../src/gallery-view.js';

test('gallery markup exposes one selected format and template', () => {
  const selection = getGallerySelection('4r', '4r-3');
  const markup = renderGallery(selection);

  assert.match(markup, /data-format="4r"[^>]*aria-pressed="true"/);
  assert.match(markup, /data-template-id="4r-3"[^>]*aria-pressed="true"/);
  assert.match(markup, /Tiga Cerita/);
});

test('gallery markup exposes all supported format controls once', () => {
  const markup = renderGallery(getGallerySelection('2r', '2r-1'));

  assert.equal((markup.match(/data-format="/g) ?? []).length, 5);
  assert.match(markup, /data-format="2r"/);
  assert.match(markup, /data-format="4r"/);
  assert.match(markup, /data-format="polaroid"/);
  assert.match(markup, /data-format="6x2"/);
  assert.match(markup, /data-format="6x4"/);
});

test('2R preview uses the supplied Kedip strip artwork instead of generated frames', () => {
  const markup = renderGallery(getGallerySelection('2r', '2r-1'));

  assert.match(markup, /<img class="strip-art" src="\/assets\/strips\/2r\/klasik\.svg"/);
  assert.doesNotMatch(markup, /Foto 1/);
});

test('print previews preserve the reference layout orientation', () => {
  const landscapeFourR = renderGallery(getGallerySelection('4r', '4r-1'));
  const portraitFourR = renderGallery(getGallerySelection('4r', '4r-7'));
  const landscapePolaroid = renderGallery(getGallerySelection('polaroid', 'polaroid-7'));

  assert.match(landscapeFourR, /data-orientation="landscape"/);
  assert.match(portraitFourR, /data-orientation="portrait"/);
  assert.match(landscapePolaroid, /data-orientation="landscape"/);
});

test('new strip layouts expose accessible selected previews with their intended frame counts', () => {
  const layouts = [
    ['6x2', '6x2-a', '6×2', 'Layout A', 6],
    ['6x2', '6x2-b', '6×2', 'Layout B', 6],
    ['6x2', '6x2-c', '6×2', 'Layout C', 6],
    ['6x2', '6x2-d', '6×2', 'Layout D', 6],
    ['6x2', '6x2-e', '6×2', 'Layout E', 6],
    ['6x2', '6x2-f', '6×2', 'Layout F', 6],
    ['6x2', '6x2-g', '6×2', 'Layout G', 6],
    ['6x2', '6x2-h', '6×2', 'Layout H', 2],
    ['6x4', '6x4-i', '6×4', 'Layout I', 1],
    ['6x4', '6x4-j', '6×4', 'Layout J', 4],
    ['6x4', '6x4-k', '6×4', 'Layout K', 3],
    ['6x4', '6x4-l', '6×4', 'Layout L', 3],
    ['6x4', '6x4-m', '6×4', 'Layout M', 2],
    ['6x4', '6x4-n', '6×4', 'Layout N', 4],
    ['6x4', '6x4-o', '6×4', 'Layout O', 2],
  ];

  for (const [format, id, label, name, frameCount] of layouts) {
    const markup = renderGallery(getGallerySelection(format, id));

    assert.match(markup, new RegExp(`data-format="${format}"[^>]*aria-pressed="true"`));
    assert.match(markup, new RegExp(`data-template-id="${id}"[^>]*aria-pressed="true"`));
    assert.match(markup, new RegExp(`aria-label="Pratinjau ${label} ${name}, ${frameCount} foto placeholder"`));
    assert.equal((markup.match(/class="photo-frame"/g) ?? []).length, frameCount);
  }
});
