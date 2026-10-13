/**
 * Hex to RGB converter library.
 *
 * Exports a single function, hexToRgb, which converts a hex colour
 * string into an object with red, green and blue values.
 */

// Matches exactly 3 or exactly 6 hex digits (0-9, a-f), case-insensitive.
const HEX_PATTERN = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Converts a hex colour value to an RGB object.
 *
 * Accepted formats: "#ff8800", "ff8800", "#f80" and "f80" (any letter case).
 *
 * @param {string} hex - The hex colour value, with or without a leading "#".
 * @returns {{r: number, g: number, b: number}} Each channel as an integer 0-255.
 * @throws {TypeError} If hex is not a string.
 * @throws {Error} If hex is not a valid 3 or 6 digit hex colour.
 *
 * @example
 * hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
 * hexToRgb("f80");     // { r: 255, g: 136, b: 0 }
 */
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("Hex value must be a string");
  }

  // Remove surrounding whitespace and an optional leading "#".
  let digits = hex.trim().replace(/^#/, "");

  if (!HEX_PATTERN.test(digits)) {
    throw new Error(`Invalid hex value: "${hex}"`);
  }

  // Expand shorthand, e.g. "f80" becomes "ff8800".
  if (digits.length === 3) {
    digits = digits
      .split("")
      .map((digit) => digit + digit)
      .join("");
  }

  // Each pair of hex digits is one colour channel (base 16 -> base 10).
  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16),
  };
}

module.exports = { hexToRgb };
