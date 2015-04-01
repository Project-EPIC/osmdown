var fs = require('fs')

module.exports = function(data, options){
	var HTML = ''
	HTML += "<div id='" + options.name + "' style='height: 500px; width: 100%;'></div>"
	HTML += '<script>'
	HTML += "var map = L.map('" + options.name + "'); L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', { maxZoom: 18, id: 'examples.map-i875mjb7'}).addTo(map);"
	HTML += 'L.geoJson(' + data + ').addTo(map);'
	HTML += 'var bounds = L.geoJson(' + data + ').getBounds();'
    HTML += 'map.fitBounds(bounds, { padding: [50,50] });'
	HTML += '</script>'
	return HTML
}
