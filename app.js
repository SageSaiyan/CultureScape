if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const {culturalsiteSchema,reviewSchema}=require('./schemas.js');
const catchAsync=require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');
const methodOverride=require('method-override');
const CulturalSite=require('./models/culturalSite');
const Review=require('./models/review');
const userRoutes=require('./routes/users');
const culturalsiteRoutes=require('./routes/culturalsites');
const reviewRoutes=require('./routes/reviews.js');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');

const MongoStore=require('connect-mongo');
const { log } = require('console');

const dbUrl=process.env.DB_URL;
// const dbUrl='mongodb://127.0.0.1:27017/culture-scape';
// 'mongodb://127.0.0.1:27017/culture-scape'
mongoose.connect(dbUrl)
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

const db=mongoose.connection;

const app=express();

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

store.on("error", function(e){
    console.log("Session Store Error", e)
})

const sessionConfig={
    store,
    name: 'session',
    secret:'somesecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly: true,
        // secure: true,
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({contentSecurityPolicy:false}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

const validateCulturalsite=(req,res,next)=>{

    const {error}=culturalsiteSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

const validateReview= (req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

app.use('/',userRoutes);

app.use('/culturalsites',culturalsiteRoutes);

app.use('/culturalsites/:id/reviews',reviewRoutes);

app.get('/',(req,res)=>{
    res.render('home');
})


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found', 404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500}=err;
    if(!err.message){
        err.message='Something went wrong';
    }
    res.status(statusCode).render('error',{err});
})

app.listen(3000,()=>{
    console.log('Serving on port 3000');
})