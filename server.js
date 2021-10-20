const http = require("http");
const app = require("./backend/app");

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);

server.listen(port, function () {
  console.log("Node server is running on http://localhost:3000");
});
