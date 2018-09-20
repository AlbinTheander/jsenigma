const { ALPHABET } = require('../lib/alphabet');
const { encode } = require('../lib/encode');

describe('encode', () => {
  const from = ALPHABET;
  const to = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
  describe('when mapping alphabet to EKMFLGDQVZNTOWYHXUSPAIBRCJ with offset 0', () => {
    it('encodes A as E', () => {
      expect(encode(from, to, 0, 'A')).toBe('E');
    });
    it('encodes D as F', () => {
      expect(encode(from, to, 0, 'D')).toBe('F');
    });
    it('encodes X as R', () => {
      expect(encode(from, to, 0, 'X')).toBe('R');
    });
  })
  describe('when mapping alphabet to EKMFLGDQVZNTOWYHXUSPAIBRCJ with offset 2', () => {
    it('encodes A as K', () => {
      expect(encode(from, to, 2, 'A')).toBe('K');
    });
    it('encodes C as J', () => {
      expect(encode(from, to, 2, 'C')).toBe('J');
    });
    it('encodes X as H', () => {
      expect(encode(from, to, 2, 'X')).toBe('H');
    });
  })
});
