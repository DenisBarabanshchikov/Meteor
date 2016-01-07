if (Meteor.isClient) {
  // counter starts at 0

  Template.time_now.helpers({
    time: function () {
      var now = new Date();  
      return now;
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
