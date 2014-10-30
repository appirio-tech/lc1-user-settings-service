# Topcoder Member Settings Service

A service to store settings for users on topcoder.

## Getting Started

* Install [nodejs](http://nodejs.org/)
* Install [mongoDB](http://www.mongodb.org/downloads)
* Add [postman](http://www.getpostman.com/) to Chrome browser

## Deploy and Run

* Start MongoDB Server
* Install: ``npm install``
* Start Server: ``npm start``

## Configuration
``config.js`` file contains configuration

* **MONGODB_URL** The MongoDB URL.
* **MONGODB_CONNECTION_POOL_SIZE** The MongoDB connection pool size.
* **API_PORT** The port number for API. You can override this value by setting env variable ``PORT``.
* **DEFAULT_LIMIT** The default limit for Get all calls

By default server listens on port ``4545``.

## Authorization Configuration
In ``config.js`` there are some authorization configurations contained in **AUTHORIZATION**.

* **USED_METHOD** Authorization method. Currently, there are 2 possible values for this, which are ``API`` and ``LOCAL``.
* **API.URL** Only used if ``USED_METHOD: "API"``. This determines the URL of the API used to authorize incoming requests.
* **LOCAL.USE_DUMMY_KEY** Only used if ``USED_METHOD: "LOCAL"``. If this is set to true, the key used to decrypt authorization header will be overridden by a dummy key.
* **LOCAL.REAL_KEY** Only used if ``USED_METHOD: "LOCAL"`` and ``USE_DUMMY_KEY: false``. This represents the key used to decrypt JWT Token in the request authorization header. This is temporarily filled for testing.
* **LOCAL.DUMMY_KEY** Only used if ``USED_METHOD: "LOCAL"`` and ``USE_DUMMY_KEY: true``. This also represents the key used to decrypt JWT Token in the request authorization header, but for testing only.

## Manual Testing
Import ``test_files/postman.json`` file to Postman app (Click **Import Collection** icon).
Import ``test_files/postman_environment.json`` file to Postman app (Click drop-down arrow beside the eye icon > Manage Environments > Import).

All requests are testable as long as mongodb is up and running. But to test requests with specific **{{SEARCH_ID}}**, you have to change the following environment variable:

* ``SEARCH_ID``. This must be changed with the id you get after creating a new search. This is unique and randomly-generated for each request, so it will be changed at least 3 times to test all authorization methods (API, LOCAL with dummy token, LOCAL with real token) since each method has their own compatible token.

Checks [docs](http://www.getpostman.com/docs/environments) about environments for more details.

## Changelog and Detailed Deployment
Please check ``docs`` to find changelog and detailed deployments.

## jslint
* Run ``. lint.sh``  
(use git bash for Windows instead for default command prompt)
