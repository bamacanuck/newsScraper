// various npm packages
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// our models
// var Comments = require("./models/Comments.js");
// var Articles = require("./models/Articles.js");

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

// public folder content... of static dir
app.use(express.static(__dirname + "public"));

app.use(router);

// Listen on port 3000
app.listen(PORT, function() {
  console.log("... listening on port: " + PORT);
});