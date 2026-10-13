/**
 * Unit tests for the hexToRgb library function.
 *
 * These tests call the function directly, without Express or HTTP,
 * so they only verify the conversion logic itself.
 */

const { expect } = require("chai");
const { hexToRgb } = require("../src/converter");

describe("Unit: hexToRgb()", () => {
  describe("valid input", () => {
    it("converts a 6-digit hex value with a leading #", () => {
      expect(hexToRgb("#ff8800")).to.deep.equal({ r: 255, g: 136, b: 0 });
    });

    it("converts a 6-digit hex value without a leading #", () => {
      expect(hexToRgb("ff8800")).to.deep.equal({ r: 255, g: 136, b: 0 });
    });

    it("converts a 3-digit shorthand hex value", () => {
      expect(hexToRgb("#f80")).to.deep.equal({ r: 255, g: 136, b: 0 });
    });

    it("is case-insensitive", () => {
      expect(hexToRgb("#FF8800")).to.deep.equal(hexToRgb("#ff8800"));
    });

    it("ignores surrounding whitespace", () => {
      expect(hexToRgb("  #ff8800  ")).to.deep.equal({ r: 255, g: 136, b: 0 });
    });

    it("converts the lowest value (black)", () => {
      expect(hexToRgb("#000000")).to.deep.equal({ r: 0, g: 0, b: 0 });
    });

    it("converts the highest value (white)", () => {
      expect(hexToRgb("#ffffff")).to.deep.equal({ r: 255, g: 255, b: 255 });
    });

    it("maps each pair of digits to the correct channel", () => {
      expect(hexToRgb("#ff0000")).to.deep.equal({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#00ff00")).to.deep.equal({ r: 0, g: 255, b: 0 });
      expect(hexToRgb("#0000ff")).to.deep.equal({ r: 0, g: 0, b: 255 });
    });
  });

  describe("invalid input", () => {
    it("throws on characters that are not hex digits", () => {
      expect(() => hexToRgb("#gggggg")).to.throw(Error, "Invalid hex value");
    });

    it("throws on a wrong number of digits", () => {
      expect(() => hexToRgb("#12345")).to.throw(Error, "Invalid hex value");
      expect(() => hexToRgb("#1234567")).to.throw(Error, "Invalid hex value");
    });

    it("throws on an empty string", () => {
      expect(() => hexToRgb("")).to.throw(Error, "Invalid hex value");
    });

    it("throws a TypeError when the value is not a string", () => {
      expect(() => hexToRgb(123456)).to.throw(TypeError, "must be a string");
      expect(() => hexToRgb(null)).to.throw(TypeError, "must be a string");
      expect(() => hexToRgb(undefined)).to.throw(TypeError, "must be a string");
    });
  });
});
