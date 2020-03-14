var Campground = require('../models/Campground');
var Comment = require('../models/Comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next)
{
	if(req.isAuthenticated())
	{
		Campground.findById(req.params.id,function(err,foundCampground)
		{
			if(err)
			{
				req.flash('error','Campground not found !');
				res.redirect('back');
			}
			else
			{	
				// for the campground user has permission or not 
				if(foundCampground.author.id.equals(req.user._id))
				{
					next();
				}
				else
				{
					req.flash('error',"You don't have the permissions to modify the campground !!");
					res.redirect('back');
				}
			}
		});		
	}
	else
	{
		req.flash('error','you are not an Authenticated User');
		res.redirect('back');
	}

}

middlewareObj.checkCommentOwnership = function(req,res,next)
{
	if(req.isAuthenticated())
	{
		Comment.findById(req.params.comment_id,function(err,foundComment)
		{
			if(err)
			{
				req.flash('error','Comment not found !');

				res.redirect('back');
			}
			else
			{
				if(foundComment.author.id.equals(req.user.id))
				{
					next();
				}
				else
				{
					req.flash('error',"You don't have the permissions to modify the comment !!");
					res.redirect('back');
				}
			}
		})
	}
	else
	{
		req.flash('error','you are not an Authenticated User');

		res.redirect('back');
	}
}


middlewareObj.isLoggedIn = function(req,res,next)
{
	if(req.isAuthenticated())
	{
		return next();
	}
	req.flash('error','Please Log in first');
	res.redirect('/login');
}

module.exports = middlewareObj;