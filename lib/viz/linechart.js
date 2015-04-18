var Mustache = require('Mustache')
var fs = require('fs')
var _ = require('lodash')

module.exports = function(data, options){

  var chartType = 'linegraph_dates'

  if (options == undefined){
    var options = {}
  }
  if (options.location == undefined){
    options.location = __dirname+'/../../templates/_charts/'
  }
  options.id = 'testing'

  //data should simply be a 2d array... That simple.

  forPlotting = []

  data.forEach(function(x){
    if (x.key=='building'){
      buildings = _.collect(_.groupBy(x.dates), function(values, date){ return {date: date, value: values.length}})
      forPlotting.push({data: buildings, title: "Buildings"})
    }
    if (x.key=='highway'){
      buildings = _.collect(_.groupBy(x.dates), function(values, date){ return {date: date, value: values.length}})
      forPlotting.push({data: buildings, title: "Highways"})
    }
  })

  // console.log(buildings)

  options.fullData = JSON.stringify(data)

  options.data = JSON.stringify(forPlotting)
  //Pass an array of data

  /*Evaluate whatever is necessary, call whatever is needed, and write HTML string */

  return Mustache.render(fs.readFileSync(options.location + chartType + ".html", 'utf-8'), options)
}
