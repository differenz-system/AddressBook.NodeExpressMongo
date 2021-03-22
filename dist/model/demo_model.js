'use strict';
var mongoose = require('mongoose');
var person = mongoose.Schema({
    Name: String,
    Address: String
}, { collection: 'person' }, {
    timestamps: false,
    versionKey: false
});
module.exports = mongoose.model('person', person);
