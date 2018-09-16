const { ALPHABET } = require('./alphabet');

class Keyboard {

  type(ch) {
    if (!ALPHABET.includes(ch))
      throw Error('You are trying to press a key that does not exist!');
    this.nextPart.receive(ch);
  }

  setNext(next) {
    this.nextPart = next;
  }
}

module.exports = Keyboard;
