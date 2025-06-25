const express=require('express');
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const CulturalSite=require('../models/culturalSite');
const {culturalsiteSchema}=require('../schemas.js');
const router=express.Router();
const {isLoggedIn, isAuthor, validateCulturalsite}=require('../middleware.js');
const culturalsites=require('../controllers/culturalsites.js');
const multer=require('multer');
const {storage}=require('../cloudinary');
const upload=multer({storage});


router.get('/', catchAsync(culturalsites.index));

router.get('/new', isLoggedIn, culturalsites.rendernNewForm);

router.post('/', isLoggedIn, upload.array('image'), validateCulturalsite, catchAsync(culturalsites.createSite));
// router.post('/',upload.array('image'),(req,res)=>{
//     console.log(req.body);
// });

router.get('/:id', catchAsync(culturalsites.showSites));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(culturalsites.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCulturalsite, catchAsync(culturalsites.updateSite));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(culturalsites.deleteSite));

module.exports=router;