var should = require('should');
(5).should.be.exactly(5).and.be.a.Number()

var should = require('should');

var user = {
  name: 'tj',
  pets: ['a', 'b', 'b', 'd']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4
)

var newUser = Object.create(null);
newUser.name = 'tj';
should(newUser).have.property('name', 'tj')

should(null).not.be.ok();

