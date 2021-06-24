const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.send(500).send();
  }
  //   Task.find({}).then((tasks)=>{
  //       res.send(tasks);
  //   }).catch((e) => {
  //       res.status(500).send(e);
  //   })
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
  // Task.findById(req.params.id).then((task)=>{
  //     if(!task){
  //       return    res.send(404);
  //     }
  //      res.send(task);
  // }).catch((e) => {
  //     res.status(500).send();
  // })
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedOperations = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedOperations.includes(update);
  });
  if (!isValidOperation) {
    return res.status(404).send("invalid properties");
  }
  try {

    const task = await Task.findById(req.parms.id);

    updates.forEach((update)=>{
        task[update] = req.body[update];
    })

    await task.save();

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   validator: true,
    // });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
