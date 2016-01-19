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

//Controller API Object
function controller (db) {
  
  var collection = db.collection("urls");
  
  //Create new shortened url
  this.createNew = function(req,res){
    uniqueRandomValue(collection,"short",function(shortName){
      collection.insert({"short":shortName,"long":req.params.url},function(err,result){
        if (err) throw err;
        res.json(shortName);
      });
    });
  };
  
  //Resolve a shortened url to full version
  this.resolve = function(req,res){
    collection.findOne({short:req.params.url},function(err,result){
      if (err) {throw err;}
  
      if (result){
        res.end(result.long);
      }
      else {
        res.end("That URL does not exist");
      }
    });
  };
  
}

module.exports = controller;