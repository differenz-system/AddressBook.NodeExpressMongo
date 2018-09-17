var express = require('express')
var url = require('url');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var u="mongodb://localhost:27017/address_book";
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());


mongoose.Promise = global.Promise;

mongoose.connect(u, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});




