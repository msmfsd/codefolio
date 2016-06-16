// TODO: write tests for async and react test etc.
const chai = require('chai')
const assert = chai.assert

describe('Array', function() {
  it('should start empty', function() {
    let arr = []

    assert.equal(arr.length, 0, 'Array length was not 0')
  })
})

describe('Object', function() {
  it('should be an object', function() {
    let obj = { }

    assert.equal(typeof obj, 'object', 'variable obj was not of type object')
  })
})
