const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  article: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  like: { type: Number, default: 0 },
  date:  { type: Date, default: Date.now },
});

// Virtual for book's URL
CommentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/comment/${this._id}`;
});

CommentSchema.virtual('date_formatted').get(function () {
    return this.date
      ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
      : '';
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
