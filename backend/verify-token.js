const jwt = require("jsonwebtoken");
const JWT_ENCRIPTION_PASSWORD =
  process.env.JWT_ENCRIPTION_PASSWORD;

const verifyToken = (req, res, next) => {
  // const token =
  //   req.body.token || req.query.token || req.headers["x-access-token"];

  // if (!token) {
  //   return res.status(403).send("A token is required for authentication");
  // }
  // try {
  //   const decoded = jwt.verify(token, JWT_ENCRIPTION_PASSWORD);
  //   req.user = decoded;
  // } catch (err) {
  //   return res.status(401).send("Unauthorized request - Invalid Token");
  // }
  // return next();
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request 1");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request 2");
  }
  //token exists
  let payload = jwt.verify(token, JWT_ENCRIPTION_PASSWORD, function (err, pl) {
    if (err) {
      console.log('err', err);
      return res.status(401).send("Unauthorized request 3");
    } else {
      console.log('pl',pl);
      if (!pl) {
        return res.status(401).send("Unauthorized request 4 ");
      }
      req.userId = pl.userId;
      req.isAdmin = pl.isAdmin;
      next();
    }
  });

};

module.exports = verifyToken;
