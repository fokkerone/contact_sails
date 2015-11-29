# Sails Applikation

Sails_contact is a [Sails](http://sailsjs.org) application.
Demoing some aspects of the Framework.


## Installation
App currently tested on `Node -v 4.2.2`.
changes to Node version may done in .nvmrc file.
    1. npm i


## Run App
    2. npm start
If sails CLI is in global scope you may also start run it with `sails lift`


## Build Tool
Sails uses GruntJS as build task runner. All dev, run, build tasks are found in `./tasks/**/*`. To replace GruntJS with Gulp read this. [Why Gulp.js is awesome, and how to use it with Sails.js](https://www.npmjs.com/package/growl)


## Deploy App
Read [deployment](http://sailsjs.org/documentation/concepts/deployment) process description here.


## Fixtures/Dummy
On first run the Contact App loads dummy data from `./fixtures/dummy.csv`, convert it into a valid JSON String and bulk create dummy contacts against the ORM Connection (Default is localDiskDb)

## Testing
Unit Tests are writen with Mocha and Supertest and may start with `npm test`.

To get growl feedback, you need to install terminal-notifier on Mac osX `sudo gem install terminal-notifier` or read on [growl](https://www.npmjs.com/package/growl) npm page for your operation system.
