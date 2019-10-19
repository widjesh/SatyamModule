const mongoose = require('mongoose');

var user = mongoose.model('user', {
    email: { type: String },
    password: { type: String },
    role: { type: String }
});

module.exports = user;