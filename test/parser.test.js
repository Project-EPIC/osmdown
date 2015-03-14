var should = require('should')()
var assert = require("assert")

var osmdown = require('../lib')

// describe('', function() {
//     this.timeout(15000);
    
//     it('should grab 3 changesets', function(done) {
//         osmFeed.get({limit:3,outFile:'return'}, osmFeed.changesets, function(res){
//             assert.equal(res.split('\n').length, 3)
//             done()
//         })

//     })

//     it('should make a csv with headers', function(done) {
//         osmFeed.get({limit:1, format:'csv',outFile:'return'}, osmFeed.changesets, function(res){
//             res.split('\n')[0].should.be.eql('ID,Title,User,Link')
//             done()
//         })

//     })
// })
