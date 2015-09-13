var express = require("express");
var app = express();
var swig = require("swig");
var routes = require("./routes");
var router = routes(io);
var bodyParser = require("body-parser");
var socketio = require("socket.io");

app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", swig.renderFile);
swig.setDefaults({cache: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", router);
//app.use("/users", users);
app.use(express.static("public"));


var port = 3000;
var server = app.listen(port, function() {
	console.log("server listening on port ", port);
});
var io = socketio.listen(server);
