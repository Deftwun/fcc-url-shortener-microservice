var express = require("express");
var app = express();

var port = process.env.PORT || 8080;

var mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) {
  
  if (err) {
      throw new Error('Database failed to connect!');
  } else {
      console.log('MongoDB successfully connected on port 27017.');
  }
    
  app.use("/",express.static("client"));
  app.get("/new/:url",require("./routes/new.js"));
  app.get("/:url",require("./routes/resolve.js"));
  
  app.listen(port, function () {
    console.log('url-shortener running on port ' + port);
  });
  
});