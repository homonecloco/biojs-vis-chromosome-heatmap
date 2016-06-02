// if you don't specify a html file, the sniper will generate a div with id "rootDiv"
var app = require("biojs-vis-chromosome-heatmap");
var instance = new app.ChromosomeHeatmap({el: rootDiv, text: 'biojs', data:'heatmapsCadenza/cadenza.json'});
