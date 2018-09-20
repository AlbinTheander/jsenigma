const Rotor = require("../lib/rotor");
const { ALPHABET } = require("../lib/alphabet");

const REVERSED_ALPHABET = [...ALPHABET].reverse().join("");

describe("Rotor", () => {
  it("can be instantiated with a mapping and a start character", () => {
    expect(new Rotor('custom', ALPHABET, "C")).toBeTruthy();
  });
  describe("#scramble", () => {
    describe("when mapping to a reversed alphabet and starting at A", () => {
      let rotor;
      beforeEach(() => {
        rotor = new Rotor('custom', REVERSED_ALPHABET, "A");
      });
      it("scrambles A to Z", () => {
        expect(rotor.scramble("A")).toBe("Z");
      });
      it("scrambles Z to A", () => {
        expect(rotor.scramble("Z")).toBe("A");
      });
      describe("after one tick", () => {
        beforeEach(() => {
          rotor.tick();
        });
        it("scrambles A to X", () => {
          expect(rotor.scramble("A")).toBe("X");
        });
        it("scrambles Z to Y", () => {
          expect(rotor.scramble("Z")).toBe("Y");
        });
      });
    });
    describe("when mapping to DCBAEFGHIJKLMNOPQRSTUVWXYZ starting at E", () => {
      let rotor;
      beforeEach(() => {
        rotor = new Rotor('custom', "DCBAEFGHIJKLMNOPQRSTUVWXYZ", "E");
      });
      it("scrambles A to A", () => {
        expect(rotor.scramble("A")).toBe("A");
      });
      it("scrambles Z to W", () => {
        expect(rotor.scramble("Z")).toBe("W");
      });
      it("scrambles W to Z", () => {
        expect(rotor.scramble("W")).toBe("Z");
      });
      it("scrambles E to E when reversed", () => {
        expect(rotor.scramble("E", true)).toBe("E");
      });

      describe("after two ticks", () => {
        beforeEach(() => {
          rotor.tick();
          rotor.tick();
        });
        it("scrambles A to A", () => {
          expect(rotor.scramble("A")).toBe("A");
        });
        it("scrambles Z to Z", () => {
          expect(rotor.scramble("Z")).toBe("Z");
        });
        it("scrambles W to V", () => {
          expect(rotor.scramble("W")).toBe("V");
        });
      });
    });
  });
  describe('#receive', () => {
    describe("when mapping to a reversed alphabet and starting at A", () => {
      const rotor = new Rotor('custom', REVERSED_ALPHABET, "A");
      const next = { receive: jest.fn() };
      const prev = { receive: jest.fn() };
      rotor.setNext(next);
      rotor.setPrevious(prev);

      it('calls the next part with the scrambled character when going forward', () => {
        rotor.receive('A');
        expect(next.receive).toHaveBeenCalledWith('Z', undefined);
      });
      it('calls the previous part with the scrambled character when going backward', () => {
        rotor.receive('A', true);
        expect(prev.receive).toHaveBeenCalledWith('Z', true);
      });
    });
  });
  describe('#tick', () => {
    describe('when rotor is initiated with ticker and the next part can tick', () => {
      let rotor;
      let next;
      beforeEach(() => {
        rotor = new Rotor('custom', REVERSED_ALPHABET, 'C', 'E');
        next = { tick: jest.fn() };
        rotor.setNext(next);
      });
      afterEach(() => jest.resetAllMocks());
      describe('and the rotor is ticked to a character that not is a ticker', () => {
        beforeEach(() => rotor.tick());
        it('should not try to tick the next part', () => {
          expect(next.tick).not.toHaveBeenCalled();
        });
      });
      describe('and the rotor is ticked to a character that is a ticker', () => {
        beforeEach(() => {
          rotor.tick();
          rotor.tick();
        });
        it('should tick the next part', () => {
          expect(next.tick).toHaveBeenCalled();
        });
      });
    });
  })
});
