const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  image: { type: String , required: true },
//   topic: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for book's URL
ArticleSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/${this._id}`;
});

// Export model
module.exports = mongoose.model("Article", ArticleSchema);
