var jQuery = require('jquery');
var papaparse = require('papaparse')

var chromosomeDataContainer; 
module.exports = chromosomeDataContainer = function(data, loadCallback){
	console.log("in the container parser!");
	for (var attrname in data) { 
		var d = data[attrname];
		this[attrname] = d; 
	};

	for (i in this.heatmaps){
		var heat = this.heatmaps[i];
		console.log(heat);
		papaparse.parse(heat.url, {
			download: true,
			dynamicTyping: true,
			complete: function(results) {

				//console.log(results);
				var d = results.data
				for(r in d){
					console.log(d[r]);
				}
			}
		});
	}

	return this;
};