/**
 * Lodash mixins for generic functions for New York Magazine.
 *
 * File format inspired by lodash-deep.
 * @license MIT
 */
(function(root, factory){
  if(typeof define === 'function' && define.amd){
    // AMD. Register as an anonymous module.
    define(['lodash'], factory);
  }
  else if(typeof exports === 'object'){
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('lodash').runInContext());
  }
  else{
    // Browser globals (root is window)
    root._.mixin(factory(root._));
  }
}(this, function(_, undefined){
  'use strict';

  var mixins = /** @lends _ */ {

    /**
     * Maps the first row to become the property names of every following row, returning a list of maps.
     *
     * Example:  [['a', 'b'], ['c', 'd']] becomes {a: 'c', b: 'd'}
     * @param {[[]]} list    rows containing columns as arrays
     * @returns {[{}]}  rows containing columns as objects
     */
    mapToHeaders: function (list) {
      if (!_.isArray(list)) {
        throw new Error('first parameter must be array');
      }
      if (list.length < 1) {
        throw new Error('first parameter must have at least one row (headers)');
      }

      var headers = _.map(list.shift(), function (header, index) {
        if (header === null) {
          throw new Error('Missing header name of column ' + index);
        }
        return _.camelCase(header.toString());
      });

      return _.map(list, function (row) {
        return _.reduce(headers, function (obj, header, index) {
          obj[header] = row[index];
          return obj;
        }, {});
      });
    },

    /**
     * Returns function that takes a collection of objects and returns them mapped by a property name. Used in
     * conjunction with promises. If list of items is an object, it will pretend it was given an array with the values
     * of the object.
     *
     * Example: [{'name': 'a', thing: 'b'}, {'name': 'c', thing: 'd'}] becomes
     *   { a: {'name': 'a', thing: 'b'}, c: {'name': 'c', thing: 'd'} }
     *
     * @param {string} indexName
     * @returns {Function}
     */
    indexBy: function (indexName) {
      return function (items) {
        return _.indexBy(items, indexName);
      };
    },

    /**
     * Returns a function that returns object without certain properties. Used in conjunction with promises.
     *
     * @example Promise.resolve({a: b, c: d, e: f}).then(omitNamedRows('c', 'e'))
     *
     * Same as:
     *
     * function () {
     *   var names = arguments;
     *   return function (map) {
     *     return _.omit(map, names);
     *   };
     * }
     *
     * @returns {Function}
     */
    omitNamedRows: _.partial.bind(null, _.omit, _),

    /**
     * Returns a function that returns object with only certain properties. Used in conjunction with promises.
     *
     * @example Promise.resolve({a: b, c: d, e: f}).then(pickNamedRows('c', 'e'))
     *
     * Same as:
     *
     * function () {
     *   var names = arguments;
     *   return function (map) {
     *     return _.pick(map, names);
     *   };
     * }
     *
     * @returns {Function}
     */
    pickNamedRows: _.partial.bind(null, _.pick, _),

    /**
     * Takes an object that contains other objects, and flips the keys of the object and the inner object
     * @param {{}} map
     * @returns {{}}
     */
    invertKeys: function (map) {
      return _.reduce(map, function (obj, innerObj, key) {
        _.each(innerObj, function (value, innerKey) {
          obj[innerKey] = obj[innerKey] || {};
          obj[innerKey][key] = value;
        });
        return obj;
      }, {});
    }
  };

  _.mixin(mixins);
  return mixins;
}));
