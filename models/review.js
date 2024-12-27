const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true, // Add `true` for required
    },
    rating: {
        type: Number, // Use `Number` instead of `number`
        min: 1,
        max: 5,
    },
    created_at: {
        type: Date,
        default: Date.now, // No need to call `Date.now()`
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
