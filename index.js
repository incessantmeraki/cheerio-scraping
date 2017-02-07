var fs = require('fs')
var $ = require('cheerio')
var request = require('request')

var teacherURLs = []
var result = fs.createWriteStream('./output')

function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html)

  parsedHTML('.views-field-field-faculty-profile-image a').map(function (i, link) {
    //console.log(link)
    var href = $(link).attr('href')
    result.write(href.toString()+'\n')
    teacherURLs.push(href)
  })
  //console.log(teacherURLs)
}

var domain = 'http://bmsce.ac.in/department/computer-science-and-engineering/faculty' 

request(domain, gotHTML)

