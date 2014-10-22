#!/bin/bash

./node_modules/.bin/jslint  -nomen \
controllers/**/*.js \
errors/**/*.js \
helpers/**/*.js \
models/**/*.js \
config.js \
server.js
