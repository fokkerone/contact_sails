# Sails People/Contacts Applikation

Sails_contact is a [Sails](http://sailsjs.org) application.
Demoing some aspects of the Framework, find answers to some Question


## Installation
App currently tested on `Node -v 4.2.2`.
changes to Node version may done in .nvmrc file.

    npm run init

`npm run init` executes

    1. npm install
    2. bower install
    3. npm start to lift Sails


## Lift Sails/ Start App
    npm start
If sails CLI is in your PATH, you may also start App with `sails lift`


## Build Tool
Sails uses GruntJS as build task runner. All dev, run, build tasks are found in `./tasks/**/*`. To replace GruntJS with Gulp read this. [Why Gulp.js is awesome, and how to use it with Sails.js](https://www.npmjs.com/package/growl)


## Deploy App
Read [deployment](http://sailsjs.org/documentation/concepts/deployment) process description here.


## Fixtures/ Dummy data
On first run the Contact App loads dummy data from `./fixtures/dummy.csv`, convert it into a valid JSON String and bulk create dummy contacts against the ORM Connection (Default is localDiskDb)

## Fixtures/ Dummy data
On first run the Contact App loads dummy data from `./fixtures/dummy.csv`, convert it into a valid JSON String and bulk create dummy contacts against the ORM Connection (Default is localDiskDb)

## Unit Test
Unit Tests are writen with Mocha and Supertest and may start with `npm test`.

To get growl feedback, you need to install terminal-notifier on Mac osX `sudo gem install terminal-notifier` or read on [growl](https://www.npmjs.com/package/growl) npm page for your operation system.


## ToDos/Refactor
    1. Fix Mocha Bootstrao Bug
    2. Implement Unit Tests
    3. find Oldest People improvement (More than one was born on one date)
    4. AgeGap improvement (generic older/younger, Request Data)
    5. some responsive CSS fixes
    6. Build pipeline improvement (maybe Gulp)
    7. Move to Jade as templateEngine, ejs/HTML sucks
