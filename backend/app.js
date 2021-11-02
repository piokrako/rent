if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const path  = require('path');

const app = express();

const cors = require('cors');
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.erfrd.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
  console.log('Connected')
}).catch(err => console.log(err));

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')
  }

  let payload = jwt.verify(token, 'secretKey')
}

app.use(cors());
app.use(express.json());

const userRoutes = require('./user');
const adminRoutes = require('./admin');

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

module.exports = app;
