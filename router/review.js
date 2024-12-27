const express = require("express");
const router = express.Router({mergeParams:true});
const WrapAsync =require("../utils/wrapAsync.js");
const ExpressError =require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const {validateReview,isLoggedin,isreviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js")
// Review Route

router.post("/", validateReview,isLoggedin,WrapAsync(reviewcontroller.createreview ));
// delete review route
router.delete("/:reviewid",isLoggedin,isreviewAuthor,WrapAsync(reviewcontroller.deletereview));

module.exports = router;
