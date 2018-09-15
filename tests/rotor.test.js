const Rotor = require("../lib/rotor");
const { ALPHABET } = require("../lib/alphabet");

const REVERSED_ALPHABET = [...ALPHABET].reverse().join("");

describe("Rotor", () => {
  it("can be instantiated with a mapping and a start character", () => {
    expect(new Rotor(ALPHABET, "C")).toBeTruthy();
  });
  describe("#scramble", () => {
    describe("when mapping to a reversed alphabet and starting at A", () => {
      let rotor;
      beforeEach(() => {
        rotor = new Rotor(REVERSED_ALPHABET, "A");
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
        it("scrambles A to Y", () => {
          expect(rotor.scramble("A")).toBe("Y");
        });
        it("scrambles Z to Z", () => {
          expect(rotor.scramble("Z")).toBe("Z");
        });
      });
    });
    describe("when mapping to DCBAEFGHIJKLMNOPQRSTUVWXYZ starting at E", () => {
      let rotor;
      beforeEach(() => {
        rotor = new Rotor("DCBAEFGHIJKLMNOPQRSTUVWXYZ", "E");
      });
      it("scrambles A to E", () => {
        expect(rotor.scramble("A")).toBe("E");
      });
      it("scrambles Z to A", () => {
        expect(rotor.scramble("Z")).toBe("A");
      });
      it("scrambles W to D", () => {
        expect(rotor.scramble("W")).toBe("D");
      });
      it("scrambles E to A when reversed", () => {
        expect(rotor.scramble("E", true)).toBe("A");
      });

      describe("after two ticks", () => {
        beforeEach(() => {
          rotor.tick();
          rotor.tick();
        });
        it("scrambles A to E", () => {
          expect(rotor.scramble("A")).toBe("G");
        });
        it("scrambles Z to A", () => {
          expect(rotor.scramble("Z")).toBe("F");
        });
        it("scrambles W to D", () => {
          expect(rotor.scramble("W")).toBe("B");
        });
      });
    });
  });
  describe('#receive', () => {
    describe("when mapping to a reversed alphabet and starting at A", () => {
      const rotor = new Rotor(REVERSED_ALPHABET, "A");
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
});
