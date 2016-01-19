"use strict";

module.exports = function(app,db){
  
  var express =require("express"),
      UrlController = require("./controllers/shortUrlController.js"),
      controller = new UrlController(db);
  
  app.use("/",express.static("client"));
  
  app.get("/new/:url",function(req,res){
    controller.createNew(req,res);
  });
  
  app.get("/:url",function(req,res){
    controller.resolve(req,res);
  });
  
}