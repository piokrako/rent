const express = require("express");
const multer = require("multer");
const router = express.Router();
const Car = require("./models/car");
const User = require("./models/user");
const Reservation = require("./models/reservation");
const verifyToken = require("./verify-token");
const { uploadFile, getFileStream } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./backend/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/save-image", upload.array("file"), (req, res) => {
//   console.log(req.file);
//   res.status(201).json({ message: "Image uploaded" });
// });

const upload = multer({ dest: "backend/uploads/" });

router.get("/uploads/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post("/save-image", upload.single("file"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  res.send({ imageKey: `${result.Key}` });
});

router.post("/create-car", verifyToken, (req, res, next) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model,
    power: req.body.power,
    seats: req.body.seats,
    imgUrl: req.body.imgUrl,
  });
  console.log(req);
  car
    .save()
    .then((response) => {
      res.status(201).json({ message: "Car created" });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/users", verifyToken, (req, res, next) => {
  User.find({}, "email isAdmin")
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No users Found" });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/delete-user", verifyToken, (req, res, next) => {
  User.deleteOne({ email: req.body.email })
    .then(() => {
      User.find()
        .then((users) => {
          res.status(201).json(users);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/admin-user", verifyToken, (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { isAdmin: 1 } },
    { new: true }
  )
    .then((user) => {
      User.find()
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

// lte = less than equal, gte = greater than equal, ne = not equal
router.post("/cars", (req, res) => {
  Reservation.find()
    .or([
      {
        $and: [
          { from: { $lte: req.body.from } },
          { until: { $gte: req.body.from } },
        ],
      },
      {
        $and: [
          { from: { $lte: req.body.until } },
          { until: { $gte: req.body.until } },
        ],
      },
      {
        $and: [
          { from: { $gt: req.body.from } },
          { until: { $lt: req.body.until } },
        ],
      },
    ])
    .then((cars) => {
      if (cars[0] === undefined) {
        Car.find()
          .then((car) => {
            res.status(200).json(car);
          })
          .catch((error) => console.log(error));
      } else {
        Car.find({ _id: { $ne: cars[0].car_id } })
          .then((car) => {
            res.status(201).json(car);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
});

router.post("/rent", verifyToken, (req, res) => {
  const reservation = new Reservation({
    car_id: req.body.id,
    from: req.body.from,
    until: req.body.until,
    fromDate: req.body.fromDate,
    untilDate: req.body.untilDate,
  });
  reservation
    .save()
    .then(() => {
      res.status(200).json({ message: "Car Rented" });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/rented-cars", verifyToken, (req, res) => {
  Reservation.find()
    .then((rented) => {
      res.status(200).json(rented);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/cancel-reservation", verifyToken, (req, res) => {
  Reservation.deleteOne({
    car_id: req.body.id,
    fromDate: req.body.from,
    untilDate: req.body.until,
  })
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
