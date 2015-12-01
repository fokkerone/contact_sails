describe('All the People', function() {
  it ('should not be empty', function(done) {
    People.find().exec(function(err, peoples) {
      peoples.length.should.be.eql(fixtures['people'].length);
      done();
    });
  });

  it ('The Oldest', function(done) {
    dataService.getOldestPeople({}, function(error, people) {
      people.name.should.be.equal('Bill McKnight')
      done();
    });
  });

  it ('Woman count', function(done) {
    dataService.getPeoplebyGender({}, function(error, people) {
      people.count.should.be.equal(1)
      done();
    });
  });

  it ('gender count', function(done) {
    dataService.getPeoplebyGender({gender: 'male'}, function(error, people) {
      people.count.should.be.equal(2)
      done();
    });
  });

  it ('age gap', function(done) {
    dataService.getAgeGapbetweenPeople({firstPerson: "Paul Robinson", secondPerson: "Bill McKnight"}, function(error, res) {
      res.agegap.should.be.equal(2862)
      done();
    });
  });

  it ('One', function(done) {
    People
    .findOneById(1)
    .exec( function(error, res){
      res.name.should.be.equal(fixtures['people'][0].name)
      done();
    });
  });
});
