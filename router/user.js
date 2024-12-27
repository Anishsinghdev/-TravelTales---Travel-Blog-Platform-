const express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError =require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/user.js");

//signup
router.route("/signup")
.get(usercontroller.signupranderform)
.post(wrapAsync(usercontroller.signupuser));


//login router form

router.route("/login")
.get(usercontroller.renderloginform)
.post(saveRedirectUrl,passport.authenticate('local',
     { failureRedirect: '/login' ,failureFlash:true}),usercontroller.loginuser);

router.get("/logout",usercontroller.logoutuser);

module.exports = router;