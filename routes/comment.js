const router = require("express").Router();
const Comment = require("../models/comment");
const auth = require("../middleware/auth");

//@route Get all comments /
//@desc Get all favorites from everybody
//@access Public
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
    console.log('comments fetched')
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Post Comment
//@desc individual user can post a comment
//@access Public
router.post("/", auth, async (req, res) => {
  const comment = new Comment({
    user: req.user.id,
    comment: req.body.comment,
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
    console.log('comment posted')
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@route Delete Comment
//@desc individual user can delete only a comment they have made
//@access private
router.delete("/:id", auth, async (req, res) => {
  try {
    const removedComment = await Comment.deleteOne({ _id: req.params.id });
    res.json(removedComment);
    console.log('comment deleted')
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;