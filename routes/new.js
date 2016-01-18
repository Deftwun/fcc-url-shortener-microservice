module.exports = function(req,res,next){
    res.end("New url: " + req.params.url);
    next();
}