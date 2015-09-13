var express = require("express");
var app = express();


app.get("/", function(req, res, next) {
	res.send("hello kate");
});


var server = app.listen(300, function() {
	console.log("server listening on port ", server.address().port);
});