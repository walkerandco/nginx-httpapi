"use strict";
///////////////////////////////////////
// nginx-httpapi fileHandler class
/**
 * @author Steven Walker-Roberts
 * @version v0.0.1
 * @copyright Copyright (C) Steven Walker-Roberts 2017. MIT License.
 * @class fileHandler
 * @classdesc A class to interact with nginx virtual host configuration file.
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
    /**
     * @requires util
     * @external util
     * @see {@link https://nodejs.org/api/util.html}
     */
    this.util = require('util');
    /**
     * @requires crc
     * @external crc
     * @see {@link https://www.npmjs.com/package/crc}
     */
    this.crc = require('crc');

    /**supporting logic promisification*/
    this.fs.readFile = this.util.promisify(this.fs.readFile);
    this.fs.writeFile = this.util.promisify(this.fs.writeFile);
    this.fs.writeFile = this.util.promisify(this.fs.writeFile);
    this.fs.access = this.util.promisify(this.fs.access);
    this.fs.stat = this.util.promisify(this.fs.stat);
    this.fs.chmod = this.util.promisify(this.fs.chmod);
    this.fs.chown = this.util.promisify(this.fs.chown);

    /**
     * @property {boolean} - Debug mode flag.
     */
    this.DEBUG = global.DEBUG ? 1:0 /**|| 1*/;
  } //end of constructor

  /**
   * Reads nginx virtual host file.
   * @function readConfig
   * @param  {string} file [The nginx input configuration file.]
   * @param {string} callback [Callback function support.]
   * @return {string}      [Returns read-in data.]
   */
   async readConfig(file, callback) {
      try{ //open try
        var data = await this.fs.readFile(file, 'utf8');
        //log action if logging level of 5
        if (typeof global.LOGLEVEL !== 'undefined' && global.LOGLEVEL === 5) console.log(new Date().toISOString() + " File read successfully.");
        // log data if in debug mode
        if (this.DEBUG) console.log(data);
        // callback function
        if (callback) callback(data);
        return data;
      } catch(e) { //end of try
        console.error(new Date().toISOString() + e);
      } //end of catch
   } //end of readConfig function

   /**
    * Writes nginx configuration file.
    * @function writeConfig
    * @param  {string} file [The nginx input configuration file.]
    * @param  {string}  data [Data to be converted to raw for committal.]
    * @param {string} callback [Callback function support.]
    * @return {boolean}      [Success status.]
    */
   async writeConfig(file, data, callback) {
     try { // open try
        await this.fs.writeFile(file, data);
        //log action if logging level of 5
        if (typeof global.LOGLEVEL !== 'undefined' && global.LOGLEVEL === 5) console.log(new Date().toISOString() + " File written successfully.");
        // callback function
        if (callback) callback(1)
        return 1;
     } catch (e) { //close try
        console.error(new Date().toISOString() + e);
     } //end catch
  } //end writeConfig

/**
 * Checks whether a file exists or not.
 * @function checkExists
 * @param  {stirng}  file [The file to conduct the test against.]
 * @return {boolean}      [Writeable status.]
 */
  async checkExists(file) {
    try {
      // get file status
      let stat = await this.fs.stat(file);
      // return 1 if file found
      return 1;
    } catch (e) { //end of try
     console.error(new Date().toISOString() + e);
     return e.code;
    } //end of catch
  } //end of checkExists

  /**
   * Checks that configuration file permissions are correct.
   * @function checkPermissions
   * @param  {string} file [The nginx input configuration file.]
   * @return {string}      [Permissions value.]
   */
  async checkPermissions(file) {
    try {
      // check if the file has read/write permissions
      let stat = await this.fs.access(file, this.fs.constants.R_OK | this.fs.constants.W_OK);
      return 1;
    } catch (e) { // end of try
      console.error(new Date().toISOString() + e);
      return e.code;
    } //end of catch
  } //end of checkPermissions

  async fixPermissions(file) {
    try {
      // set file permissions to rw global
      await this.fs.chmod(file, '644');
      return 1;
    } catch (e) { //end of try
      console.error(new Date().toISOString() + e);
      return e.code;
    } //end of catch
  } //end of writePermissions

  /**
   * Checks that the process owner if the file owner.
   * @function checkOwner
   * @param  {string}  file [File path to stat against.]
   * @return {boolean}      [Permission correctness.]
   */
  async checkOwner(file) {
    try {
      // get user id and group id
      let uid = process.getuid();
      let gid = process.getgid();
      // test permissions
      let stat = await this.fs.stat(file);
      if (stat.uid === uid && stat.gid === gid) return 1;
      else return 0;
    } catch (e) { //end of try
      console.error(new Date().toISOString() + e);
      return e.code;
    } //end of catch
  } //end of checkOwner

  /**
   * Fixed the owner if permissions are incorrect.
   * @function fixOwner
   * @param  {string}  file [The file to fix permissions against.]
   * @return {boolean}      [Success status.]
   */
  async fixOwner (file) {
    try {
      await this.fs.chown(file, process.getuid(), process.getgid());
      return 1;
    } catch (e) { //end of try
      console.error(new Date().toISOString() + e);
      return e.code;
    } //end of catch
  } //end of fixOwner

  /**
   * Checks the CRC to ensure configuration is not corrupt.
   * @function checkCRC
   * @param  {string}  file [CRC'd file to compare to actual CRC value.]
   * @return {boolean}      [Success status.]
   */
  async checkCRC(file) {
    try {
      // get stored crc value
      var crcStored = await this.readConfig(file+'.crc');
      // calculate actual crc value
      var crcActual = this.crc.crc32(await this.readConfig(file)).toString(16);
      // compare values and evaluate success
      if (crcStored === crcActual) return 1;
      else return 0;
    } catch (e) { //end of try
      console.error(new Date().toISOString() + e);
      return e.code;
    } //end of catch
  } //end of checkCRC

  /**
   * Calculates and sets a crc file for a given file.
   * @function setCRC
   * @param  {string}  file [The file to set the CRC for.]
   * @return {boolean}      [Success status.]
   */
  async setCRC(file) {
    try {
      // calculate CRC
      var crcVal = this.crc.crc32(await this.readConfig(file)).toString(16);
      // write CRC to file
      await this.writeConfig(file+'.crc', crcVal);
      return 1;
    } catch (e) { //end of try
      console.error(new Date().toISOString() + e);
      return e.code;
    } //end of catch
  } //end of setCRC

} //end fileHandler

/* create a singleton instance */
/**
 * @constant
 * @type {fileHandler}
 * @desc singleton instance of fileHandler
 */
const handler = new fileHandler();
Object.freeze(handler);

/**
 * exports singleton fileHandler
 * @exports fileHandler
 */
module.exports = handler;
