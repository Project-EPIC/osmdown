var fs 		= require('fs')
var yaml 	= require('js-yaml')
var _ 		= require('lodash')
var mustache = require('mustache')

var render= require('./render')

module.exports = function (site_data, callback){
  //This is where we'll write the actual page, based on headers, footers, etc.
  header = { title: site_data.title}
  footer = { copyright: "Copyright 2015 - Information Retrieval in JavaScript"}

  content = {
    title:   site_data.title,
    content: render(site_data),
    head:    mustache.render(fs.readFileSync('templates/_includes/header.html', 'utf-8'), header),
    foot:    mustache.render(fs.readFileSync('templates/_includes/footer.html', 'utf-8'), footer)
  }

  template = fs.readFileSync('templates/_includes/default.mst','utf-8')

  return mustache.render(template, content)
}
