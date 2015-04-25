var fs 		= require('fs')
var yaml 	= require('js-yaml')
var _ 		= require('lodash')
var mustache = require('mustache')

var render= require('./render')
var jsonp = require('./protected_json')

module.exports = function (site_data, callback){
  //This is where we'll write the actual page, based on headers, footers, etc.
  header = { title: site_data.title, baseurl: site_data.baseurl }
  footer = { time: (new Date).toString() }

  header.frontEndTemplates = fs.readFileSync(__dirname+'/../templates/_assets/templates.mst')

  content = {
    title:   site_data.title,
    content: render(site_data),
    head:    mustache.render(fs.readFileSync(__dirname+'/../templates/_includes/header.html', 'utf-8'), header),
    foot:    mustache.render(fs.readFileSync(__dirname+'/../templates/_includes/footer.html', 'utf-8'), footer)
  }

  template = fs.readFileSync(__dirname+'/../templates/_includes/default.mst','utf-8')

  //Search the final output for
  outputHTML = mustache.render(template, content)

  var regex = /<script class="jsonp"(.+)<\/script>/gi, result, indices = [];
  to_jsonprotectify = outputHTML.match(regex)

  if (to_jsonprotectify != null){
    to_jsonprotectify.forEach(function(string){
      file = string.substring(string.indexOf("src=")+5, string.lastIndexOf("\""))
      jsonp(site_data.www+'/'+file.substring(0, file.length-1))
    })
  }

  return outputHTML
}
