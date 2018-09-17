var mongoose = require('mongoose');
var user = mongoose.Schema({
    user_id: Number,
    email: String,
    password: String,
    external_id: Number,
    create_date: Date,
    is_deleted: Number
}, { collection: 'user' }, {
    timestamps: false
});
module.exports = mongoose.model("user", user);
