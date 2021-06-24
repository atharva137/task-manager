const express = require("express");
const User = require("../models/users");

const router = new express.Router();
// using app.post for creating new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user: user, token: token});
  } catch (error) {
    res.status(400).send(error);
  }
  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user: user, token: token });
  } catch (e) {
    res.status(400).send();
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send();
  }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await findById(req.params.id);
    if (!user) {
      return res.status(404).send;
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
  // User.findById(req.params.id).then((user)=>{
  //     if(!user){
  //         return res.status(404).send();
  //     }
  //     res.send(user);
  // }).catch((e) => {
  //     res.status(500).send();
  // })
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "password", "email"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(404).send("not an valid operation");
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    user.save();
    //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     validator: true,
    //   });
    if (!user) {
      return res.status(404);
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
