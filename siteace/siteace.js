if (Meteor.isClient) {
    
    /// routing
    Router.configure({
       layoutTemplate: 'ApplicationLayout' 
    });

    Router.route('/', function () {
      this.render('navbar', {
        to: "navbar"
      });
      this.render('website_list', {
        to: "main"
      });
    });  
    
    Router.route('/website/:_id', function () {
      this.render('navbar', {
        to: "navbar"
      });
      this.render('website_detail', {
        to: "main",
        data:function(){
            return Websites.findOne({_id:this.params._id});
        }
      });
    }); 
    
    /// acounts config
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });


	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites: function(){
			return Websites.find({}, {sort:{voteup:-1}});
		}
	});
	Template.website_detail.helpers({
		comments: function(){
			return Comments.find({post_id:this._id});
		}
	});
    
    Template.registerHelper('formatDate', function(date) {
      return moment(date).format('MM-DD-YYYY');
    });
    
    Template.registerHelper('getUser', function(user_id) {
        var user = Meteor.users.findOne({_id:user_id});
        if(user){
            return user.username;
        } else {
            return "anonymous";
        }
    });



	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
            var website = Websites.findOne({_id:website_id});
            var voteup = website.voteup;
            
            if(voteup>0)
                voteup++;
            else voteup = 1;
            
            Websites.update({_id:website_id}, {$set: {voteup:voteup}});
            
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!

			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
            var website = Websites.findOne({_id:website_id});
            var votedown = website.votedown;
            
            if(votedown>0)
                votedown++;
            else votedown = 1;
            
            Websites.update({_id:website_id}, {$set: {votedown:votedown}});
            
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!

			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){
		  
			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
            var title = event.target.title.value;
            var description = event.target.description.value;
            
            if(Meteor.user() && url.length && title.length && description.length){
                Websites.insert(
                    {
                    url:url,
                    title:title,
                    description:description,
                    createdOn:new Date(),
                    createdBy:Meteor.user()._id
                    }
                );
            }
            
            $("#website_form").toggle('slow');
			
			//  put your website saving code in here!	

			return false;// stop the form submit from reloading the page

		}
	});
    
    Template.comment_form.events({
        "submit .js-comment-website-form":function(event){
            var comment = event.target.comment.value;
            var post_id = event.target.post_id.value;
            
            if(Meteor.user() && comment.length && post_id.length){
                Comments.insert(
                    {
                    post_id:post_id,
                    comment:comment,
                    createdOn:new Date(),
                    createdBy:Meteor.user()._id
                    }
                );
            }
            
            event.target.comment.value = '';
            
            return false;
        }
    });
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date()
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date()
    	});
    }
  });
}
