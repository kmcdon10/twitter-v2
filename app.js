var express = require("express");
var app = express();
var swig = require("swig");
var bodyParser = require("body-parser");
var socketio = require("socket.io");

app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", swig.renderFile);
swig.setDefaults({cache: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var server = app.listen(3000, function() {
	console.log("server listening on port ", server.address().port);
});

var io = socketio.listen(server);

var routeMaker = require("./routes");
app.use(routeMaker(io));