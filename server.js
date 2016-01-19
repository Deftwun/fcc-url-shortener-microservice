var express = require("express");
var app = express();
"use strict";

var port = process.env.PORT || 8080;

var mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017/shortUrl', function (err, db) {
  
  if (err) {
      throw new Error('Database failed to connect!');
  } else {
      console.log('MongoDB successfully connected on port 27017.');
  }
  
  var routes = require("./app/routes.js");
  routes(app,db);  
  
  app.listen(port, function () {
    console.log('url-shortener running on port ' + port);
  });
  
});