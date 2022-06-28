const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//users will be able to post/edit/delete comments
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  forum: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
