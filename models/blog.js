const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  alt: { type: String, required: true },
  src: { type: String, required: true },
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

//test change