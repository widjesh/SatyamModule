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
    res.send({ Error: err });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.json(`${req.params.email} not found`);
    } else {
      res.json(user);
    }
  } catch (err) {
    res.json({ Error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      position: req.body.position,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      isadmin: req.body.isadmin
    });
    const newUser = await user.save();
    if (!newUser) {
      res.send('User Cannot be Saved');
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send({ Error: err });
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
    const user = await User.update({ email: req.params.email }, { $set: { password: bcrypt.hashSync(req.body.password, 10) } })
    if (user) res.send(`Password for ${req.params.email} Changed`)
    else res.send('Password Not Updated')
  } catch (err) {
    res.send({ Error: err });
  }
})

router.put("/updaterole/:email", async (req, res) => {
  try {
    const user = await User.updateOne({ email: req.params.email }, { $set: { isadmin: req.body.isadmin } })
    if (user) res.send(`Role for ${req.params.email} Updated to ADMIN: ${req.body.isadmin}`)
    else res.send('Role Not Updated')
  } catch (err) {
    res.send({ Error: err });
  }
})

router.delete("/remove/:email", async (req, res) => {
  try {
    const user = await User.deleteOne({ email: req.params.email })
    if (user) res.send(`User ${user.email} successfully removed`)
    else res.send('Remove Unseccesful')
  } catch (err) {
    res.send({ Error: err });
  }
})

module.exports = router;
