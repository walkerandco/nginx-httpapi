var assert = require('assert');
var test = require('jasmine');
var file = require('/home/swr/git/nginx-httpapi/server.min.js');

describe('testsum function', function() {
  it('returns the sum of both params', function() {
    expect(file.testsum(1, 2)).toBe(3);
  });
  it('returns the sum of both params', function() {
    expect(file.testsum(3, 4)).toBe(7);
  });
});
