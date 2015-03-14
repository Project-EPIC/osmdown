var should = require('should')()
var assert = require("assert")

var osmdown = require('../lib')

describe('Parser', function() {
    
    it('Should run the parse function', function(done) {
        osmdown.parse()
        done()
    })
})
