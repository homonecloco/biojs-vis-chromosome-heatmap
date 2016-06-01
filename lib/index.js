/*
 * biojs-vis-chromosome-heatmap
 * https://github.com/homonecloco/biojs-vis-chromosome-heatmap
 *
 * Copyright (c) 2016 Ricardo H. Ramirez-Gonzalez
 * Licensed under the MIT license.
 */

/**
@class biojsvischromosomeheatmap
 */


var  biojsvischromosomeheatmap;
module.exports = biojsvischromosomeheatmap = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsvischromosomeheatmap.hello(opts.text);
};

/**
 * Private Methods
 */

/*
 * Public Methods
 */

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     biojsvischromosomeheatmap.hello('biojs');
 *
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */


biojsvischromosomeheatmap.hello = function (name) {

  return 'hello ' + name;
};

