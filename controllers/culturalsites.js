const CulturalSite=require('../models/culturalSite');
const {cloudinary}=require('../cloudinary');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index=async (req,res)=>{
    const culturalsites=await CulturalSite.find({});
    res.render('culturalsites/index',{culturalsites});
}

module.exports.rendernNewForm=(req,res)=>{
    res.render('culturalsites/new');
}

module.exports.createSite=async(req,res,next)=>{
    const geoData = await maptilerClient.geocoding.forward(req.body.culturalsite.location, { limit: 1 });
    if(!req.body.culturalsite) throw new ExpressError('Invalid Data',400);
    const culturalsite= new CulturalSite(req.body.culturalsite);
    culturalsite.geometry = geoData.features[0].geometry;
    culturalsite.images=req.files.map(f=>({url: f.path, filename: f.filename}));
    culturalsite.author=req.user._id;
    await culturalsite.save();
    req.flash('success', 'Successfully posted a new site');
    res.redirect(`/culturalsites/${culturalsite._id}`);
    // console.log(culturalsite);
}

module.exports.showSites=async (req,res)=>{
    const culturalsite=await CulturalSite.findById(req.params.id).populate({
        path:'reviews',
        populate: {
            path:'author'
        }
    }).populate('author');
    if(!culturalsite){
        req.flash('error','Site not found');
        return res.redirect('/culturalsites');
    }
    res.render('culturalsites/show',{culturalsite});
}

module.exports.renderEditForm=async (req,res)=>{
    const {id}=req.params;
    const culturalsite=await CulturalSite.findById(id);
    if(!culturalsite){
        req.flash('error','Site not found,cant edit');
        return res.redirect('/culturalsites');
    }
    res.render('culturalsites/edit',{culturalsite});
}

module.exports.updateSite=async (req,res)=>{
    const {id}=req.params;
    const culturalsite=await CulturalSite.findByIdAndUpdate(id, {...req.body.culturalsite});
    const geoData = await maptilerClient.geocoding.forward(req.body.culturalsite.location, { limit: 1 });
    culturalsite.geometry = geoData.features[0].geometry;
    const imgs=req.files.map(f=>({url: f.path, filename: f.filename}));
    culturalsite.images.push(...imgs);
    await culturalsite.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            cloudinary.uploader.destroy(filename);
        }
        await culturalsite.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    }
    req.flash('success', 'Successfully updated!');
    res.redirect(`/culturalsites/${culturalsite._id}`);
}

module.exports.deleteSite=async (req,res)=>{
    const {id}=req.params;
    await CulturalSite.findByIdAndDelete(id);
    req.flash('success', 'Site deleted');
    res.redirect('/culturalsites');
}