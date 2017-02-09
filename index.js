var fs = require('fs')
var $ = require('cheerio')
var request = require('request')

var teacherURLs = []
var result = fs.createWriteStream('./output')
result.end()

function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html)

  parsedHTML('.views-field-field-faculty-profile-image a').map(function (i, link) {
    //console.log(link)
    var href = $(link).attr('href')
    //result.write(href.toString()+'\n')
    var data = href.toString()+'\n'
    teacherURLs.push(href)
    fs.appendFile('./output', data, function (err) {
      if (err) console.log(err)
    })
  })
  //console.log(teacherURLs)
}

var domains = []
domains.push('http://bmsce.ac.in/department/architecture/faculty') 
//domains.push('http://bmsce.ac.in/department/computer-science-and-engineering/faculty?page=1')

domains.forEach(function (domain) {
  request(domain, gotHTML)
})

