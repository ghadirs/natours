const dotenv = require("dotenv");

// process.on("uncaughtException", (err) => {
//   console.log("UNHANDLED EXCEPTION!, Shutting down...");
//   console.log(err.name, err.message);
//   process.exit(1);
// });

dotenv.config({ path: "./config.env" });

const app = require("./app");

// START SERVER

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!, Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
