"use strict";

exports.getall =  function (req, res) {
    res.json({ message: 'Will return all searches based on the user key' });
};

exports.get = function (req, res) {
    res.json({ message: 'Will return a single search based on the id provided' });
};

exports.post = function (req, res) {
    res.json({ message: 'Will create a search based on the json provided' });
};

exports.put = function (req, res) {
    res.json({ message: 'Will replace a search with matching id with the json provided !' });
};

exports.delete = function (req, res) {
    res.json({ message: 'Will remove the search with matching id !' });
};