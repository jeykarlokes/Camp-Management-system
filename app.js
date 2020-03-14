var express 				= require('express'),
	app 					= express(),
	bodyParser 				= require('body-parser'),
	Campground  			= require('./models/Campground'),
	Comment 				= require('./models/Comment'),
	SeedDb 					= require('./seed'),
	passport 				= require('passport'),
	LocalStrategy			= require('passport-local'),
	passportLocalMongoose 	= require('passport-local-mongoose'),
	User 					= require('./models/User'),
	methodOverride			= require('method-override'),
	mongoose				= require('mongoose');
	flash					= require('connect-flash');
	
//  require routes files
var commentRoutes 	 = require('./routes/Comment'),
	campgroundRoutes = require('./routes/Campground'),
	indexRoutes		 = require('./routes/index');

// SeedDb();

mongoose.connect('mongodb://localhost/yelp_camp_v12');
// express session
app.use(require('express-session')({
	secret:'hi this is lokesh',
	resave:false,
	saveUninitialized: false
}));
//  use bodyparser,view engine,default dirname and public
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

//  use the flash message 
app.use(flash());


//  method override
app.use(methodOverride("_method"));
//  passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  pass the current user to all the routes  this is the middle ware
//  from the partials we can show the user 
app.use(function (req,res,next)
{

	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	// console.log(currentUser);

	next();
});

//  using those routes
//  use the routes should be at the end of the page or above listener.
app.use("/campgrounds/",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

// listen route
app.listen(3000,function (req,res)
{
	console.log('Yelcamp server started successfully !');
});