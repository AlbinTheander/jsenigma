const { encode } = require('../lib/encode');

describe('encode', () => {
  describe('when mapping ABCD to EFGH with offset 0', () => {
    it('encodes A as E', () => {
      expect(encode('ABCD', 'EFGH', 0, 'A')).toBe('E');
    });
    it('encodes D as H', () => {
      expect(encode('ABCD', 'EFGH', 0, 'D')).toBe('H');
    });
    it('encodes X as X', () => {
      expect(encode('ABCD', 'EFGH', 0, 'X')).toBe('X');
    });
  })
  describe('when mapping ABC to EFG with offset 2', () => {
    it('encodes A as G', () => {
      expect(encode('ABC', 'EFG', 2, 'A')).toBe('G');
    });
    it('encodes C as F', () => {
      expect(encode('ABC', 'EFG', 2, 'C')).toBe('F');
    });
    it('encodes X as X', () => {
      expect(encode('ABC', 'EFG', 2, 'X')).toBe('X');
    });
  })
});
