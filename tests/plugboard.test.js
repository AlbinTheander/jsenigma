const PlugBoard = require('../lib/plugboard');

describe('Plugboard', () => {
  describe('#scramble', () => {
    describe('with the mappings AE and FY', () => {
      const plugboard = new PlugBoard();
      plugboard.map('A', 'E').map('F', 'Y');
      it('scrambles A to E', () => {
        expect(plugboard.scramble('A')).toBe('E');
      });
      it('scrambles E to A', () => {
        expect(plugboard.scramble('E')).toBe('A');
      });
      it('scrambles F to Y', () => {
        expect(plugboard.scramble('F')).toBe('Y');
      });
      it('scrambles X to X', () => {
        expect(plugboard.scramble('X')).toBe('X');
      });
      it('does the same scramblings in reverse', () => {
        expect(plugboard.scramble('A', true)).toBe('E');
        expect(plugboard.scramble('E', true)).toBe('A');
        expect(plugboard.scramble('F', true)).toBe('Y');
        expect(plugboard.scramble('X', true)).toBe('X');
      });
    });
  });
});
