const jwt = require("jsonwebtoken");
const JWT_ENCRIPTION_PASSWORD = process.env.JWT_ENCRIPTION_PASSWORD || "my_encryption_password";

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }

  let payload = jwt.verify(token, JWT_ENCRIPTION_PASSWORD, function (err, pl) {
    if (err) {
      return res.status(401).send("Unauthorized request");
    } else {
      if (!pl) {
        return res.status(401).send("Unauthorized request");
      }
      req.userId = pl.userId;
      req.isAdmin = pl.isAdmin;
      next();
    }
  });
}

module.exports = verifyToken;
