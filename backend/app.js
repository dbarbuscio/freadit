const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user')
const app = express();


function mongoConnect() {
  mongoose.connect(
    'mongodb://mongouser:' +
    process.env.MONGO_ATLAS_PW +
    '@mongo-server/node-angular?authSource=admin&retryWrites=true'
    )
    .then(() => {
      console.log('Connected to Mongodb');
    })
    .catch((err) => {
      console.log('MongoDB connection failed! Will retry in 5secs');
      setTimeout(mongoConnect, 5000);
    });
}

mongoConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false} ));
app.use('/images', express.static(path.join('images')));


app.use((req ,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
