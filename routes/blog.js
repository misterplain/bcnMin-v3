const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");


const User = require("../models/user");
const Blog = require("../models/blog");
const Favorite = require("../models/favorite");

//@route Get  /
//@desc Get all Blog Posts
//@access Public
router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@route Post  /
//@desc Add a blog post
//@access Public
router.post("/", async (req, res) => {
  const blog = new Blog({
    img: req.body.img,
    title: req.body.title,
    caption: req.body.caption,
    alt: req.body.alt,
    src: req.body.src,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@route Delete /
//@desc Delete all blog posts
//@access Public
router.delete("/", async (req, res) => {
  try {
    const removedBlog = await Blog.deleteMany();
    res.json(removedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@route Get  /
//@desc Get all favorites from user
//@access Public
router.get("/:uid", auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id });
    res.json(favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Post  /
//@desc Add blog post to users favorites
//@access Public
router.post("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const blog = await Blog.findById(req.params.id);
    const newFavorite = new Favorite({
      user: user,
      blog: blog,
    });
    await newFavorite.save();
    res.json(newFavorite);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Delete  /
//@desc delete all favorites from user
//@access Public
router.delete("/", auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id });
    favorites.forEach(async (favorite) => {
      await favorite.remove();
    });
    res.json({ msg: "Favorites Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Delte  /
//@desc Delete individual favorite from user
//@access Public
router.delete("/:id", auth, async (req, res) => {
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
});

module.exports = router;