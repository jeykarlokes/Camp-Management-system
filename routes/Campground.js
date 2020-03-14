var express 	= require('express');
var router  	= express.Router();
var Campground 	= require('../models/Campground');
var Comment 	= require('../models/Comment');
var User 		= require('../models/User');
var middleware  = require('../middleware');
//  view all the campgrounds
router.get('/',function(req,res)
{
	// console.log(req.user);
	Campground.find({},function(err,allCampgrounds)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render('campground/index',{campgrounds:allCampgrounds});
		}
	})

});


//  Addig a campground to the databasae 
router.post('/',middleware.isLoggedIn,function (req,res)
{	
	var name 			= req.body.name;
	var image 			= req.body.image;
	var description 	= req.body.description;
	var price 			= req.body.price;
	var author			= {
		id:req.user._id,
		username:req.user.username
	};
	var new_campground  = {name:name,image:image,price:price,description:description,author:author};

	Campground.create(new_campground,function(err,newly_campground)
	{
		if (err)
		{
			req.flash('error',"Can't campground not created!");
		}
		else
		{	req.flash('success','Campground created successfully !!');
			res.redirect('/campgrounds');
		}
	});
});


//  get new campground form
router.get('/new',middleware.isLoggedIn,function (req,res)
{
	res.render('campground/new');
});

//  show the campground route 
router.get('/:id',function (req,res)
{
	var id  = req.params.id;
	// console.log("the id is ::",id);
	Campground.findById(id).populate('comments').exec(function(err,foundCampground)
	{
		if(err)
		{
			req.flash('error',"Campground not found !");
			// console.log(err);
		}
		else
		{
			// console.log(foundCampground);
			res.render('campground/show',{campground:foundCampground});
		}
	});

});

//  to edit or update the campground 
// the user should login first 
// the user should have created the campground 


//  edit  campground route

router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req,res)
{
	Campground.findById(req.params.id,function(err,foundCampground)
	{	
		if(err){
			req.flash('error',"Campground not found !");
		}
		res.render('campground/edit',{campground:foundCampground});		
	});
});

router.put('/:id',middleware.checkCampgroundOwnership,function(req,res)
{
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCampground){
		if(err)
		{
			console.log(err);
			res.redirect('/campgrounds');
		}
		else
		{	
			req.flash('success','Campground Updated successfully !!');
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})

//  destroy the campground 
router.delete('/:id',middleware.checkCampgroundOwnership,function(req,res)
{
	Campground.findByIdAndRemove(req.params.id,function(err)
	{
		if(err)
		{
			res.redirect('/campgrounds');
		}
		else
		{
			req.flash('error','Campground deleted successfully !!');
			res.redirect('/campgrounds');
		}
	})
});


//  authentication  middle ware logic

//  to edit or update the campground 
// the user should login first 
// the user should have created the campground 


// function checkCampgroundOwnership(req,res,next)
// {
// 	if(req.isAuthenticated())
// 	{
// 		Campground.findById(req.params.id,function(err,foundCampground)
// 		{
// 			if(err)
// 			{
// 				res.redirect('back');
// 			}
// 			else
// 			{	
// 				// for the campground user has permission or not 
// 				if(foundCampground.author.id.equals(req.user._id))
// 				{
// 					next();
// 				}
// 				else
// 				{
// 					res.redirect('back');
// 				}
// 			}
// 		});		
// 	}
// 	else
// 	{
// 		res.redirect('back');
// 	}

// }


//  middle ware isloggedin Logic 
// function isLoggedIn(req,res,next)
// {
// 	if(req.isAuthenticated())
// 	{
// 		return next();
// 	}
// 	res.redirect('/login');
// }

module.exports = router;
