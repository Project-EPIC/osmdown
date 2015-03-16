var should = require('should')()
var assert = require("assert")

var osmdown = require('../lib')

describe('Render', function() {

  var site_data = { title: 'Nic-Test', email: 'test_user@osm-history2.com', start_date: '2010-01-01',   end_date: '2010-12-31',   bbox: '-86.354212,12.084238,-86.133199,12.191113',   blocks:    [ { type: 'markdown',        content: '\n\nSample OSMDOWN FILE\n===================\n\n#Yahoo, this is a test of what works and what doesn\'t work!\n\n' },      { type: 'code', content: '\nvar x = [0,1,2,3,4,5]\n' },      { type: 'markdown',        content: '\n\n\n\nMore markdown down here, this should be a paragraph.\n\n> Here I\'m going to quote something\n\nAnd here I\'ll say what that quote was about and who wrote it.\n\n' },      { type: 'code', content: '\nvar y = x.length\nvar z = y*y\n' },      { type: 'markdown', content: '\n\nThat was an example of doing javascript in the code block, now I want to use that data here.\n\nCan I reference z = {{ z }}?\n\n##Totally cool -- it actually works, neat!\n\n' }]}

    it('Should rener a simple sample config', function(done) {
      osmdown.render(site_data) //this needs to actually test something
      done()
    })
})
