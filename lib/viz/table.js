
module.exports = function(data, options){

  if (options.limit==undefined){ options.limit = data.length }

  var HTML = '<div class="osmviz table"><table id="'+options.title+'" class="tablesorter">'

  if (options.headers != undefined){
    HTML += '<thead><tr>'
    options.headers.forEach(function(header){
      HTML+= '<th>' + header + '</th>'
    })
    HTML += '</thead></tr><tbody>'
  }

  for(var i=0; i<options.limit; i++){
    HTML+='<tr>'
    data[i].forEach(function(row){
      HTML+='<td>'+row+'</td>'
    })
    HTML+='</tr>'
  }
  HTML+= '</tbody></table></div>'

  return HTML
}
