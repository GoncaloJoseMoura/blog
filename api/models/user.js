const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 1},
  membership_status: {
    type: String,
    enum: ["Member", "Admin"],
    default: "Member",
  },
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

UserSchema.virtual("username").get(function () {
  // We don't use an arrow function as we'll need the this object
  return this.first_name + '.' + this.last_name;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
