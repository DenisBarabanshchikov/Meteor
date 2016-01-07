Images = new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient) {

    Template.images.helpers({images: 
        Images.find({}, {sort:{cratedOn:-1, rating:-1}})
    });
    
    Template.images.events({
        'click .js-image':function(event){
           $(event.target).css("width", "50px");
        },
        'click .js-del-image':function(event){
            var image_id = this._id;
            $('#'+image_id).hide('slow', function(){
                Images.remove({"_id" : image_id});
            });
            
        },
        'click .js-rate-image':function(event){
            var rating = $(event.currentTarget).data("userrating");
            var image_id = $(this).attr("data-mongo-id");
            Images.update({_id:image_id}, {$set: {rating:rating}});
        },
        'click .js-show-image-form':function(event){
            $('#image_add_form').modal('show');
        }
    });
    
    Template.image_add_form.events({
        'submit .js-add-image':function(event){
            var image_src, image_alt;
            image_src = event.target.img_src.value;
            image_alt = event.target.img_alt.value;
            console.log('src: '+image_src+" alt: "+image_alt);
            
            Images.insert(
                {
                img_src:image_src,
                img_alt:image_alt,
                cratedOn:new Date()
                }
            );
            
            return false;
        }
    });
}

if (Meteor.isServer) {
    console.log('I am the server');
}
