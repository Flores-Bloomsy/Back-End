process.loadEnvFile();

const db = require("./src/lib/db");
const server = require("./src/server");
const port = process.env.PORT || 8080;

db.connect()
  .then(() => {
    console.log("Database connection successful!");
    server.listen(port, () => {
      console.log("server in port", port);
    });
  })
  .catch((error) => {
    console.log("DB Connection error", error);
  });
