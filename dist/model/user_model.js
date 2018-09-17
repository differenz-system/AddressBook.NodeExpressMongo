'use strict';
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var user = mongoose.Schema({
    user_id: {
        type: Number,
        unique: true
    },
    email: String,
    password: String,
    external_id: Number,
    create_date: Date,
    is_deleted: Number
}, { collection: 'user' }, {
    timestamps: false
});
user.index({ "email": 1 }, { unique: true });
user.plugin(uniqueValidator);
module.exports = mongoose.model("user", user);
