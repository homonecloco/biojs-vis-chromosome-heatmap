var renderSingleHeatmap; 
module.exports = renderSingleHeatmap = function(opts, data){
	var cols = opts.cols;
	var heatmap = data.heatmaps[opts.name];
	var centromere = data.centromeres[opts.name];
	var midCentromere = (centromere.max + centromere.min)/2;
	var midCentromereOffset = -Infinity;

	var values = heatmap.values;
	var total_values = values.length;
	var localValueHeight = 0.65 * opts.height/ total_values ;
	var minValueToDrawStroke = ((data.maxValue - data.minValue ) * 0.1) + data.minValue;
	var totalLines = values[0].length;
	for(var i in values){
		
		var heightOffset = i * localValueHeight;
		var currentCM = heatmap.rownames[i];
		
		if(midCentromereOffset == -Infinity && currentCM > midCentromere){
			midCentromereOffset = heightOffset;
		}
		var g = opts.g.append('g');
		g.attr('transform',
	 'translate(0,' + heightOffset + ')');
		var rectangles = g.selectAll('rect')
		.data(values[i])
		.enter()
		.append('rect');
		var rectangleAttributes = rectangles
		.attr('x', function (d,j) { return  j * opts.valueWidth; })
		.attr('y', function (d) { return 0; })
		.attr('height', function (d) { 
			return localValueHeight - 0.5; 
		})
		.attr('width', function (d) { return opts.valueWidth -0.5; })
		.style('fill', function(d) { return opts.cols(d); })
		.style('stroke-width', function(d){
			return 0.5
		})
		.style('stroke', function(d){
			var col = opts.cols(d);
			if(d < minValueToDrawStroke && d > data.minValue){
				col = opts.cols(data.maxValue);
			}
			return  col;
		})
	}

	var chrG = opts.g.append('g');
	chrG.attr('transform', 'translate('+ (0.5 + totalLines)  * opts.valueWidth +',0)')
	chrG.append('line')
	.attr("x1", 0)
	.attr("y1", 0)
	.attr("x2", 0)
	.attr("y2", midCentromereOffset)
	.style('stroke-width',opts.valueWidth/2)
	.style('stroke-linecap', 'round')
	.style('stroke',  opts.cols(data.maxValue));

	chrG.append('line')
	.attr("x1", 0)
	.attr("y1", midCentromereOffset + (2*localValueHeight))
	.attr("x2", 0)
	.attr("y2", 0.65 * opts.height)
	.style('stroke-width', opts.valueWidth/2)
	.style('stroke-linecap', 'round')
	.style('stroke',  opts.cols(data.maxValue));

	var g = opts.g.append('g');
	g.attr('transform',
	'translate(0,' + opts.height * 0.9 + ')');
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