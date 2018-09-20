const Keyboard = require('./keyboard');
const Output = require('./output');
const PlugBoard = require('./plugboard');
const Rotor = require('./rotor');
const Reflector = require('./reflector');

class Enigma {
  constructor() {
    const reflector = reflectorTypeLeanB();
    const rotor1 = rotorTypeBeta('A');
    const rotor2 = rotorTypeIII('X');
    const rotor3 = rotorTypeIV('L');
    const rotor4 = rotorTypeI('E');
    const plugboard = new PlugBoard().map('H', 'Q').map('E', 'X').map('I', 'P').map('T', 'R').map('B', 'Y');
    // const plugboard = new PlugBoard().map('Y', 'F').map('Z', 'H');
    const keyboard = new Keyboard();
    const output = new Output();

    keyboard.setNext(plugboard);
    keyboard.setFirstRotor(rotor4);
    plugboard.setNext(rotor4);
    rotor4.setNext(rotor3);
    rotor3.setNext(rotor2);
    rotor2.setNext(rotor1);
    rotor1.setNext(reflector);
    reflector.setNext(rotor1);
    rotor1.setPrevious(rotor2);
    rotor2.setPrevious(rotor3);
    rotor3.setPrevious(rotor4);
    rotor4.setPrevious(plugboard);
    plugboard.setPrevious(output);

    this.keyboard = keyboard;
    this.output = output;
  }

  encode(s) {
    Array.from(s.toUpperCase()).filter(ch => ch >= 'A' && ch <= 'Z').forEach(ch => this.keyboard.type(ch));
    return this.output.text;
  }
}

const rotorTypeI = (startChar) => new Rotor('I', 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', startChar, 'R');
const rotorTypeII = (startChar) => new Rotor('II', 'AJDKSIRUXBLHWTMCQGZNPYFVOE', startChar, 'F');
const rotorTypeIII = (startChar) => new Rotor('III', 'BDFHJLCPRTXVZNYEIWGAKMUSQO', startChar, 'W');
const rotorTypeIV = (startChar) => new Rotor('IV', 'ESOVPZJAYQUIRHXLNFTGKDCMWB', startChar, 'K');
const rotorTypeV = (startChar) => new Rotor('V', 'VZBRGITYUPSDNHLXAWMJQOFECK', startChar, 'A');
const rotorTypeVI = (startChar) => new Rotor('VI', 'JPGVOUMFYQBENHZRDKASXLICTW', startChar, 'AN');
const rotorTypeVII = (startChar) => new Rotor('VII', 'NZJHGRCXMYSWBOUFAIVLPEKQDT', startChar, 'AN');
const rotorTypeVIII = (startChar) => new Rotor('VIII', 'FKQHTLXOCBJSPDZRAMEWNIUYGV', startChar, 'AN');

const rotorTypeBeta = (startChar) => new Rotor('Beta', 'LEYJVCNIXWPBQMDRTAKZGFUHOS', startChar);
const rotorTypeGamma = (startChar) => new Rotor('Gamma', 'FSOKANUERHMBTIYCWLQPZXVGJD', startChar);

const reflectorTypeB = () => new Reflector('YRUHQSLDPXNGOKMIEBFZCWVJAT');
const reflectorTypeC = () => new Reflector('FVPJIAOYEDRZXWGCTKUQSBWXHL');
const reflectorTypeLeanB = () => new Reflector('ENKQAUYWJICOPBLMDXZVFTHRGS');

const plugBoard = () => new PlugBoard();

const keyboard = () => new Keyboard();

const output = () => new Output();

module.exports = Enigma;
