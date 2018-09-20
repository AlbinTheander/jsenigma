const { ALPHABET } = require('./alphabet');
const { encode } = require('./encode');

class Reflector {
  constructor(mapping) {
    this.mapping = mapping;
    this.reverseMapping = [...mapping].reverse().join('');
  }

  setNext(next) {
    this.nextPart = next;
  }

  receive(ch) {
    const encodedCh = this.scramble(ch);
    this.nextPart.receive(encodedCh, true);
  }

  scramble(ch) {
    return encode(ALPHABET, this.mapping, 0, ch);
  }
}

module.exports = Reflector;
