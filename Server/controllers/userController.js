const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
var User = require("../models/user");

router.get("/", (req, res, next) => {
  User.find((err, users) => {
    if (!err) {
      if (users) res.json(users);
      else res.send("No Users Found");
    } else {
      console.error(err);
    }
  });
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
