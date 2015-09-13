var express = require("express");
var router = express.Router();
var tweetBank = require("../tweetBank");

router.get("/", function(req, res, next) {
	var tweets = tweetBank.list();
	res.render("index", {title: "Twitter.js", tweets: tweets, showForm: true});
});

router.get("/users/:name", function(req, res, next) {
	var userName = req.params.name;
	userTweets = tweetBank.find({name: userName});
	console.log(userTweets);
	res.render("index", {name: "Tweets by {{userName}}", tweets: userTweets, showForm: true, userName: userName});
});

router.get("/users/:name/tweets/:id", function(req, res, next) {
	var userName = req.params.name;
	var id = parseInt(req.params.id, 10);
	var tweet = tweetBank.find({id: id});
	res.render("index", {name: "Tweets by {{userName}", tweets: tweet});
});

router.post("/submit", function(req, res, next){
	tweetBank.add(req.body.name, req.body.text);
	var theNewtTweet = tweetBank.list().pop();
	io.sockets.emit("new_tweet", theNewtTweet);
	res.redirect("/");
});

// module.exports = router;

module.exports = function(io) {
	return router;
};