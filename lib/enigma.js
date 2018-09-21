const Keyboard = require('./keyboard');
const Output = require('./output');
const PlugBoard = require('./plugboard');
const Rotor = require('./rotor');
const Reflector = require('./reflector');

class Enigma {
  constructor(config) {
    const [ref, r1, r2, r3, r4, rconf, ...plugging] = config.split(' ');
    const reflector = Reflectors.lean[ref]();
    const rotor1 = Rotors[r1](rconf[0]);
    const rotor2 = Rotors[r2](rconf[1]);
    const rotor3 = Rotors[r3](rconf[2]);
    const rotor4 = Rotors[r4](rconf[3]);
    const plugboard = new PlugBoard()
    plugging.forEach(plug => plugboard.map(plug[1], plug[2]));
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
const Rotors  = {
  I: (startChar) => new Rotor('I', 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', startChar, 'R'),
  II: (startChar) => new Rotor('II', 'AJDKSIRUXBLHWTMCQGZNPYFVOE', startChar, 'F'),
  III: (startChar) => new Rotor('III', 'BDFHJLCPRTXVZNYEIWGAKMUSQO', startChar, 'W'),
  IV: (startChar) => new Rotor('IV', 'ESOVPZJAYQUIRHXLNFTGKDCMWB', startChar, 'K'),
  V: (startChar) => new Rotor('V', 'VZBRGITYUPSDNHLXAWMJQOFECK', startChar, 'A'),
  VI: (startChar) => new Rotor('VI', 'JPGVOUMFYQBENHZRDKASXLICTW', startChar, 'AN'),
  VII: (startChar) => new Rotor('VII', 'NZJHGRCXMYSWBOUFAIVLPEKQDT', startChar, 'AN'),
  VIII: (startChar) => new Rotor('VIII', 'FKQHTLXOCBJSPDZRAMEWNIUYGV', startChar, 'AN'),

  BETA: (startChar) => new Rotor('Beta', 'LEYJVCNIXWPBQMDRTAKZGFUHOS', startChar),
  GAMMA: (startChar) => new Rotor('Gamma', 'FSOKANUERHMBTIYCWLQPZXVGJD', startChar),
};
const Reflectors = {
  thick: {
    B: () => new Reflector('YRUHQSLDPXNGOKMIEBFZCWVJAT'),
    C: () => new Reflector('FVPJIAOYEDRZXWGCTKUQSBWXHL'),
  },
  lean: {
    B: () => new Reflector('ENKQAUYWJICOPBLMDXZVFTHRGS'),
  }
};

module.exports = Enigma;
