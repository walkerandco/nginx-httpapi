const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');
const file = require('/home/swr/git/nginx-httpapi/lib/handlers/fileHandler.js');


describe('fileHandler readConfig function', () => {
  it('should read nginx conf file', async () => {
    try {
      const out = await  file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf');
      expect(out).to.not.be.null;
    } catch (e) {
      console.error(e);
      assert(false);
    }
  });
  it('should read in as containing more than 1 character', async () => {
    try {
      const out = await  file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf');
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
      const out = await file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf');
      const truth = await file.writeConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf.test', out);
      expect(truth).to.not.be.null;
    } catch (e) {
      console.error(e);
      assert(false);
    }
  });
  it('should read in a value of "nginx"', async () => {
    try {
      const out = await file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf.test');
      expect(out).to.match(/nginx/);
    } catch (e) {
      console.error(e);
      assert(false);
    }
  });
});
