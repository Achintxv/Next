import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ msg: "Task is required" });
    }

    const newTask = await Task.create({
      task,
      user: req.user._id,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// GET TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};