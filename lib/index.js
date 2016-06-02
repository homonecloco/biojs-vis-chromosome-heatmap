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
  console.log("The url:" + url);
  console.log(this);
  if (typeof url === 'undefined') { 
    return ;
  }
  var self = this;

  d3.json(url, function(error, json) {
    if (error) {
      console.warn(error);
      return;
    }
    
    self.data =   new dataContainer(json);
  });
};




 ChromosomeHeatmap.prototype.setDefaultOptions = function(){
 	this.opts = {
 		el: 'biojs',
 		width:2480,
 		height:3508,
 		data:''
 	}
 };


module.exports.ChromosomeHeatmap = ChromosomeHeatmap;
