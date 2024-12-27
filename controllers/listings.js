const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listinges/index.ejs",{alllistings})
};

module.exports.rendernewform = (req,res)=>{
    res.render("listinges/new.ejs");
};
module.exports.showlistings = async (req,res)=>{
    let {id} = req.params;
    const listingitem = await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
    if (!listingitem) {
        req.flash("error", "Listing you request for does not exits!");
        return res.redirect("/listing");
    }
    console.log(listingitem);
    res.render("listinges/show.ejs", { listingitem });
    
};

module.exports.createlistings = async (req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url , filename};
    await newlisting.save();
    req.flash("sucess","New Listing Created!");
    res.redirect("/listing");
};

module.exports.rendereditform = async (req,res)=>{
    let {id} = req.params;
    const listingitem = await Listing.findById(id);
    if (!listingitem) {
        req.flash("error", "Listing you request for does not exist!");
        return res.redirect("/listing");
    }
    let originalimageurl = listingitem.image.url;
    originalimageurl = originalimageurl.replace("/upload","/upload/w_250");
    res.render("listinges/edit.ejs", { listingitem , originalimageurl});
};

module.exports.updatelisting = async (req,res)=>{
    let {id} = req.params;
     let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined" ){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url , filename};
       await listing.save()
    }
    

     req.flash("sucess","Listing Updated!");
     res.redirect(`/listing/${id}`);
};
module.exports.deletelistings = async (req,res)=>{
    let {id} = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id)
    console.log(deletelisting);
    req.flash("sucess","Listing Deleted");
    res.redirect("/listing");

};