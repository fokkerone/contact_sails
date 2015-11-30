#!/bin/bash
# Init application
echo "Init npm"
npm install
echo "Bower install"
bower install
echo "Lift sails"
node app.js
