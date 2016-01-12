//initiate Images collection
Images = new Mongo.Collection("images");

//set up security 
Images.allow({
    insert:function(){
        
    }    
});