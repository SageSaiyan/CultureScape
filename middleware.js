const {culturalsiteSchema,reviewSchema}=require('./schemas.js');
const ExpressError=require('./utils/ExpressError');
const CulturalSite=require('./models/culturalSite');
const Review=require('./models/review.js');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash('error','You must be signed in');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCulturalsite=(req,res,next)=>{

    const {error}=culturalsiteSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

module.exports.isAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const culturalsite=await CulturalSite.findById(id);
    if(!culturalsite.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/culturalsites/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/culturalsites/${id}`);
    }
    next();
}

module.exports.validateReview= (req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}