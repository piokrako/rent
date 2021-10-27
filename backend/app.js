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

app.use(cors());
app.use(express.json());

const userRoutes = require('./user');
const adminRoutes = require('./admin');

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
