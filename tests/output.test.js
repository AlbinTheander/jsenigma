const Output = require('../lib/output');

describe('Output', () => {
  let output;
  beforeEach(() => {
    output = new Output();
  })
  it('will return two characters that are sent in', () => {
    output.receive('A');
    output.receive('B');
    expect(output.text).toBe('AB');
  });
  it('will chunk lines up in groups of 5', () => {
    [...'ABCDEFG'].forEach(ch => output.receive(ch));
    expect(output.text).toBe('ABCDE FG');
  });
  it('will break lines after 25 characters (excluding chunk spaces)', () => {
    const msg = 'ABCDE'.repeat(8) + 'XYZ';
    [...msg].forEach(ch => output.receive(ch));
    expect(output.text).toBe(
      'ABCDE ABCDE ABCDE ABCDE ABCDE\nABCDE ABCDE ABCDE XYZ'
    );
  });
});
