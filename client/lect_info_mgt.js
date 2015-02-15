if (Meteor.isClient) {
  // counter starts at 0
// Router.route('/', function () {
// this.render('main', {
//   data: function () {  }
// });
// });


Router.configure({
  layoutTemplate: 'main'
})

Router .map( function () {
  this.route('splash', {
    path: '/'      
  });
  
  this.route('lect', {
    path: '/lect'
  });

    this.route('rec', {
    path: '/rec'
  });

    this.route('summary', {
    path: '/summary'
  });

})  
Template.main.showeventform = function(){

  return Session.get('showeventform');
}

Template.splash.events({
  'click #addlectbtn':function(e, tmpl){
   Session.set('showeventform',true);
  } 
})



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


}
