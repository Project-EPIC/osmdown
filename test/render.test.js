var should = require('should')()
var assert = require("assert")

var osmdown = require('../lib')

describe('Render', function() {

    it('Should render a simple piece of Markdown', function(done) {
        osmdown.render('blah').should.equal('<p>blah</p>\n')
        done()
    })

    it('Should read a sample file and create the ')
})
