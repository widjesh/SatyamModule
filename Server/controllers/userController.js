const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
var User = require('../models/user');

router.get('/users', (req, res, next) => {
    User.find((err, users) => {
        if (!err) {
            if (users) res.json(users)
            else res.send('No Users Found')
        } else {
            console.error(err)
        }
    })
})

router.get('/users/:email', (req, res, next) => {
    const email = req.params.email
    User.findOne({ email: email }, (err, user) => {
        if (!err) {
            if (user) res.json(user)
            else res.send(`User with id ${email} not found`)
        } else {
            console.error(err)
        }
    })
})

router.get('/:email', async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    res.send(user);
});


module.exports = router;