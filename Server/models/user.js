const mongoose = require('mongoose');

var user = mongoose.model('user', {
    userno: { type: String },
    name: { type: String },
    position: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    isadmin: { type: Boolean },
    profilepicture: { type: String }
});

module.exports = user;