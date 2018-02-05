var assert = require('assert');
var test = require('jasmine');
var file = require('/home/swr/git/nginx-httpapi/lib/handlers/fileHandler.js');


describe('fileHandler readConfig function', () => {
  let out = file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf');
  it('should read nginx conf file', () => {
    expect(out).toBeTruthy();
  });
  it('should read in as containing more than 1 character', () => {
    expect(out.toString().length).toBeGreaterThan(1);
  });
});

describe('fileHandler writeConfig function', () => {
  beforeEach(() => {
    file.writeConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf.test', "test");
  });
  it('should read in a value of "test"', () => {
    try {
      file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf.test', (out) => {expect(out).toContain("test")});
    } catch (e) {
      console.error(e);
    }
  });
});
