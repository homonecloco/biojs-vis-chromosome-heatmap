var jQuery = require('jquery');
var d3 =require('d3');
var dataContainer = require( "./dataContainer.js" );
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


var  ChromosomeHeatmap = function(opts){
	var self = this;
	this.setDefaultOptions();
	jQuery.extend(this.opts, opts);
	this.el = opts.el;
	this.loadData(this.opts.data);
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

  });
};

ChromosomeHeatmap.prototype.render = function(){
  this.el.textContent = "";
  var canvas = d3.select(this.el);
  canvas.append("svg:svg")
      .attr("width", this.opts.width)//canvasWidth)
      .attr("height", this.opts.height);//canvasHeight);
  console.log(canvas);
  var svg = canvas.selectAll("svg")[0];
  svg.append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");
}


 ChromosomeHeatmap.prototype.setDefaultOptions = function(){
 	this.opts = {
 		el: 'biojs',
 		width:2480,
 		height:3508,
 		data:''
 	}
 };


module.exports.ChromosomeHeatmap = ChromosomeHeatmap;
