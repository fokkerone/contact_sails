/**
* Bootstrap
* (sails.config.bootstrap)
*
* An asynchronous bootstrap function that runs before your Sails app gets lifted.
* This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
*
* For more information on bootstrapping your app, check out:
* http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
*/

var Converter = require("csvtojson").Converter;
var fs = require("fs");

module.exports.bootstrap = function(cb) {

  /**
  * Convert CSV 2 JSON
  *
  * @migrate: alter -global setting found in /config/models.js-
  * @DB-Adapter: localDiskDb
  **/
  var csv2json = function (callback, csvfile){
    var converter = new Converter({
      noheader:true,                                                            // true if firstline in csv isn´t the header row
      headers:['name', 'gender', 'birthdate']                                   // header -> api/models/Contact.attributes
    });

    converter.on("error",function(errMsg,errData){
      return callback(errMsg);
    });

    //end_parsed will be emitted once parsing finished
    converter.on('end_parsed', function (jsonArray) {
      return callback("", jsonArray);
    });

    fs.createReadStream(csvfile)
      .on('error', function(err){
        return callback(err);
      })
      .pipe(converter);
  }


  /**
  * Create Dummy Contacts from converted CSV File  *
  **/
  var create_people = function(err, contacts_obj){
    if(err) return cb(err);
    sails.log.debug("Create Fixtures")
    People.create(contacts_obj).exec(cb);
  }

  /**
  * Import Fixture File to DB
  *
  * @migrate: alter -global setting found in /config/models.js-
  * @DB-Adapter: localDiskDb
  **/
  People.count().exec(function(err, count) {
    if(err) {
      sails.log.error('Fixtures could not loaded');
      return cb(err);
    }

    if(count > 0){
      sails.log.info("Fixtures exits. To drop 'rm .tmp/localDiskDb.db'");
      return cb();
    };

    sails.log.debug('########################################################');
    sails.log.debug('##############  Import Fixtures ########################');
    csv2json(create_people, './fixtures/dummy.csv');
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //cb();
};
