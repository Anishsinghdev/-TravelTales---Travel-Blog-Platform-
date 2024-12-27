const User = require("../models/user.js");

module.exports.signupranderform = (req,res)=>{
    res.render("./user/signup.ejs");
};

module.exports.signupuser = async (req,res)=>{
    try{
        let {username , email , password } = req.body;
        let newUser = new User({ email, username});
        const Registoruser = await User.register(newUser , password);
        console.log(Registoruser);
        req.login(Registoruser, (error)=>{
            if(error){
                return  next(error);
              }
              req.flash("sucess","you are loggedin now");
              res.redirect("/listing");
        });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    };
   

};

module.exports.renderloginform = (req,res)=>{
    res.render("./user/login.ejs");
};

module.exports.loginuser = async (req,res)=>{
    req.flash("sucess","welcome back to wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl);

};

module.exports.logoutuser = (req,res,next)=>{
    req.logout((error)=>{
        if(error){
          return  next(error);
        }
        req.flash("sucess","you are loggedout now");
        res.redirect("/listing");
    })
};