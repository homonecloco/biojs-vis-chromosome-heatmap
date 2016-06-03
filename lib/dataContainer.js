var jQuery = require('jquery');
var papaparse = require('papaparse')

var chromosomeDataContainer; 
module.exports = chromosomeDataContainer = function(data, caller){
	for (var attrname in data) { 
		var d = data[attrname];
		this[attrname] = d; 
	};

	var self = this;
	this.maxRows = 0;
	this.maxCols = 0;
	this.loaded = 0;
	this.minValue = Infinity;
	this.maxValue = -Infinity;
	for (i in this.heatmaps){
		var heat = this.heatmaps[i];
		console.log(heat);
		papaparse.parse(heat.url, {
			download: true,
			dynamicTyping: true,
			complete: function(results) {

				//console.log(results);
				var d = results.data
				var rownames = [];
				var colnames;
				var rows = [];
				var size;
				for(r in d){
					row = d[r];
					if(r == 0){
						size = row.length;	
						row.shift();
						colnames = row;
					}else{
						if(size != row.length){
							continue;
						}
						rownames.push(row.shift());
						rows.push(row);
						var max = Math.max(...row);
						var min = Math.max(...row);
						if(max > self.maxValue){
							self.maxValue = max;
						}
						if(min < self.minValue){
							self.minValue = min;
						}
					}
				}
				heat.rownames = rownames;
				heat.colnames = colnames;
				heat.values = rows;
				self.loaded++;
				if(rownames.length > self.maxRows){
					self.maxRows = rownames.length
				}
				if(colnames.length > self.maxCols){
					self.maxCols = colnames.length;
				}
				if(self.loaded == self.heatmaps.length){
					caller.render();
				}
			}
		});
	}

	return this;
};