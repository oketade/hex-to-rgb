/**
 * Entry point: starts the Express app on a network port.
 * Run with `npm start`.
 */

const app = require("./app");

// Use the PORT environment variable if it is set, otherwise 3000.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
