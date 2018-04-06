// various npm packages
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// our models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");

var PORT = process.env.PORT || 3000;

var app = express();

// for body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

// for Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var router = express.Router();

require ("./config/routes")(router);

// public folder content... of static dir
app.use(express.static(__dirname + "public"));

app.use(router);

var db = process.env.MONGODB_URI || 'mongodb://localhost:27017/theNews';

mongoose.Promise = Promise;

mongoose.connect(db, function (err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Our mongoose connection is a success!');
	}
});


//-------------------------------------------------
// mongoose.connect("mongodb://localhost/week18Populater", {
//   useMongoClient: true
// });
//-------------------------------------------------

// Listen on port 3000
app.listen(PORT, function() {
  console.log("... listening on port: " + PORT);
});