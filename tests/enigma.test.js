const Enigma = require('../lib/enigma');

describe('Enigma Engine', () => {
  it.skip('can decode an Y to Z', () => {
    const engine = new Enigma('B BETA III IV I AXLE (HQ) (EX) (IP) (TR) (BY)');
    expect(engine.encode('Y')).toBe('Z');
  });
  it('can decode some text', () => {
    const text =
`FROM his shoulder Hiawatha
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
In the Second Book of Euclid`
    const expected =
`QVPQS OKOIL PUBKJ ZPISF XDWBH
CNSCX NUOAA TZXSR CFYDG UFLPN
XGXIX TYJUJ RCAUG EUNCF MKUFW
JFGKC IIRGX ODJGV CGPQO HALWE
BUHTZ MOXII VXUEF PRPRK CGVPF
PYKIK ITLBU RVGTS FUSMB NKFRI
IMPDO FJVTT UGRZM UVCYL FDZPG
IBXRE WXUEB ZQJOY MHIPG RREGO
HETUX DTWLC MMWAV NVJVH OUFAN
TQACK KTOZZ RDABQ NNVPO IEFQA
FSVVI CVUDU EREYN PFFMN BJVGQ`;

  const engine = new Enigma('B BETA III IV I AXLE (HQ) (EX) (IP) (TR) (BY)');
  expect(engine.encode(text)).toBe(expected);
  });
});
