const express = require("express");
const router = express.Router();
const Home = require("../models/home");

//@route Get  /
//@desc Get all Home Cards
//@access Public
router.get("/", async (req, res) => {
  try {
    const home = await Home.find();
    res.json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@route Post  /
//@desc Add a new home card
//@access Public
router.post("/", async (req, res) => {
  const home = new Home({
    name: req.body.name,
    src: req.body.src,
    link: req.body.link,
  });
  try {
    const newHome = await home.save();
    res.status(201).json(newHome);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@route Delete /
//@desc Delete all home cards
//@access Public
router.delete("/", async (req, res) => {
  try {
    const removedHome = await Home.deleteMany();
    res.json(removedHome);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
