module.exports = function(req,res,next){
    res.end("Resolve url: " + req.params.url);
    next();
}