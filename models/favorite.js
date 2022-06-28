const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//users will be able to favorite/unfavorite blog posts
const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
