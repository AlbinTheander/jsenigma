const { ALPHABET } = require('./alphabet');

class Keyboard {

  type(ch) {
    if (!ALPHABET.includes(ch))
      throw Error('You are trying to press a key that does not exist!');
    this.rotor.tick();
    this.nextPart.receive(ch);
  }

  setNext(next) {
    this.nextPart = next;
  }

  setFirstRotor(rotor) {
    this.rotor = rotor;
  }
}

module.exports = Keyboard;
