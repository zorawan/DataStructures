// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('../week1/data/m03.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students

//$('tbody')
    //.children()
   // .each(function (index, element) {
        //console.log($(element).children().first().text());
        //$("h4, b, div, span, a, br").remove();
  //  });

var address = '';
$('tbody')
    .children()
    .each(function (index, element) {
        $('h4, b, div, span, center').remove();
        var line = $(element)
                .children()
                .first()
                .text()
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        if (line.length > 0) {
            address += line + "\n";
        }
    });
address = address.slice(0, address.length -1);
fs.writeFileSync('./addressBook.txt', address);