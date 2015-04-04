var fs = require('fs')

module.exports = function(data, options){

	// Set some reasonable defaults for options
	var name = options.name ? options.name : 'map'
	var height = options.height ? options.height : '500px'
	var width = options.width ? options.width : '100%'
	var padding = options.padding ? options.padding : '50'

	function onEachFeature(feature, layer) {
	    if (feature.properties && feature.properties.popupContent) {
	        layer.bindPopup(feature.properties.popupContent);
	    }
	}

	L.geoJson(geojsonFeature, {
	    onEachFeature: onEachFeature
	}).addTo(map);

	var HTML = ''
	HTML += "<div id='" + name + "' style='height:" + height + "; width:" + width + ";'></div>"
	HTML += '<script>'
	HTML += "var map = L.map('" + name + "'); L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', { maxZoom: 18, id: 'examples.map-i875mjb7'}).addTo(map);"
	HTML += 'var layer = L.geoJson(' + data + ');'
	HTML += 'var bounds = L.geoJson(' + data + ').getBounds();'
    HTML += 'map.fitBounds(bounds, { padding: [' + padding + ',' + padding + '] });'
	HTML += '</script>'
	return HTML
}
