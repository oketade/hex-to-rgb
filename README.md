# hex-to-rgb

A small JavaScript library for converting hex colour values to RGB, an
Express REST API that uses the library, and a test suite with unit and
integration tests.

## Requirements

- Node.js 18 or newer

## Installation

```
npm install
```

## Usage

### Library

```js
const { hexToRgb } = require("./src/converter");

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("f80");     // { r: 255, g: 136, b: 0 }
```

Accepted formats are 3 or 6 hex digits, with or without a leading `#`,
in any letter case. Invalid input throws an error.

### REST API

Start the server (port 3000 by default, or the `PORT` environment variable):

```
npm start
```

| Method | Route                     | Description                    |
| ------ | ------------------------- | ------------------------------ |
| GET    | `/hex-to-rgb?hex=<value>` | Converts a hex value to RGB    |

A leading `#` must be URL-encoded as `%23`, or left out.

Example request:

```
curl -i "http://localhost:3000/hex-to-rgb?hex=ff8800"
```

Responses:

| Status | When                                   | Body                                                     |
| ------ | -------------------------------------- | -------------------------------------------------------- |
| 200    | Valid hex value                        | `{ "hex": "ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }` |
| 400    | `hex` parameter is missing or invalid  | `{ "error": "<reason>" }`                                |
| 404    | Unknown route                          | `{ "error": "Not found" }`                               |

## Tests

```
npm test
```

| File                     | Type        | What it tests                                   |
| ------------------------ | ----------- | ----------------------------------------------- |
| `test/converter.test.js` | Unit        | The `hexToRgb` function directly                |
| `test/app.test.js`       | Integration | The `GET /hex-to-rgb` route over HTTP (Supertest) |

The tests use Mocha as the test runner, Chai for assertions and Supertest
for sending HTTP requests to the Express app.

## Project structure

```
src/
  converter.js   Library: the hexToRgb function
  app.js         Express app and route
  server.js      Starts the app on a port
test/
  converter.test.js   Unit tests
  app.test.js         Integration tests
```
