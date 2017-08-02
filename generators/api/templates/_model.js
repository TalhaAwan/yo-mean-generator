'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema =  mongoose.Schema;

var <%= nameCamelCase %>Schema = new Schema({
  name: String
});

module.exports = mongoose.model('<%= nameCamelCase %>', <%= nameCamelCase %>Schema);
