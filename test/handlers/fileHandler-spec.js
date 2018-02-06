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
  var out;
  beforeEach((done) => {
    file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf').then((data) => {
      out = data;
      done();
    });
  });
  it('should return true for a write operation', (done) => {
    file.writeConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf.test', out, (truth) => {
      expect(truth).toBeTruthy();
      done();
    })
  }, 2000);
  it('should read in a value of "nginx"', (done) => {
    try {
      file.readConfig('/home/swr/git/nginx-httpapi/test/res/nginx.conf.test', () => {
        expect(out).toContain("nginx");
        done();
      });
    } catch (e) {
      console.error(e);
    }
  }, 2000);
});
