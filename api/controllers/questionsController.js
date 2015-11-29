/**
 * QuestionsController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var async = require("async");
var moment = require("moment");

module.exports = {
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ProjectController)
     */
    _config: {},

    /**
     * Question index action. This will render a Dashboard GUI.
     *
     * @param   {Request}   request     Request object
     * @param   {Response}  response    Response object
     */
     index: function(req, res) {

       // Make parallel jobs for task edit
       async.parallel(
         {
           // Fetch task data
           question1: function(callback) {
             dataService.getPeoplebyGender({}, callback)
           },
           question2: function(callback) {
             dataService.getOldestPeople({}, callback)
           },

           question3: function(callback) {
             dataService.getAgeGapbetweenPeople({firstPerson: "Paul Robinson", secondPerson: "Bill McKnight"}, callback)
           }
         },
         /**
         * Callback function which is called after all specified parallel jobs are done.
         *
         * @param   {null|Error}    error   Error object
         * @param   {{
         *              task: sails.model.task,
         *              types: sails.model.type[],
         *              users: sails.model.users[]
         *          }}              data    Object that contains all necessary data for task edit
         */
         function(error, data) {
           if (error) {
             ResponseService.makeError(error, request, response);
           } else {
             console.log(data)
             res.view(data);
           }
         }
       );
     },


    all: function(request, response){
      People
      .find()
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
          response.view( {peoples:res} );
      });

    },

    women: function(request, response) {
      // Fetch user data
      dataService.getPeoplebyGender({}, function(error, found) {
          if (error) {
              ResponseService.makeError(error, request, response);
          } else {
              response.view( found );
          }
      });
    },

    oldest: function(request, response) {
      // Fetch user data
      dataService.getOldestPeople({}, function(error, found) {
        if (error) {
            ResponseService.makeError(error, request, response);
        } else {
            response.view({people: found} );
        }
      });
    },

    agegap: function(request, response) {
      dataService.getAgeGapbetweenPeople({firstPerson: "Paul Robinson", secondPerson: "Bill McKnight"}, function(error, found) {
        if (error) {
            ResponseService.makeError(error, request, response);
        } else {
            response.view(found);
        }
      });
    }

};
