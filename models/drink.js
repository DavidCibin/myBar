const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5 },
    content: String,
}, {
    timestamps: true,
});

const drinkSchema = new Schema({
    drink: String,
    prepTime: Number,
    serving: Number,
    ingredients: {type:String},
    instructions: {type:String},
    garnish: {type:String},
    alcohol: {type:String},
    imageUrl: String,
    videoUrl: String,
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [reviewSchema],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Drink", drinkSchema);