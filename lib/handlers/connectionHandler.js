"use strict";
///////////////////////////////////////
// nginx-httpapi connectionHandler class
//
/**
 * @author Steven Walker-Roberts
 * @version v0.0.1
 * @copyright Copyright (C) Steven Walker-Roberts 2017. MIT License.
 * @class connectionHandler
 * @classdesc A class to manage API connections for nginx host configuration.
 * @memberof configFactory
 * @lends connectionHandler.prototype
 */
class connectionHandler {
  /**
   * Constructs connectionHandler
   * @constructor
   */
  constructor() { //open constructor
    /**
     * @requires express
     * @external express
     * @see {@Link https://expressjs.com/en/4x/api.html}
     */
    this.express = require('express');
    this.app = this.express();

    /**supporting logic promisification*/

    /**
     * @property {boolean} - Debug mode flag.
     */
    this.DEBUG = global.DEBUG ? 1:0 /**|| 1*/;
  } //end of constructor

  /**
   * Creates HTTP server to receive API requests.
   * @method init
   * @param  {number}  port [Listen on given port.]
   * @param {function} callback [Callback function.]
   * @return {HTTPServer} [Returns a HTTP server.]
   */
  async init (port, callback){
    try {
      //start server
      this.app.listen(port, () => {
        //log action if logging level of 5
        if (typeof global.LOGLEVEL !== 'undefined' && global.LOGLEVEL === 5) console.log(new Date().toISOString() + ' Server started on ${port}.');
        // callback function
        if (callback) callback();
      })
      return 1;
    } catch (e) { //end of try
      console.error(new Date().toISOString() + e);
    } //end of catch
  } // end of init method

  /**
   * Returns an instance of express and app server.
   * @method getInstance
   * @return {object}   [An object containing express instance.]
   */
  async getInstance (){
    return {express: this.express, app: this.app};
  } //end of getInstance method
} //end connectionHandler

/* create a singleton instance */
/**
 * @constant
 * @type {connectionHandler}
 * @desc Singleton instance of connectionHandler
 */
const handler = new connectionHandler();
Object.freeze(handler);

/**
 * exports singleton connectionHandler
 * @exports connectionHandler
 */
module.exports = handler;
