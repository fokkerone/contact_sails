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
var async  = require("async");
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
     *          data    Object that contains all necessary data for Dashboard
     * @param   {{
     *              agegap: Number,
     *              firstPerson: sails.model.People,
     *              secondPerson: sails.model.People,
     *          }}
     */
     function(error, data) {
       if (error) {
         ResponseService.makeError(error, request, response);
       } else {
         res.view(data);
       }
     }
    );
  },


  /**
  * Question all action. This will render complete Contact List
  *
  * route: '/questions/all
  *
  * @param   {Request}   request     Request object
  * @param   {Response}  response    Response object
  */
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


  /**
   * Question all action. This will render complete Contact List
   *
   * route: '/questions/1'
   *
   * @param   {Request}   request     Request object
   * @param   {Response}  response    Response object
   *
   */

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

  /**
   * Question all action. This will render complete Contact List
   *
   * route: '/questions/2'
   *
   * @param   {Request}   request     Request object
   * @param   {Response}  response    Response object
   *
   */
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

  /**
   * Question all action. This will render complete Contact List
   *
   * route: '/questions/3'
   *
   * @param   {Request}   request     Request object
   * @param   {Response}  response    Response object
   *
   */
  agegap: function(request, response) {
    console.log(request.query)
    if (!request.query.firstPerson && !request.query.secondPerson) _.extend(request.query, {firstPerson: "Paul Robinson", secondPerson: "Bill McKnight"})
    dataService.getAgeGapbetweenPeople(request.query, function(error, found) {
      if (error) {
          ResponseService.makeError(error, request, response);
      } else {
          response.view(found);
      }
    });
  }
};
