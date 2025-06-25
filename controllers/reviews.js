const CulturalSite=require('../models/culturalSite');
const Review=require('../models/review');

module.exports.createReview=async (req,res)=>{
    const culturalsite=await CulturalSite.findById(req.params.id);
    const review=new Review(req.body.review);
    review.author=req.user._id;
    culturalsite.reviews.push(review);
    await review.save();
    await culturalsite.save();
    req.flash('success', 'Created new review');
    res.redirect(`/culturalsites/${culturalsite._id}`);
}

module.exports.deleteReview=async (req,res)=>{
    const {id,reviewId}=req.params;
    await CulturalSite.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted');
    res.redirect(`/culturalsites/${id}`);
}