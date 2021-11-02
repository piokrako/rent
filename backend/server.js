
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: false}));

const app = require('./app');
server.use('/api', app);
server.use('/uploads', express.static(path.join(__dirname, '/backend/uploads')));

if (process.env.NODE_ENV === "production") {
  console.log(
    "PROD -> server static content under: " +
      path.join(__dirname, "/backend/angular")
  );
  server.use(express.static(path.join(__dirname, "/backend/angular")));
} else {
  console.log("NON PROD -> run ng serve");
  require("dotenv").config();
  server.use(express.static("/backend/angular"));
}

server.listen(port, function () {
  console.log("Node server is running on port " + port);
});
