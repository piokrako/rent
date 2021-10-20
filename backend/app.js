const express = require("express");

const app = express();

const cors = require('cors');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin@cluster0.erfrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
  console.log('Connected')
}).catch(err => console.log(err));

app.use(cors());
app.use(express.json());

const userRoutes = require('./user');
const adminRoutes = require('./admin');

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
