# Topcoder Member Settings Micro Service

A micro service to store settings for users on topcoder.

## Getting Started

* Install [nodejs](http://nodejs.org/)
* Install [mongoDB](http://www.mongodb.org/downloads)
* Add [postman](http://www.getpostman.com/) to Chrome browser

## Deploy and Run

* Install: ``npm install``
* Start Server: ``npm start``

## Configuration
``config.js`` file contains configuration

* **MONGODB_URL** The MongoDB URL.
* **MONGODB_CONNECTION_POOL_SIZE** The MongoDB connection pool size.
* **API_PORT** The port number for API. You can override this value by setting env variable ``PORT``.
* **DEFAULT_LIMIT** The default limit for Get all calls
* **MOCK_USER_ID** The user id set in stub authentication middleware.

By default server listens on port ``4545``.

## Postman - REALLY helpful for testing but not required
Import ``postman.json`` file to Postman app (Click **Import Collection** icon).
Add new environment ``tc`` (you can use any name) and add following variables:
* ``URL`` the base url e.g. ``http://localhost:4545``

Checks [docs](http://www.getpostman.com/docs/environments) about environments for more details.


## jslint
* Run ``. lint.sh``  
(use git bash for Windows instead for default command prompt)
