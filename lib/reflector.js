const { ALPHABET } = require('./alphabet');
const { encode } = require('./encode');

class Reflector {
  constructor(mapping) {
    this.mapping = mapping;
  }

  setNext(next) {
    this.nextPart = next;
  }

  receieve(ch) {
    const encodedCh = this.scramble(ch);
    this.nextPart.receieve(ch, true);
  }

  scramble(ch) {
    return encode(ALPHABET, mapping);
  }
}
