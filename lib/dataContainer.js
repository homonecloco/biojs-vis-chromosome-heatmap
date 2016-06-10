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
		
		papaparse.parse(self.heatmaps[i].url, {
			download: true,
			dynamicTyping: true,
			local_i: i,
			complete: function(results) {
				var d = results.data
				var rownames = [];
				var colnames;
				var rows = [];
				var size;
				var local_heat = self.heatmaps[this.local_i];
				//console.log(d);
				for(r in d){
					row = d[r].slice(0);;
					if(r == 0){
						size = row.length;	
						row.shift();
						colnames = row;
					}else{
						if(size != row.length){
							continue;
						}
						rownames.push(row[0]);
						row.shift();
						//console.log(row);
						rows.push(row);
						var max = Math.max(...row);
						var min = Math.max(...row);
						if(max > self.maxValue){
							//console.log(max);
							self.maxValue = max;
						}
						if(min < self.minValue && min > -Infinity){
							//console.log(min);
							//console.log(d[r]);
							self.minValue = min;
						}
					}
				}
				//console.log(rownames);
				local_heat.rownames = rownames;
				local_heat.colnames = colnames;
				local_heat.values = rows;
				self.loaded++;
				if(rownames.length > self.maxRows){
					self.maxRows = rownames.length
				}
				if(colnames.length > self.maxCols){
					self.maxCols = colnames.length;
				}
				if(self.loaded ==  Object.keys(self.heatmaps).length){
					caller.render();
				}
			}
		});
	}
	return this;
};