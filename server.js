
const app = require("./backend/app");
const path = require("path");
const express = require("express");

const port = process.env.PORT || 3000;
// app.set("port", port);
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use('/api', app);
// const server = http.createServer(app);

console.log('__dirname: ' + __dirname);
console.log('static content 1: ' + path.join(__dirname, '/dist'));
console.log('static content 2: ' + path.join(__dirname, '/frontend/dist'));

if (process.env.NODE_ENV === "production") {
  console.log(
    "PROD -> server static content under: " +
      path.join(__dirname, "/frontend/dist")
  );
  server.use(express.static(path.join(__dirname, "/frontend/dist")));
} else {
  console.log("NON PROD -> run ng serve");
  require("dotenv").config();
  server.use(express.static("frontend/dist"));
}

server.listen(port, function () {
  console.log("Node server is running on http://localhost:" + port);
});
