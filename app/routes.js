module.exports = function(app,db){
  
  var express =require("express"),
      newUrl = require("./controllers/newUrl.js"),
      resolveUrl = require("./controllers/resolveUrl.js");
  
  app.use("/",express.static("client"));
  
  app.get("/new/:url",function(req,res,next){
    var d = newUrl(req.params.url,db);
    res.end("New url: " + req.params.url + "\n shortened to : " + d);
    next();
  });
  
  app.get("/:url",function(req,res,next){
    var d = resolveUrl(req.params.url,db);
    res.end("Resolve url: " + req.params.url + "\n to : " + d);
    next();
  });
  
}