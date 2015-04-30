var Mustache = require('mustache')
var fs = require('fs')
var _ = require('lodash')

module.exports = function(data, options){

  var chartType = options.chartType

  if (options.location == undefined){
    options.location = __dirname+'/../../templates/_charts/'
  }
  options.id = 'testing'

  //data should simply be a 2d array... That simple.
  forPlotting = []

  data.forEach(function(x){
    switch (x.key) {
        case 'building':
          buildings = _.collect(_.groupBy(x.dates), function(values, date){ return {date: date, value: values.length}})
          forPlotting.push({data: buildings, title: "Buildings"})
          break;
        case 'highway':
          buildings = _.collect(_.groupBy(x.dates), function(values, date){ return {date: date, value: values.length}})
          forPlotting.push({data: buildings, title: "Highways"})
          break;
        default:
          if (x != null){
            forPlotting.push(x)
          }
      }
  })

  //console.log(forPlotting)

  options.data = JSON.stringify([{title: 'Changesets', data: forPlotting}])

  //Pass an array of data

  return Mustache.render(fs.readFileSync(options.location + chartType + ".html", 'utf-8'), options)
}
