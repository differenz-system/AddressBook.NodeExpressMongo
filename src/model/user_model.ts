'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    // user_id: Schema.Types.ObjectId,
    email: String,
    password: String,
    create_date: Date,
    is_deleted: Number
},
    { collection: 'user' },
    {
        timestamps: false
    });
module.exports = mongoose.model("user", user);

