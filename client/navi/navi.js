var navs = {
  "":"Home",
  "lect":"Lecturers",
  "rec":"Recived"
};

Template.navi.navList = function(){
  return _.pairs(navs);
}

Template.navi.isActive = function(){
  return Router.current().path == "/"+ this[0];
}

Template.navi.events({

'click .login-button':function(e, tmpl){
   href ="/";
  }
})
