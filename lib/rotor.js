const { ALPHABET } = require('./alphabet');
const { encode } = require('./encode');

class Rotor {
  constructor(mapping, startCharacter) {
    if (!ALPHABET.includes(startCharacter))
      throw Error ('Illegal start character', startCharacter);
    this.mapping = mapping;
    this.offset = ALPHABET.indexOf(startCharacter);
  }

  scramble(ch, reversed) {
    if (reversed) {
      return encode(this.mapping, ALPHABET, -this.offset, ch);
    }
    return encode(ALPHABET, this.mapping, this.offset, ch);
  }

  tick() {
    this.offset = (this.offset + 1) % ALPHABET.length;
  }
}

module.exports = Rotor;
