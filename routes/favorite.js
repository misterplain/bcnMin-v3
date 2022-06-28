const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const mongoTypes = require("mongoose").Types;
const User = require("../models/user");
const Blog = require("../models/blog");
const Favorite = require("../models/favorite");
const { default: mongoose, mongo } = require("mongoose");


//@route Get  /
//@desc Get all favorites from user
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate('favorites');// populate function replaces the blog id with its corressponding blog object
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Post  /
//@desc Add blog post to users favorites
//@access Public
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // req.body.blog is the blog id to be saved in favorites array
    // favorites is an array, push a new blog id in the array
    const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { favorites: req.body.blog } }, { returnOriginal: false }).populate('favorites'); // populate function replaces the blog id with its corressponding blog object
    // updated user contains new blog id in favorites array
    res.json(updatedUser.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//@route Delete  /
//@desc delete all favorites from user
//@access Public
router.delete("/:blogId", auth, async (req, res) => {
  try {
    // favorites is an array, remove or pull a new blog id in the arrayisNew: true
    const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { favorites: new mongoose.Types.ObjectId(req.params.blogId) } }, { returnOriginal: false }).populate('favorites');
    // updated user favorites contains all blog ids except the remove one id
    const newFavorites = updatedUser.favorites;
    res.json(newFavorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//@route Delte  /
//@desc Delete individual favorite from user
//@access Public
/*router.delete("/:id", auth, async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ msg: "Favorite not found" });
    }
    await favorite.remove();
    res.json({ msg: "Favorite Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});*/

module.exports = router;