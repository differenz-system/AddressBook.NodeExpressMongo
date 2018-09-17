'use strict';

var mongoose  = require('mongoose');

var address = mongoose.Schema({
    address_id: Number,
    name: String,
    email: String,
    contact_number: String,
    is_active: String,
    create_date: String,
    user_id: Number,
    is_deleted: Number

},
{ collection: 'addresses' },
 {
    timestamps: false
});

module.exports = mongoose.model('address', address);