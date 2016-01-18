var express = require("express");
var app = express();

var port = process.env.PORT || 8080;

app.use("/",express.static("client"));

app.get("/new/:url",require("./routes/new.js"));

app.get("/:url",require("./routes/resolve.js"));

app.listen(port, function () {
  console.log('url-shortener running on port ' + port);
});