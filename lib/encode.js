const { ALPHABET } = require('./alphabet');

function encode(from, to, offset, ch) {
  const chCode = ALPHABET.indexOf(ch);
  if (chCode === -1) return ch;
  const offsetChCode = (chCode + offset + ALPHABET.length) % ALPHABET.length;
  const offsetCh = ALPHABET[offsetChCode];

  const mappedCh = to[from.indexOf(offsetCh)];

  const mappedChCode = ALPHABET.indexOf(mappedCh);
  const offsetMappedChCode = (mappedChCode - offset + ALPHABET.length) % ALPHABET.length;

  return ALPHABET[offsetMappedChCode];
}

module.exports = {
  encode,
};
