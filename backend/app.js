const express = require("express");

const app = express();

const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin@cluster0.erfrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
  console.log('Connected')
}).catch(err => console.log(err));


app.use(cors());
app.use(bodyparser.json());

const userRoutes = require('./user');
app.use('/api/user', userRoutes)

module.exports = app;
