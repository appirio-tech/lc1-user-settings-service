# Fast 72hrs!!! Member Settings Service - Savable Search API - Add Security and Authorization
This challenge adds security using ``helmet`` module and authorization using custom middleware and ``express-jwt``. Info of the challenge can be found [here](http://www.topcoder.com/challenge-details/30046766/?type=develop).

### Deployment and Configuration
See ``readme.md``.

### Verification
This challenge requires Postman plugin for verifying authorization works. See ``readme.md`` to get a general idea on how to add [postman](http://www.getpostman.com/), import collection and environment, and change [environment variable](http://www.getpostman.com/docs/environments). But here is a detailed step-by-step on how to verify the challenge submission:

1. Add [postman plugin](http://www.getpostman.com/) to your favorite browser. Open it.
2. Import collection by clicking Import Collection icon. Use ``test_files/postman.json`` for the imported collection.
3. Import postman environment by clicking ``drop-down arrow beside the eye icon > Manage Environments > Import``. Use ``test_files/postman_environment.json`` for the imported environment.
4. If you just want to test authorization methods, you can just use Create requests for each method. If there is no error, it should return the created search. You can verify the created search is present by using Get All requests.
5. The database is initially empty, so if you want to test Get, Update, and Delete, you have to do Create request first. Then, set ``SEARCH_ID`` in postman environment variable to the id of the created search.
6. You can also test authorization failure by changing the tokens in postman environment variable.

### Changelog
Base Code: [https://github.com/appirio-tech/lc1-user-settings-service](https://github.com/appirio-tech/lc1-user-settings-service)

Latest Challenge: [Fast 72hrs!!! Member Settings Service - Savable Search API - Add Security and Authorization v1.0](http://www.topcoder.com/challenge-details/30046766/?type=develop)

Changed Files:

* **config.js** Remove ``MOCK_USER_ID`` and add some authorization configurations.
* **package.json** Add request, helmet, and express-jwt dependencies.
* **readme.md** Update readme to include Authorization Configuration section.
* **server.js** Remove stub authentication. Add helmet and authorization to middleware stack.

Added Files:

* **helpers/authorization.js** Authorization custom middleware. All authorization logic are handled here.
* **errors/NotAuthorizedError.js** Define error for not authorized error.
* **docs/changelog.md** Changelog file.
* **test_files/postman.json** Postman test json file. It's moved from parent directory.
* **test_files/postman_environment.json** Postman environment json file.
