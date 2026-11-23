import assert from 'node:assert/strict';
import test from 'node:test';
import { isAtLeast13 } from '../src/auth-validation.js';

const today = new Date(2026, 10, 23, 12);

test('age validation accepts a user on their thirteenth birthday', () => {
  assert.equal(isAtLeast13('2013-11-23', today), true);
});

test('age validation rejects a user one day before the minimum age', () => {
  assert.equal(isAtLeast13('2013-11-24', today), false);
});

test('age validation rejects future and malformed birth dates', () => {
  assert.equal(isAtLeast13('2027-01-01', today), false);
  assert.equal(isAtLeast13('2013-02-31', today), false);
  assert.equal(isAtLeast13('', today), false);
});
