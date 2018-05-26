"use strict";
///////////////////////////////////////
// nginx-httpapi api class
//
/**
 * @author Steven Walker-Roberts
 * @version v0.0.1
 * @copyright Copyright (C) Steven Walker-Roberts 2017. MIT License.
 * @class api
 * @classdesc A class to manage API connections for nginx host configuration.
 * @memberof connectionHandler
 * @lends api.prototype
 */
class api extends connectionHandler {
  /**
   * Constructs api
   * @method constructor
   */
  constructor() { //open constructor
    super();

    /**supporting logic promisification*/

    /**
     * @property {boolean} - Debug mode flag.
     */
    this.DEBUG = global.DEBUG ? 1:0 /**|| 1*/;
  } //end of constructor

  async instantiateApi(){
    // index of backends
    this.app.use('/backends', (req, res) => {

    })
  } //end of instantiateApi method
} //end api

/* create a singleton instance */
/**
 * @constant
 * @type {api}
 * @desc Singleton instance of api
 */
const handler = new api();
Object.freeze(handler);

/**
 * exports singleton api
 * @exports api
 */
module.exports = handler;
