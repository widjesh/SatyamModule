const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
var User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.json({ message: "Users Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.json({ Error: err });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.json({ message: `${req.params.email} not found` });
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
      userno: new ObjectId(),
      name: req.body.name,
      position: req.body.position,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 10),
      isadmin: req.body.isadmin
    });
    const newUser = await user.save();
    if (!newUser) {
      res.json({ message: 'User Cannot be Saved' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.json({ Error: err });
  }
});


router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      res.json({ message: "Auth Failed" });
    } else {
      const verify = bcrypt.compareSync(req.body.password, foundUser.password);
      if (!verify) {
        res.json({ message: "Auth Failed" });
      } else {
        const token = jwt.sign(
          {
            email: foundUser.email,
            isadmin: foundUser.isadmin,
            userno: foundUser.userno
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h"
          }
        );
        res.status(200).json({
          message: "Auth Successfull",
          name: foundUser.name,
          token: token
        });
      }
    }
  } catch (err) {
    res.send({ Error: err });
  }
});

router.patch("/updatepassword/:email", async (req, res) => {
  try {
    const user = await User.update({ email: req.params.email }, { $set: { password: bcrypt.hashSync(req.body.password, 10) } })
    if (user) res.json({ message: `Password for ${req.params.email} Changed` })
    else res.json({ message: 'Password Not Updated' })
  } catch (err) {
    res.json({ Error: err });
  }
})

router.patch("/updaterole/:email", async (req, res) => {
  try {
    const user = await User.updateOne({ email: req.params.email }, { $set: { isadmin: req.body.isadmin } })
    if (user) res.json({ message: `Role for ${req.params.email} Updated to ADMIN: ${req.body.isadmin}` })
    else res.json({ message: 'Role Not Updated' })
  } catch (err) {
    res.json({ Error: err });
  }
})

router.delete("/remove/:email", async (req, res) => {
  try {
    const user = await User.deleteOne({ email: req.params.email })
    if (user.deletedCount === 0) res.json({ message: `User ${req.params.email} not found` })
    else if (user.deletedCount === 1) res.json({ message: `User ${req.params.email} successfully removed` })
    else res.json({ message: 'Remove Unseccesful' })
  } catch (err) {
    res.json({ Error: err });
  }
})

module.exports = router;
