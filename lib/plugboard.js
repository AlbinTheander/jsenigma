
class PlugBoard {
  constructor() {
    this.mappings = {};
  }

  map(ch1, ch2) {
    this.mappings[ch1] = ch2;
    this.mappings[ch2] = ch1;
    return this;
  }

  setNext(next) {
    this.nextPart = next;
    return this;
  }

  setPrevious(prev) {
    this.previousPart = prev;
    return this;
  }

  receive(ch, reversed) {
    const scrambledCh = this.scramble(ch);
    const receiver = reversed ? this.previousPart : this.nextPart;
    receiver.receive(scrambledCh);
  }

  scramble(ch) {
    if (ch in this.mappings) return this.mappings[ch];
    return ch;
  }
}

module.exports = PlugBoard;
