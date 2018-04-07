var cheerio = require("cheerio");
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("https://www.sciencenews.org", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];
  // var results2 = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $(".field-item").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).children(".node-title").text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");

    // if linkFix 

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // request("https://www.theonion.com", function(error, response, html) {

  // // Load the HTML into cheerio and save it to a variable
  // // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  // var $ = cheerio.load(html);

  // // An empty array to save the data that we'll scrape
  // // var results = [];
  // var results2 = [];

  // $("div.excerpt").each(function(i, element) {

  //   // Save the text of the element in a "title" variable
  //   var summ = $(element).children().text();

  //   // In the currently selected element, look at its child elements (i.e., its a-tags),
  //   // then save the values for any "href" attributes that the child elements may have
  //   // var link = $(element).children().attr("href");

  //   // if linkFix 

  //   // Save these results in an object that we'll push into the results array we defined earlier
  //   results2.push({
  //     summ: summ
  //     // link: link
  //   });
  // });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
  // console.log(results2);
});