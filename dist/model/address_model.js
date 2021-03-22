'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var address = new Schema({
    name: String,
    email: String,
    contact_number: String,
    is_active: String,
    create_date: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    is_deleted: Number
}, { collection: 'address' }, {
    timestamps: false
});
module.exports = mongoose.model('address', address);
