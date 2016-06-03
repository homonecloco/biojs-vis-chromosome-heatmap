var jQuery = require('jquery');
var d3 =require('d3');
var colorbrewer = require('colorbrewer');

var dataContainer = require( './dataContainer.js' );
var renderSingleHeatmap = require( './renderSingleHeatmap.js' );


/*
 * biojs-vis-chromosome-heatmap
 * https://github.com/homonecloco/biojs-vis-chromosome-heatmap
 *
 * Copyright (c) 2016 Ricardo H. Ramirez-Gonzalez
 * Licensed under the MIT license.
 */

/**
@class ChromosomeHeatmap
*/


var  ChromosomeHeatmap = function(opt){
	var self = this;
	this.setDefaultOptions();
	jQuery.extend(this.opt, opt);
	this.el = opt.el;
	this.loadData(this.opt.data);
	this.el.textContent = "Loading";
};

/**
 * Private Methods
 */




/*
* Public Methods
*/

ChromosomeHeatmap.prototype.loadData = function(url) {
	if (typeof url === 'undefined') { 
		return ;
	}
	var self = this;

	d3.json(url, function(error, json) {
		if (error) {
			console.warn(error);
			return;
		}
		self.data =   new dataContainer(json, self);
		console.log(self.data);
	});
};

ChromosomeHeatmap.prototype.render = function(){
	
	this.el.textContent = "";
	this.canvas = d3.select(this.el);
	this.canvas.append('svg:svg')

	.attr('width', this.opt.width)//canvasWidth)
	.attr('height', this.opt.height);//canvasHeight);
	this.svg = this.canvas.selectAll('svg');
	//this.svg.attr('style', 'background-color: Gainsboro;');

	this.renderTop();
	this.renderLeft();
	this.renderHeatmaps();
};

ChromosomeHeatmap.prototype.domain = function(){
    return [this.data.minValue,
     (this.data.maxValue + this.data.minValue) /2,this.data.maxValue ];
  }

ChromosomeHeatmap.prototype.rangeColor = function(){
   this.buckets = 9;
   this.colors = colorbrewer.YlGnBu[this.buckets];
   //this.colors = colorbrewer.RdBu[this.buckets];
   this.colors = [this.colors[0],this.colors[4],this.colors[8]]
   var colorScale = d3.scale
   .linear()
   .domain( this.domain())
   .range(this.colors);
   return colorScale;

 };

ChromosomeHeatmap.prototype.renderHeatmaps = function(){
	var totalHeight = this.opt.height * 0.9;
	var blockHeight = totalHeight / this.data.chromosomes.length;
	var blockWidth = (this.opt.width * 0.9 ) / this.data.genomes.length;
	var hmHeight = blockHeight * 0.9;
	var valueHeight = hmHeight/this.data.maxRows;
	var valueWidth = blockWidth/this.data.maxCols;

	var cols = this.rangeColor();

	for(var i in this.data.order){
		for(var j in this.data.order[i]){
			var currentG = this.svg.append("g");
			var offsetX =  (this.opt.width * 0.05) + ( 1.1 * blockWidth * j);
			var offsetY =  (this.opt.height * 0.1) + (blockHeight * i);
			currentG.attr('transform',
	 		'translate('+ offsetX +',' + offsetY + ')');
			var renderOpts = {
				name: this.data.order[i][j],
				g: currentG,
				width: blockWidth,
				height: blockHeight,
				valueWidth: valueWidth,
				valueHeight: valueHeight,
				cols: cols
			};


			var sg = renderSingleHeatmap(renderOpts, this.data);
		}
	}

};

ChromosomeHeatmap.prototype.renderTop = function(){
	var topHeight = 0.1 * this.opt.height;
	var topWidth = 0.8 * this.opt.width;
	var topLeftOffset = 0.05 * this.opt.width;
	this.headerGroup = this.svg.append('g');
	var headerText = this.headerGroup.append('text')
	.text(this.data.title)
	.attr('x', 0)
	.attr('y', topHeight/2)
	.attr('fill', 'black')
	.attr('font-size', topHeight/4 + 'px');
	
	var columnOffset = topWidth / this.data.genomes.length;
	var renderedTextWidth = headerText.node().getBBox().width;
	var renderedTextHeight = headerText.node().getBBox().height;
	headerText.attr('x', (topLeftOffset +( topWidth - renderedTextWidth)/2 ) + 'px')
	var genomeGroup = this.headerGroup.append('g');
	genomeGroup.attr('transform',
		'translate(' + topLeftOffset + ',' + topHeight + ')');
	var txts = genomeGroup.selectAll('text')
	.data(this.data.genomes)
	.enter()
	.append('text');
	txts.attr('x', function(d,i){return i * (columnOffset)})
	.text( function (d) { return d})
	.attr('font-size', topHeight/6 + 'px')
	.attr('fill', 'black');
	

};

ChromosomeHeatmap.prototype.renderLeft = function(){
	var topOffset = 0.12 * this.opt.height;
	var leftWidth = 0.05 * this.opt.width;

	var chromosomesGroup = this.svg.append('g');
	chromosomesGroup.attr('transform',
	 'translate(2,' + topOffset + ')');

	var yOffset = 0.9 * this.opt.height / this.data.chromosomes.length  ;

	var chromosomeLabels = chromosomesGroup.selectAll('text')
	.data(this.data.chromosomes)
	.enter()
	.append('text');

	chromosomeLabels.attr("x", 0)
	.attr("y", function(d,i){return i * yOffset})
	//.attr('font-size', topOffset/6 + 'px')
	.text(function(d){return d})
	.attr('fill', 'black');

};

ChromosomeHeatmap.prototype.setDefaultOptions = function(){
	this.opt = {
		el: 'biojs',
		width:2480,
		height:3508,
		data:''
	}
};


module.exports.ChromosomeHeatmap = ChromosomeHeatmap;
