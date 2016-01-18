module.exports = function(req,res,next){
    var shortener = require("../controllers/newUrl.js");
    var d = shortener(req.params.url);
    res.end("New url: " + req.params.url + " shortened to : " + d);
    next();
}