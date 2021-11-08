
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: false}));

const app = require('./backend/app');
server.use('/api', app);
server.use('/uploads', express.static(path.join(__dirname, '/backend/uploads')));

if (process.env.NODE_ENV === "production") {
  console.log(
    "PROD -> server static content under: " +
      path.join(__dirname, "/frontend/dist/Rent")
  );
  // server.use(express.static(path.join(__dirname, "/frontend/dist/Rent")));
  server.use(express.static("build"));
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "/frontend/dist/Rent/index.html"));
  });
} else {
  console.log("NON PROD -> run ng serve");
  require("dotenv").config();
  server.use(express.static("frontend/dist/Rent"));
}

server.listen(port, function () {
  console.log("Node server is running on port " + port);
});
