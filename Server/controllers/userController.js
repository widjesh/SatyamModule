const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
var User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.find()
    if (!user) {
      res.send('Users Not Found')
    } else {
      res.send(user)
    }
  } catch (err) {
    console.error(err)
  }

});

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.send(`${req.params.email} not found`);
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send({ err });
  }
});



module.exports = router;
