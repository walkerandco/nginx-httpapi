var assert = require('assert');
var test = require('jasmine');
var file = require('/home/swr/git/nginx-httpapi/lib/handlers/fileHandler.min.js');

describe('fileHandler readConfig function', () => {
  const out = file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf');
  it('should read nginx conf file', () => {
    expect(out).toBeTruthy();
  });
  it('should read in as containing more than 1 character', () => {
    expect(out.toString().length).toBeGreaterThan(1);
  });
});
