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
 * @lends fileHandler.prototype
 */
class fileHandler {
  /**
   * Constructs fileHandler
   * @constructor
   */
  constructor() { //open constructor
    /**
     * @requires fs
     * @external fs
     * @see {@link https://nodejs.org/api/fs.html}
     */
    this.fs = require('fs');
    /**,
     * @propertye {boolean} - Debug mode flag.
     */
    this.DEBUG = process.argv[2].debug ? 1:0 /**|| 1*/;
  } //end of constructor

  /**
   * Reads nginx virtual host file.
   * @function readConfig
   * @param  {string} file [The nginx input configuration file.]
   * @param {string} callback [Callback function support.]
   * @return {string}      [Returns read-in data.]
   */
   async readConfig(file, callback) {
     this.fs.readFile(file, 'utf8', async (err, data) => {
       try{ //open try
         //handle error
         if (err) throw error(new Date().toISOString() + err);
         //log action
         else console.log(new Date().toISOString() + " File read successfully.");
         if (this.DEBUG) console.log(await data);
         // callback function
         if (callback) callback(data);
         return await data;
       } catch(e) { //end of try
         console.error(e);
       } //end of catch
     }); //end of fs.readFile
   } //end of readConfig function

   /**
    * Writes nginx configuration file.
    * @function writeConfig
    * @param  {string}  data [Data to be converted to raw for committal.]
    * @param {string} callback [Callback function support.]
    * @return {boolean}      [Success status.]
    */
   async writeConfig(file, data, callback) {
     try { // open try
       this.fs.writeFile(file, data, async (err) => {
         //handle error
         if (err) throw error(new Date().toISOString() + err);
         //log action
         else console.log(new Date().toISOString() + " File written successfully.");
         // callback function
         if (callback) callback(1)
         return 1;
       }); //end of fs.writeFile
     } catch (e) { //close try
      console.error(e);
    } //end catch
  } //end writeConfig
} //end fileHandler

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
