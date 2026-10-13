/**
 * Integration tests for the GET /hex-to-rgb route.
 *
 * These tests send HTTP requests to the Express app with Supertest, so
 * they verify the route, the query parsing, the library and the JSON
 * response working together.
 */

const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");

describe("Integration: GET /hex-to-rgb", () => {
  describe("valid requests", () => {
    it("responds with 200 and the RGB value as JSON", async () => {
      const response = await request(app).get("/hex-to-rgb?hex=ff8800");

      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.match(/application\/json/);
      expect(response.body).to.deep.equal({
        hex: "ff8800",
        rgb: { r: 255, g: 136, b: 0 },
      });
    });

    it("accepts a URL-encoded leading # (%23)", async () => {
      const response = await request(app).get("/hex-to-rgb?hex=%23ff8800");

      expect(response.status).to.equal(200);
      expect(response.body.rgb).to.deep.equal({ r: 255, g: 136, b: 0 });
    });

    it("accepts a 3-digit shorthand hex value", async () => {
      const response = await request(app).get("/hex-to-rgb?hex=f80");

      expect(response.status).to.equal(200);
      expect(response.body.rgb).to.deep.equal({ r: 255, g: 136, b: 0 });
    });

    it("accepts upper-case hex digits", async () => {
      const response = await request(app).get("/hex-to-rgb?hex=FF8800");

      expect(response.status).to.equal(200);
      expect(response.body.rgb).to.deep.equal({ r: 255, g: 136, b: 0 });
    });
  });

  describe("invalid requests", () => {
    it("responds with 400 when the hex parameter is missing", async () => {
      const response = await request(app).get("/hex-to-rgb");

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Missing query parameter "hex"');
    });

    it("responds with 400 when the hex value is invalid", async () => {
      const response = await request(app).get("/hex-to-rgb?hex=xyz");

      expect(response.status).to.equal(400);
      expect(response.headers["content-type"]).to.match(/application\/json/);
      expect(response.body.error).to.include("Invalid hex value");
    });

    it("responds with 400 when the hex value is empty", async () => {
      const response = await request(app).get("/hex-to-rgb?hex=");

      expect(response.status).to.equal(400);
      expect(response.body.error).to.include("Invalid hex value");
    });

    it("responds with 400 when the hex parameter is given twice", async () => {
      const response = await request(app).get("/hex-to-rgb?hex=aaa&hex=bbb");

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal("Hex value must be a string");
    });

    it("responds with 404 for an unknown route", async () => {
      const response = await request(app).get("/unknown");

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ error: "Not found" });
    });
  });
});
