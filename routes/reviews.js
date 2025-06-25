const express=require('express');
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const CulturalSite=require('../models/culturalSite');
const Review=require('../models/review');
const {reviewSchema}=require('../schemas.js');
const router=express.Router({mergeParams:true});
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware.js');
const reviews=require('../controllers/reviews.js');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports=router;