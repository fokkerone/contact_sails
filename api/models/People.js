/**
* People.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment');

module.exports = {
  types: {
    gender: function(str){
      return  _.contains(['male', 'female'], str)
    }
  },
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    gender: {
      type: 'string',
      gender: true,
      required: true
    },
    birthdate: {
      type: 'date',
      required: true
    },

    getBirthdateGap: function(date){
      var birthdatePersonA = moment(date);
      var birthdatePersonB = moment(this.birthdate)
      return Math.abs( birthdatePersonB.diff(birthdatePersonA, 'days'))
    }
  },

  /*########  Callbacks ##############*/
  validationMessages: {
    name: {
      required: 'Name is required'
    },
    gender: {
      required: 'Gender is required',
      gender: 'Gender is not valid. Please use male/female'
    },
    birthdate: {
      required: 'Date is required',
      date: 'Birthdate is not valid use DD/MM/YY'
    }
  },


  /*########  Callbacks ##############
  * Lifecycle callbacks are functions that are automagically called before or after certain model actions
  **/
  beforeValidate: function (values, cb) {
    if (values.gender)
      values.gender = values.gender.toLowerCase();
    if (values.birthdate)
      values.birthdate = moment.utc(values.birthdate, "DD/MM/YY")._d;
    cb();
  },
};
