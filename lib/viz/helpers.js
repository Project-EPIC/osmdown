var _ = require('lodash')

function topTags(objects, options){
  var tags = {}
  objects.forEach(function(bucket){
    bucket.objects.forEach(function(way){
      Object.keys(way.tags).forEach(function(key){
        if (tags[key] == undefined){ tags[key] = {'key': key, 'values': [], dates: []} }
        tags[key].dates.push(bucket.start_date)
        tags[key].values.push(way.tags[key])
      });
    });
  });

  Object.keys(tags).forEach(function(key){
    tags[key]['sortedValues'] = _.sortBy(_.collect(_.groupBy(tags[key].values),
      function(x,y){
        return {value: y, count: x.length}
      }),
        function(x){
          return -x.count
        })
  });

  var sorted = _.sortBy(tags, function(tag){return -tag.dates.length})
  return sorted
}


module.exports = {
  topTags: topTags
}
