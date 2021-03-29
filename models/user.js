const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    drinks: [{ type: Schema.Types.ObjectId, ref: 'Drink' }]
  }, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
