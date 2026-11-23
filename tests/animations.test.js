import assert from 'node:assert/strict';
import test from 'node:test';
import { applyScrollReveals } from '../src/animations.js';

test('reduced motion skips reveal lookup and animation', () => {
  let queried = false;
  let animated = false;
  const root = {
    querySelectorAll() {
      queried = true;
      return [];
    },
  };

  const count = applyScrollReveals(root, true, () => {
    animated = true;
  });

  assert.equal(count, 0);
  assert.equal(queried, false);
  assert.equal(animated, false);
});

test('normal motion animates each reveal target once', () => {
  const targets = [{ id: 'story' }, { id: 'formats' }];
  const root = {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-reveal]');
      return targets;
    },
  };
  const animated = [];

  const count = applyScrollReveals(root, false, (target) => {
    animated.push(target);
  });

  assert.equal(count, 2);
  assert.deepEqual(animated, targets);
});
