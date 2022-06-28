const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const homeCardSchema = new Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  link: { type: String, required: true },
});


const Home = mongoose.model('Home', homeCardSchema);

module.exports = Home;