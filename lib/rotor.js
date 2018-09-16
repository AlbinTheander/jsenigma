const { ALPHABET } = require("./alphabet");
const { encode } = require("./encode");

class Rotor {
  constructor(mapping, startCharacter, tickers = "") {
    if (!ALPHABET.includes(startCharacter))
      throw Error("Illegal start character", startCharacter);
    this.mapping = mapping;
    this.offset = ALPHABET.indexOf(startCharacter);
    this.tickers = tickers;
  }

  setNext(part) {
    this.nextPart = part;
  }

  setPrevious(part) {
    this.previousPart = part;
  }

  receive(ch, reversed) {
    const scrambledChar = this.scramble(ch, reversed);
    const receiver = reversed ? this.previousPart : this.nextPart;
    receiver.receive(scrambledChar, reversed);
  }

  scramble(ch, reversed) {
    if (reversed) {
      return encode(this.mapping, ALPHABET, -this.offset, ch);
    }
    return encode(ALPHABET, this.mapping, this.offset, ch);
  }

  tick() {
    this.offset = (this.offset + 1) % ALPHABET.length;
    const current = ALPHABET[this.offset];
    if (this.tickers.includes(current) && this.nextPart.tick)
      this.nextPart.tick();
  }
}

module.exports = Rotor;
