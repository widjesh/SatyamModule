const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
var User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.send("Users Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error(err);
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

router.post("/", async (req, res) => {
  try {
    const pass = bcrypt.hashSync(req.body.password, 10)
    const user = new User({
      email: req.body.email,
      password: pass,
      role: 'ADMIN'
    });
    const newUser = await user.save();
    if (!newUser) {
      res.send('User Cannot be Saved');
    } else {
      res.send(user);
    }
  } catch (err) {
    console.log(err)
  }
});


router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      res.send({ message: "Auth Failed" });
    } else {
      const verify = bcrypt.compareSync(req.body.password, foundUser.password);
      if (!verify) {
        res.send({ message: "Auth Failed" });
      } else {
        const token = jwt.sign(
          {
            email: foundUser.email,
            userId: foundUser._id
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h"
          }
        );
        res.status(200).send({
          message: "Auth Successfull",
          token: token
        });
      }
    }
  } catch (err) {
    res.send({ Error: err });
  }
});

router.put("/updatepassword/:email", async (req, res) => {
  try {
    const newpass = bcrypt.hashSync(req.body.password, 10)
    const user = await User.update({ email: req.params.email }, { $set: { password: newpass } })
    if (user) res.send(`Password for ${req.params.email} Changed`)
    else res.send('Password Not Updated')
  } catch (err) {
    console.error(err)
  }
})

router.put("/updaterole/:email", async (req, res) => {
  try {
    const user = await User.updateOne({ email: req.params.email }, { $set: { role: req.body.role } })
    if (user) res.send(`Role for ${req.params.email} Updated to ${req.body.role}`)
    else res.send('Role Not Updated')
  } catch (err) {
    console.error(err)
  }
})

router.delete("/remove/:email", async (req, res) => {
  try {
    const user = await User.deleteOne({ email: req.params.email })
    console.log(user)
    if (user) res.send(`User ${req.params.email} successfully removed`)
    else res.send('Remove Unseccesful')
  } catch (err) {
    console.error(err)
  }
})

module.exports = router;
