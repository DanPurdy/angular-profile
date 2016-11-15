# angular-profile

[![Build Status](https://travis-ci.org/DanPurdy/angular-profile.svg?branch=develop)](https://travis-ci.org/DanPurdy/angular-profile)

An AngularJs 1.5 Login/profile application

This application is a client to the API located at https://github.com/DanPurdy/node-api

The app utilises

* Angular 1.5
* ES6 (babel transpiling)
* Karma & Mocha/sinon/chai for tests
* Webpack for building
* Eslint
* Sass-lint
* Restangular
* Local Storage
* JWT
* UI-router

**Browser Support**

Tested with
* Chrome - OSX
* Canary - OSX
* Safari - OSX

> Due to the restriction on self signed certificates for remote resources in Firefox the API suggested will fail to work without first whitelisting the certificate. Using a legitimate certificate will remove this hurdle.

Functionally untested on Windows

## Setup

### Install the dependencies

`npm install`

### Check the config

The application uses webpack as its module buidler/bundler. The settings can be found for separate environments in the root of the project.

`webpack.ENV.config.js` where ENV is currently dev or production.

For the purposes of using the tool currently the default dev environment will be fine. The production env adds extra functionality such as uglifying the source and stripping console.logs/errors out of the app among other things.

### Start the development environment

`npm run devserver`

navigate to https://localhost:8000/login to use the application

## Project Structure

The application is fully built utilising the AngularJs 1.5 components. I've split them into two categories. View components and logic components.

#### Components

**View Components**
View components are located in `app/components`. They are designed to handle no application logic excluding that which is critical for the functioning of that individual component. They no nothing about the application as a whole and only receive display and then dispatch data using the component bindings ('<' & '&').

#### Core

`app/core` contains much of the application interaction with the outside world.

**Constants**

Constants contain the application specific constants and provide an easy way to update the application in the future to use other API's or setups.

**Model**

The model folder contains a model for each data type found within the system, each model extends from its base abstract class which includes certain reuseable logic, whereas each individual model will contain data type specific functionality. The models are where data manipulation and caching/storage happens.

**Resources**

Each resource file inherits again from a base abstract resource class which contains the standard GET, PUT, POST request functionality. Each resource file extends this with extra route specific functionality such as `GET api/user/23`. The resources are the only place where the application should interact with an external API.

**Services**

Services include functionality that can be used in many places within the system, in this application they're mainly used for error handling and authentication purposes so as to keep the app DRY.

#### Routes

`app/routes` contains all of the routes and application structure itself. Each section of the application is its own module which then uses components to contain the logic and display of the app. For example these components will interact directly with the Models described above and hand this data directly to the view components for display. The only display that each of these route components will handle is basic page structure and titles and then view components themselves.

#### Styles

System wide styles will be included here. I've used the structure of a Front End Framework I built alongside [Ben Griffith](https://github.com/bgriffith) called [Echo Base](https://github.com/loftdigital/echo-base). We used this framework with much success at a previous company Loft Digital.


## Running the tests

`npm test` or for livereloading `npm run test:dev` The karma chrome driver is included too you just need to uncomment Chrome in the `karma.conf.js` file in the root of the project. Tests will be default run on PhantomJs.
