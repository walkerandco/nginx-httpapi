let path = require('path');
let assert = require('assert');
let expect = require('chai').expect;
let sinon = require('sinon');
let file = require('../../lib/handlers/fileHandler.js');


describe('fileHandler class', () => {
  describe('fileHandler readConfig function', () => {
    it('should read nginx conf file', async () => {
      try {
        let out = await  file.readConfig(path.join(__dirname, '../res')+'/nginx.conf');
        expect(out).to.not.be.null;
      } catch (e) {
        console.error(e);
        assert(false);
      }
    });
    it('should read in as containing more than 1 character', async () => {
      try {
        let out = await  file.readConfig(path.join(__dirname, '../res')+'/nginx.conf');
        expect(out.length).to.be.above(0);
      } catch (e) {
        console.error(e);
        assert(false);
      }
    });
  });

  describe('fileHandler writeConfig function', () => {
    it('should return true for a write operation', async () => {
      try {
        let out = await file.readConfig(path.join(__dirname, '../res')+'/nginx.conf');
        let truth = await file.writeConfig(path.join(__dirname, '../res')+'/nginx.conf.test', out);
        expect(truth).to.not.be.null;
      } catch (e) {
        console.error(e);
        assert(false);
      }
    });
    it('should read in a value of "nginx"', async () => {
      try {
        let out = await file.readConfig(path.join(__dirname, '../res')+'/nginx.conf.test');
        expect(out).to.match(/nginx/);
      } catch (e) {
        console.error(e);
        assert(false);
      }
    });
  });

  describe('checkExists function', () => {
    it('should return ENOENT if file does not exist', async () => {
      let out = await file.checkExists('/somefile');
      expect(out).to.eql("ENOENT");
    });

    it('should return 1 if file exists', async () => {
      let out = await file.checkExists(path.join(__dirname, '../res')+'/nginx.conf.test');
      expect(out).to.eql(1);
    });
  });

  describe('checkPermissions function', () => {
    it('should return error for --x', async () => {
      let out = await file.checkPermissions(path.join(__dirname, '../res/')+'perm.conf');
      expect(out).to.eql("EACCES");
    });

    it('should return 1 for rw- permissions', async () => {
      let out = await file.checkPermissions(path.join(__dirname, '../res')+'/nginx.conf.test');
      expect(out).to.eql(1);
    });
  });

  describe('fixPermissions function', () => {
    it('should successfully change permissions', async () => {
      let out = await file.fixPermissions(path.join(__dirname, '../res')+'/nginx.conf.test');
      expect(out).to.eql(1);
    });
  });

  describe('checkPermissions function', () => {
    it('should return 1 if permissions are correct', async () => {
      let out = await file.checkOwner(path.join(__dirname, '../res')+'/nginx.conf.test');
      expect(out).to.eql(1);
    });

    it('should return 0 if permissions are incorrect', async () => {
      let out = await file.checkOwner(path.join(__dirname, '../res/')+'perm.conf');
      expect(out).to.eql(0);
    });
  });

  describe('checkCRC function', () => {
    it('should return success for matched CRC', async () => {
      let out = await file.checkCRC(path.join(__dirname, '../res')+'/nginx.conf.test');
      expect(out).to.eql(1);
    });

    it('should return an error for unmatched CRC', async () => {
      let out = await file.checkCRC(path.join(__dirname, '../res')+'/nginx.conf');
      expect(out).to.eql(0);
    });

  });


  describe('setCRC function', () => {
    it('should sucessfully calculate and write crc', async () => {
      let out = await file.setCRC(path.join(__dirname, '../res')+'/nginx.conf.test');
      expect(out).to.eql(1);
    });
  });
});
