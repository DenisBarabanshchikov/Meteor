//initiate websites collection
Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

//set up security 
Websites.allow({
    insert:function(userId, doc){
        if(Meteor.user()){
            if(userId != doc.createdBy){
                return false;
            } else {
                return true;
            }
        }
    },
    
    update:function(userId, doc){
        return true;
    },
    
    remove:function(userId, doc){ 
        if(Meteor.user()){
            if(userId != doc.createdBy){
                return false;
            } else {
                return true;
            }
        }
    }     
});

Comments.allow({
    insert:function(userId, doc){
        if(Meteor.user()){
            if(userId != doc.createdBy){
                return false;
            } else {
                return true;
            }
        }
    },
    
    update:function(userId, doc){
        if(Meteor.user()){
            if(userId != doc.createdBy){
                return false;
            } else {
                return true;
            }
        }
    },
    
    remove:function(userId, doc){ 
        if(Meteor.user()){
            if(userId != doc.createdBy){
                return false;
            } else {
                return true;
            }
        }
    }     
});