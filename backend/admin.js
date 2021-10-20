const express = require("express");
const multer = require("multer");
const car = require("./models/car");
const router = express.Router();
const Car = require('./models/car');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/save-image', upload.array('file'), (req,res) => {
  res.status(201).json({message: 'Image uploaded'});
});

router.post('/create-car', (req,res, next) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model,
    power: req.body.power,
    seats: req.body.seats,
    imgUrl: req.body.imgUrl
  });
});

car.save().then( response =>  {
  res.status(201).json({message: 'Car created'});
}).catch(error => {
  console.log(error);
})

module.exports = router;
