const Enigma = require('../lib/enigmaEngine');

describe('Enigma Engine', () => {
  it('can decode an Y to Z', () => {
    const engine = new Enigma();
    expect(engine.encode('Y')).toBe('Z');
  });
});
