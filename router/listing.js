const express = require("express");
const router = express.Router();
const WrapAsync =require("../utils/wrapAsync.js");
const {isLoggedin,isOwner,validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({ storage })

// router.route index create listing
router.route("/")
.get(WrapAsync(listingController.index))
.post(isLoggedin, upload.single("listing[image]"),validatelisting,WrapAsync( listingController.createlistings));

//new route
router.get("/new",isLoggedin,listingController.rendernewform);

// show ,update, delete
router.route("/:id")
.get(WrapAsync(listingController.showlistings))
.put(isLoggedin,isOwner, upload.single("listing[image]"),validatelisting,WrapAsync(listingController.updatelisting))
.delete(isLoggedin,isOwner ,WrapAsync(listingController.deletelistings));



// edit route from
router.get("/:id/edit",isLoggedin,isOwner,WrapAsync(listingController.rendereditform));

module.exports = router;