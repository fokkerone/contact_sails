/**
 * /api/services/dataService.js
 *
 * Generic data service, which is used to fetch generic data and call defined callback after data fetching.
 * This contains basically all data fetch that Taskboard needs. Services contains fetch of one and multiple
 * objects.
 *
 * Single object fetch:
 *  get{ObjectName}(terms, next, [noExistCheck])
 *
 * Multiple object fetch
 *  get{ObjectName}s(terms, next)
 *
 * All data service methods will write error log if some error occurs. In all cases callback function 'next'
 * is called with two arguments: possible error and actual result.
 *
 * Note that with multiple object fetch service will attach "default" sort conditions for results.
 */

var async = require("async");


/**
 * Service to fetch gender count form peoples data.
 *
 * @param   {Number|{}} option           Used query conditions
 * @param   {Function}  next            Callback function to call after query
 */
exports.getPeoplebyGender = function(option, next) {

  if (!option.gender) option.gender = 'female';
  People
    .count(option)
    .exec( function(error, res) {
        if (error){
          sails.log.error(__filename + ":" + __line + " [Failed to fetch Gender Count data]");
          sails.log.error(error);
        }
        if(!res){
          error = new Error();
          error.message = "Nothing found"
          error.status = 404;
        }
        var response = {
          count: res,
          gender: option.gender
        }
        next(error, response);
    });
}

/**
 * Service to find oldest people data.
 *
 * @param   {Number|{}} options         Used query conditions
 * @param   {Function}  next            Callback function to call after query
 */
exports.getOldestPeople = function(options, next) {
  People
    .find()
    .sort('birthdate asc')
    .limit(1)
    .where(options)
    .exec( function(error, res) {
        if (error){
          sails.log.error(__filename + ":" + __line + " [Failed to fetch oldest People data]");
          sails.log.error(error);
        }
        if(!res){
          error = new Error();
          error.message = "Nothing found"
          error.status = 404;
        }
        next(error, res[0]);
    });
}


/**
 * Service to find Find Age Gap between two People by name or id.
 *
 * @param   {Number|{}} options         Used query conditions
 * @param   {Function}  next            Callback function to call after query
 */
exports.getAgeGapbetweenPeople = function(options, next) {
  async.waterfall(
        [
            // Fetch task data
            function(callback) {
                People
                .findOneByName(options.firstPerson)
                .exec( function(error,people){
                  if (error){
                    sails.log.error(__filename + ":" + __line + " [Failed to fetch oldest People data]");
                    sails.log.error(error);
                  }
                  if(!people){
                    error = new Error();
                    error.message = "Nothing found"
                    error.status = 404;
                  }
                  callback(error, people );
                })
            },
            function(first, callback) {
              People
                .findOneByName(options.secondPerson)
                .exec( function(error,second){
                  if (error){
                    sails.log.error(__filename + ":" + __line + " [Failed to fetch oldest People data]");
                    sails.log.error(error);
                  }
                  if(!second){
                    error = new Error();
                    error.message = "Nothing found"
                    error.status = 404;
                  }

                  var response = {
                      agegap: second.getBirthdateGap(first.birthdate),
                      firstPerson: first,
                      secondPerson: second
                  }
                  callback(error, response );
                })
            }
        ],

        /**
         * Main callback function which is called after all jobs are done and processed.
         *
         * @param   {null|Error}            error   Possible error
         * @param   {sails.model.phase[]}   phases  Determined phases for task
         */
        function(error, agegap) {
            if (error) {
                sails.log.error(__filename + ":" + __line + " [Failed to fetch phases for task, check errors above]");
            }
            next(error, agegap);
        }
    );

}
