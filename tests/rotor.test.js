const Rotor = require('../lib/rotor');
const { ALPHABET } = require('../lib/alphabet');

const REVERSED_ALPHABET = [...ALPHABET].reverse().join('');

describe('Rotor', () => {
  it('can be instantiated with a mapping and a start character', () => {
    expect(new Rotor(ALPHABET, 'C')).toBeTruthy();
  });
  describe('mapping to a reversed alphabet and starting at A', () => {
    let rotor;
    beforeEach(() => {
      rotor = new Rotor(REVERSED_ALPHABET, 'A');
    });
    it('maps A to Z', () => {
      expect(rotor.scramble('A')).toBe('Z');
    });
    it('maps Z to A', () => {
      expect(rotor.scramble('Z')).toBe('A');
    });
    describe('after one tick', () => {
      beforeEach(() => {
        rotor.tick();
      });
      it('maps A to Y', () => {
        expect(rotor.scramble('A')).toBe('Y');
      });
      it('maps Z to Z', () => {
        expect(rotor.scramble('Z')).toBe('Z');
      });
    });
  });
  describe('mapping to DCBAEFGHIJKLMNOPQRSTUVWXYZ starting at E', () => {
    let rotor;
    beforeEach(() => {
      rotor = new Rotor('DCBAEFGHIJKLMNOPQRSTUVWXYZ', 'E');
    });
    it('maps A to E', () => {
      expect(rotor.scramble('A')).toBe('E');
    });
    it('maps Z to A', () => {
      expect(rotor.scramble('Z')).toBe('A');
    });
    it('maps W to D', () => {
      expect(rotor.scramble('W')).toBe('D');
    })
    it('maps E to A when reversed', () => {
      expect(rotor.scramble('E', true)).toBe('A');
    });

    describe('after two ticks', () => {
      beforeEach(() => {
        rotor.tick();
        rotor.tick();
      });
      it('maps A to E', () => {
        expect(rotor.scramble('A')).toBe('G');
      });
      it('maps Z to A', () => {
        expect(rotor.scramble('Z')).toBe('F');
      });
      it('maps W to D', () => {
        expect(rotor.scramble('W')).toBe('B');
      })
    })
  });
});
