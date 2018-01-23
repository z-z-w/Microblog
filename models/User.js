var mongoose = require('mongoose');
var usersSchema = require('../Schema/users');

module.exports = mongoose.model('User', usersSchema);