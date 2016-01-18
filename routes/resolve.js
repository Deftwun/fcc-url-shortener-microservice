module.exports = function(req,res,next){
    var resolver = require("../controllers/resolveUrl.js");
    var d = resolver(req.params.url);
    res.end("Resolve url: " + req.params.url + " to : " + d);
    next();
}