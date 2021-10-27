
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: false}));
const app = require('./backend/app');
server.use('/api', app);

if (process.env.NODE_ENV === "production") {
  console.log(
    "PROD -> server static content under: " +
      path.join(__dirname, "/frontend/dist")
  );
  server.use(express.static(path.join(__dirname, "/frontend/dist/Rent")));
} else {
  console.log("NON PROD -> run ng serve");
  require("dotenv").config();
  server.use(express.static("frontend/dist/Rent"));
}

server.listen(port, function () {
  console.log("Node server is running on http://localhost:" + port);
});
