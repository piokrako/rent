if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();

const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_ENCRIPTION_PASSWORD = process.env.JWT_ENCRIPTION_PASSWORD;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

router.post("/signup", async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    email: req.body.email,
    isAdmin: 0,
    password: hash,
  });

  User.findOne({ email: req.body.email })
    .then((registeredUser) => {
      if (registeredUser) {
        console.log(registeredUser.email, " - User already exists");
        res
          .status(409)
          .json({ message: "Registration Error! User already exists" });
      } else {
        newUser
          .save()
          .then((savedUser) => {
            let isAdmin = 0;
            let payload = {
              subject: savedUser._id,
              userId: savedUser._id,
              email: savedUser.email,
              isAdmin: isAdmin,
            };

            const token = jwt.sign(payload, JWT_ENCRIPTION_PASSWORD, {
              expiresIn: JWT_EXPIRES_IN,
            });

            const response_body = {
              token: token,
              expiresIn: JWT_EXPIRES_IN,
              email: savedUser.email,
              isAdmin: isAdmin,
              message: "User created",
            };
            res.status(201).json(response_body);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("Register user() finished");
});

router.post("/login", (req, res, next) => {
  let fetcheduser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Auth Failed" });
      }
      fetcheduser = user;
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (!result) {
            console.log("Auth failed: Password does not match.");
            return res
              .status(401)
              .json({ message: "Auth failed: Password does not match." });
          }
          console.log("User found. Password is OK. Generate token...");
          const payload = {
            subject: fetcheduser._id,
            userId: fetcheduser._id,
            email: fetcheduser.email,
            isAdmin: fetcheduser.isAdmin,
          };
          const token = jwt.sign(payload, JWT_ENCRIPTION_PASSWORD, {
            expiresIn: JWT_EXPIRES_IN,
          });
          console.log("token: " + token);

          const response_body = {
            token: token,
            expiresIn: JWT_EXPIRES_IN,
            email: fetcheduser.email,
            isAdmin: fetcheduser.isAdmin,
          };
          res.status(200).json(response_body);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
