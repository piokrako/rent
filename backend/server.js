const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} else if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/dist'));
}

server.listen(port, function () {
  console.log("Node server is running on http://localhost:" + port);
});
