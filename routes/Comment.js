var express 	= require('express');
var router  	= express.Router({mergeParams:true});
var Campground 	= require('../models/Campground');
var Comment 	= require('../models/Comment');
var User 		= require('../models/User');
var middleware  = require('../middleware');



// =================
	// COMMENTS ROUTES
// =================


//  new comments
router.get('/new',middleware.isLoggedIn,function(req,res)
{
	Campground.findById(req.params.id,function (err,foundCampground)
	{
		if(err){console.log(err);}
		else
		{
			res.render('comment/new',{campground:foundCampground});
		}
	})
});


//  comments create route
router.post('/',middleware.isLoggedIn,function(req,res)
{
	// res.send(' post route reached !!');
	var new_comment  = req.body.comment;
	Campground.findById(req.params.id,function(err,foundCampground)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			Comment.create(new_comment,function(err,comments)
			{
				if(err)
				{
					console.log(err);
				}			
				else
				{
					comments.author.id = req.user._id;
					comments.author.username = req.user.username;
					comments.save();
					foundCampground.comments.push(comments);
					foundCampground.save();
					req.flash('success','comment added successfully !!');
					res.redirect('/campgrounds/'+foundCampground._id );
				}
			});

		}
	})
})
// edit a comment 
router.get('/:comment_id/edit',middleware.checkCommentOwnership,function(req,res)
{ 
	Comment.findById(req.params.comment_id,function(err,foundComment)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render('comment/edit',{comment:foundComment,campground:req.params.id});
		}
	});
});


// router.get('/:comment_id',function(req,res)
// {
// 	res.send('comment update route ')
// });


//  update a comment 
router.put('/:comment_id',middleware.checkCommentOwnership,function(req,res)
{   
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedCOmment)
	{
		if(err)
		{
			console.log(err)
		}
		else
		{
			req.flash('success','comment updated successfully !!');
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});



//  delete a comment 
router.delete('/:comment_id',middleware.checkCommentOwnership,function(req,res)
{
	Comment.findByIdAndRemove(req.params.comment_id,function(err)
	{
		if(err)
		{
			console.log(err)
		}
		else
		{
			req.flash('error','comment deleted successfully !!');
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})


//  middle ware isloggedin Logic 
// function isLoggedIn(req,res,next)
// {
// 	if(req.isAuthenticated())
// 	{
// 		return next();
// 	}
// 	res.redirect('/login');
// }

//  middleware comment logic
//  check the user is login 
// check the user is authourized to edit

// function checkCommentOwnership(req,res,next)
// {
// 	if(req.isAuthenticated())
// 	{
// 		Comment.findById(req.params.comment_id,function(err,foundComment)
// 		{
// 			if(err)
// 			{
// 				res.redirect('back');
// 			}
// 			else
// 			{
// 				if(foundComment.author.id.equals(req.user.id))
// 				{
// 					next();
// 				}
// 				else
// 				{
// 					res.redirect('back');
// 				}
// 			}
// 		})
// 	}
// 	else
// 	{
// 		res.redirect('back');
// 	}
// }


module.exports = router;



