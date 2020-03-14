var mongoose 	= require('mongoose'),
	Campground	= require('./models/Campground'),
	Comment 	= require('./models/Comment');

// var data = [
// 	{
// 		name:'Orange camping',
// 		image:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
// 		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
// 	},
// 	{
// 		name:'fire camping',
// 		image:'https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
// 		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
// 	},
// 	{
// 		name:'morning camping',
// 		image:'https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
// 		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
// 	}
// ];


function SeedDB()
{	
	Campground.remove({},function(err)
	{
		if(err){console.log(err);}
		else
		{	
			console.log('campgrounds removed succesfully!!')
			//  create campgrounds
			// data.forEach(function(seed)
			// {
			// 	Campground.create(seed,function(err,campgrounds)
			// 	{
			// 		if(err){console.log(err);}
			// 		else
			// 		{
			// 			console.log('campgrounds added !!');
			// 			Comment.create(
			// 			{
			// 				text:'this is the beautiful ',
			// 				author:'jeykar'
			// 			},function(err,data)
			// 			{
			// 				if(err){console.log(err);}
			// 				else
			// 				{
			// 					campgrounds.comments.push(data);
			// 					campgrounds.save(function(err)
			// 					{
			// 						if(err){console.log(err);}
			// 						else{console.log('comment added succesfully');}
			// 					});

			// 				}
			// 			}
			// 			);
			// 		}
			// 	});
			// });
		}
	});
};


module.exports = SeedDB;


