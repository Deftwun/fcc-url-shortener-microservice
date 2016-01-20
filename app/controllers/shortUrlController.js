"use strict";

//Come up with a unique random string in a collection (given a field)
// and pass that string to a callback function.
function uniqueRandomValue(collection,field,callback){
  var rs = (require("random-string"))();
  
  collection.findOne({field:rs},function(err,result){
    if (err) throw err;
    if (result){
      uniqueRandomValue(collection,field,callback);
    }
    else {
      callback(rs);
      return;
    }
  });
  
}

//Make sure url is formatted properly
function validateUrl(url){
  var isValidDomain = require('is-valid-domain');
  return isValidDomain(url); 
}

//Controller API Object
function controller (db) {
  
  var collection = db.collection("urls");
  
  //Create new shortened url
  this.createNew = function(req,res){
    
    if (!validateUrl(req.params.url)){
      res.json({"error":"Not a valid URL"});
      return;
    }
    
    uniqueRandomValue(collection,"short",function(shortName){
      var s = shortName,
          l = req.params.url;
          
      collection.insert(
        {"short_url":s,"long_url":l},function(err,result){
          if (err) throw err;

          var data = {
            "short_url": req.headers.host + "/" + s,
            "long_url": l
          }
          res.json(data);
        });
    });
    
  };
  
  //Resolve a shortened url to full version
  this.resolve = function(req,res){
    var query = {"short_url":req.params.url},
        projection = {"_id":0};
        
    collection.findOne(query,projection,function(err,result){
      if (err) {throw err;}
  
      if (result){
        res.json(result);
      }
      else {
        res.end("That shortened URL does not exist");
      }
    });
  };
  
}

module.exports = controller;