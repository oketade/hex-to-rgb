/**
 * Express application exposing the hex to RGB converter as a REST API.
 *
 * The app is exported without calling listen(), so that the integration
 * tests can use it without opening a real network port. The server is
 * started separately in server.js.
 */

const express = require("express");
const { hexToRgb } = require("./converter");

const app = express();

/**
 * GET /hex-to-rgb?hex=<value>
 *
 * Converts the hex colour given in the "hex" query parameter to RGB.
 * A leading "#" must be URL-encoded as "%23", or simply left out.
 *
 * 200: { "hex": "ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }
 * 400: { "error": "<reason>" } when the parameter is missing or invalid.
 */
app.get("/hex-to-rgb", (req, res) => {
  const { hex } = req.query;

  if (hex === undefined) {
    return res.status(400).json({ error: 'Missing query parameter "hex"' });
  }

  try {
    res.json({ hex, rgb: hexToRgb(hex) });
  } catch (error) {
    // The library throws on invalid input, which is a client error.
    res.status(400).json({ error: error.message });
  }
});

// Any other route: respond with JSON instead of Express' default HTML page.
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = app;
