//initiate Images collection
Images = new Mongo.Collection("images");

//set up security 
Images.allow({
    insert:function(userId, doc){
        if(Meteor.user()){
            if(userId != doc.createdBy){
                return false;
            } else {
                return true;
            }
        }
    }    
});