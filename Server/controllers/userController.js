const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
var User = require('../models/user');

router.get('/:email',async (req,res)=>{
    const user = await User.findOne({email:req.params.email});
    res.send(user);
});

module.exports = router;