var renderSingleHeatmap; 
module.exports = renderSingleHeatmap = function(opts, data){
	var cols = opts.cols;
	var heatmap = data.heatmaps[opts.name];
	var values = heatmap.values;
	
	for(var i in values){
		var g = opts.g.append("g");
		g.attr('transform',
	 'translate(0,' + i * opts.valueHeight + ')');
		var rectangles = g.selectAll('rect')
		.data(values[i])
		.enter()
		.append('rect');

		var rectangleAttributes = rectangles
		.attr('x', function (d,j) { return j * opts.valueWidth; })
		.attr('y', function (d) { return 0; })
		.attr('height', function (d) { return opts.valueHeight; })
		.attr('width', function (d) { return opts.valueWidth; })
		.style('fill', function(d) { return opts.cols(d); });
	}

	var g = opts.g.append('g');
	g.attr('transform',
	 'translate(0,' + (values.length + 13) * opts.valueHeight + ')');
	var txts = g.selectAll('text')
	.data(heatmap.colnames)
	.enter()
	.append('text');
	txts.style('fill', 'black')
	.attr('y', function(d,i){return (1+i) * opts.valueWidth})
	.attr('transform', 'rotate(270)')
	.attr('font-size', opts.valueWidth + 'px')
	.text(function(d){return d});



}