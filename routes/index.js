var express 	= require('express');
var router  	= express.Router();
var passport 	= require('passport');
var User 		= require('../models/User');

//  landing page
router.get('/',function(req,res)
{
	res.render('landing');
});


// =========
//  AUTHENTICATION ROUTES 
// ==============

//  register routes
router.get('/register',function(req,res)
{
	res.render('register');
});

router.post('/register',function(req,res)
{
	var newUser  = new User({username:req.body.username});
	var password = req.body.password;
	User.register(newUser,password,function(err,user)
	{
		if(err)
		{
			// console.log(err);
			req.flash('error',err.message);
			return res.render('/register');
		}
		passport.authenticate('local')(req,res,function()
		{	
			req.flash('success','Welcome to the Yelcamp '+user.username+'!!');
			res.redirect('/campgrounds');
		}
		)
	})

});

//  login routes 
router.get('/login',function(req,res)
{
	res.render('login');		
});

// app.post('/login',middleware,callback)
router.post('/login',passport.authenticate('local',{
	successRedirect:'/campgrounds',
	failureRedirect:'/login'
}),function(req,res)
{ 
});


//  logout  route
router.get('/logout',function(req,res)
{
	req.logout();
	req.flash('success','Logged Out successfully !!');
	res.redirect('/campgrounds');
});

//  middle ware isloggedin Logic 
// function isLoggedIn(req,res,next)
// {
// 	if(req.isAuthenticated())
// 	{
// 		return next();
// 	}
// 	req.flash('error','Please Login in First');
// 	res.redirect('/login');
// }

module.exports =  router;
