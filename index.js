const Enigma = require('./lib/enigma');

const text = `FROM his shoulder Hiawatha
Took the camera of rosewood
Made of sliding folding rosewood
Neatly put it all together
In its case it lay compactly
Folded into nearly nothing
But he opened out the hinges
Pushed and pulled the joints
and hinges
Till it looked all squares
and oblongs
Like a complicated figure
In the Second Book of Euclid`;

const machine = new Enigma('B BETA III IV I AXLE (HQ) (EX) (IP) (TR) (BY)');

const code = machine.encode(text);
console.log('OUT:');
console.log(code);

const machine2 = new Enigma('B BETA III IV I AXLE (HQ) (EX) (IP) (TR) (BY)');

console.log('\nAnd back:');
console.log(machine2.encode(code));
