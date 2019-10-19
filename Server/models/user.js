const mongoose = require('mongoose');

var user = mongoose.model('user', {
    name: { type: String },
    position: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    isadmin: { type: Boolean }
});

module.exports = user;