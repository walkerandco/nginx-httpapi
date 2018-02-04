"use strict";
///////////////////////////////////////
// nginx-httpapi fileHandler class
/**
 * @author Steven Walker-Roberts
 * @version v0.0.1
 * @copyright Copyright (C) Steven Walker-Roberts 2017. MIT License.
 * @class fileHandler
 * @classdesc A class to interact wit nginx virtual host configuration.
 * @memberof configFactory
 */
class fileHandler {
  /**
   * Constructs fileHandler
   * @constructor
   */
  constructor() {
    /**
     * @requires fs
     * @external fs
     * @see {@link https://nodejs.org/api/fs.html}
     */
    this.fs = require('fs');
    /**
     * @propertye {boolean} - Debug mode flag.
     */
    this.DEBUG = process.argv[2].debug ? 1:0 /**|| 1*/;
  }

  /**
   * Reads nginx virtual host file.
   * @function readConfig
   * @param  {string} file [The nginx input configuration file.]
   * @return {string}      [Returns read-in data.]
   */
    async readConfig(file) {
      this.fs.readFile(file, 'utf8', async (err, data) => {
        //handle error
        if (err) error(err);
        //log action
        else console.log("File read successfully");
        if (this.DEBUG) console.log(data);
        return await data;
      });
    }
}

/* create a singleton instance */
/**
 * @constant
 * @type {fileHandler}
 * @desc singleton instance of fileHandler
 */
const reader = new fileHandler();
Object.freeze(reader);

/**
 * exports singleton fileHandler
 * @exports fileHandler
 */
module.exports = reader;
