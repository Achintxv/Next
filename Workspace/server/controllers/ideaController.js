import Idea from "../models/Idea.js";

export const createIdea = async (req, res) => {
  try {
    const { text } = req.body;

    const idea = await Idea.create({
      text,
      user: req.user._id,
    });

    res.status(201).json(idea);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user._id });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateIdea = async (req, res) => {
  try {
    const { status } = req.body;

    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(idea);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteIdea = async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ msg: "Idea deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};