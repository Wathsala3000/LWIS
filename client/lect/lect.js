Session.setDefault('showlectform', false); 
Session.setDefault('updatelect', false); 
Session.setDefault('lectinfoview', false);
Template.lect.rendered = function(){

  Deps.autorun(function(){
  Meteor.subscribe("lecturer");
  Meteor.subscribe("transaction");
 
  })
}
Template.lectForm.updatelect = function(){

  return Session.get('updatelect');
}

Template.lect.showlectform = function(){

  return Session.get('showlectform');
}
Template.lect.lectinfoview = function(){

  return Session.get('lectinfoview');
}


Template.lect.lectinfo = function(){
  
  return lecturer.find({}, {sort: {updateddate: -1}});
}


Template.lect.events({
  'click #addlectbtn':function(e, tmpl){
   Session.set('showlectform',true);
  },


  'click .lectrow':function(e, tmpl){
   Session.set('showlectform',this._id)
   Session.set('updatelect',true);
  },

  'click #view':function(e, tmpl){
   Session.set('lectinfoview',this._id);
  }

})


Template.lectForm.events({
  'click #save':function(e, tmpl){

  var lectname = $('#lectname').val();
  var lecttitle = $('#lecttitle').val();
  var dept = $('#dept').val();
  var faculty = $('#faculty').val();
  var dob = $('.dob').val();
  var address = $('#address').val();
  var contactmobile = $('#contactmobile').val();
  var contacthome = $('#contacthome').val();
  var contactofficeext = $('#contactofficeext').val();
  var contactoffice = $('#contactoffice').val();
  var email = $('#email').val();
  var status = $('#status').val();
  var benifitname = $('#benifitname').val();
  var benefitaddress = $('#benefitaddress').val();

  if(lectname ==='')
  {
    toastr.warning('Enter Lecturers Fulname'); 
    return 0;
  }
  if(address ==='')
  {
    toastr.warning('Enter Address'); 
    return 0;
  }
  if(contactmobile ==='')
  {
    toastr.warning('Enter Mobile No'); 
    return 0;
  }
  if(email ==='')
  {
    toastr.warning('Enter E-mail'); 
    return 0;
  }
  if(status ==='')
  {
    toastr.warning('Enter Lecturer status'); 
    return 0;
  }


  var lectinfo = {  lectname: lectname,
                    lecttitle: lecttitle,
                    departement: dept,
                    faculty:faculty,
                    dob:dob,
                    address:address,
                    contactmobile:contactmobile,
                    contacthome:contacthome,
                    contactoffice:contactoffice,
                    contactofficeext:contactofficeext,
                    email:email,
                    status:status,
                    benifitername:benifitname,
                    benefiteraddress:benefitaddress,
                    updateddate:new Date()
                  }
                  Meteor.call('addLectinfo',lectinfo,function(err, result){
                        if(!err)
                          {
                            toastr.success('Lecturer Info Added');
                            Session.set('showlectform',false);
                            Session.set('updatelect',false);
                         }
                         else
                         {
                            toastr.error('Lecturer Info  Not Added');
                         }
                    }

              );
                 
  },


'click #update':function(e, tmpl){

  var lectname = $('#lectname').val();
  var lecttitle = $('#lecttitle').val();
  var dept = $('#dept').val();
  var faculty = $('#faculty').val();
  var dob = $('.dob').val();
  var address = $('#address').val();
  var contactmobile = $('#contactmobile').val();
  var contacthome = $('#contacthome').val();
  var contactofficeext = $('#contactofficeext').val();
  var contactoffice = $('#contactoffice').val();
  var email = $('#email').val();
  var status = $('#status').val();
  var benifitname = $('#benifitname').val();
  var benefitaddress = $('#benefitaddress').val();

  if(lectname ==='')
  {
    toastr.warning('Enter Lecturers Fulname'); 
    return 0;
  }
  if(address ==='')
  {
    toastr.warning('Enter Address'); 
    return 0;
  }
  if(contactmobile ==='')
  {
    toastr.warning('Enter Mobile No'); 
    return 0;
  }
  if(email ==='')
  {
    toastr.warning('Enter E-mail'); 
    return 0;
  }
  if(status ==='')
  {
    toastr.warning('Enter Lecturer status'); 
    return 0;
  }
  var lectid = Session.get('showlectform');

  var lectinfo = {  lectname: lectname,
                    lecttitle: lecttitle,
                    departement: dept,
                    faculty:faculty,
                    dob:dob,
                    address:address,
                    contactmobile:contactmobile,
                    contacthome:contacthome,
                    contactoffice:contactoffice,
                    contactofficeext:contactofficeext,
                    email:email,
                    status:status,
                    benifitername:benifitname,
                    benefiteraddress:benefitaddress,
                    updateddate:new Date()
                  }
                  Meteor.call('updateLectinfo',lectid,lectinfo,function(err, result){
                        if(!err)
                          {
                            toastr.success('Lecturer Info Updated')
                            Session.set('showlectform',false);
                            Session.set('updatelect',false);
                         }
                         else
                         {
                            toastr.error('Lecturer Info Not Updated')
                         }
                    });               
  },

   'click #delete':function(e, tmpl){

    var lectid = Session.get('showlectform');
     
     Meteor.call('deletelect',lectid, function(err, result){
                        if(!err)
                          {
                            toastr.success('Lecturer Info Deleted');
                            Session.set('showlectform',false);
                            Session.set('updatelect',false);
                          }
                          else
                          {
                            toastr.error('Lecturer Info Not Deleted');
                          }
                    });
  },

  'click #close':function(e, tmpl){
    Session.set('showlectform',false);
    Session.set('updatelect',false);
  },

  'click #cancel':function(e, tmpl){
    Session.set('showlectform',false);
    Session.set('updatelect',false);
  } 
})


Template.lectInfoview.events({

  'click #close':function(e, tmpl){
    Session.set('lectinfoview',false);
    Session.set('showlectform',false);
  }   
})

Template.lectForm.rendered = function () {
  var lectinfo = lecturer.findOne({_id:Session.get('showlectform')});
  $('#lectname').val(lectinfo.lectname);
  $('#lecttitle').val(lectinfo.lecttitle);
  $('.dob').val(lectinfo.dob);
  $('#address').val(lectinfo.address);
  $('#dept').val(lectinfo.departement);

  $('#faculty').val(lectinfo.faculty);
  $('#contactmobile').val(lectinfo.contactmobile);
  $('#contacthome').val(lectinfo.contacthome);
  $('#contactoffice').val(lectinfo.contactoffice);
  $('#contactofficeext').val(lectinfo.contactofficeext);

  $('#email').val(lectinfo.email);
  $('#status').val(lectinfo.status);
  $('#benifitname').val(lectinfo.benifitername);
  $('#benefitaddress').val(lectinfo.benefiteraddress);
};



Template.lectInfoview.rendered = function () {
  var lectinfo = lecturer.findOne({_id:Session.get('lectinfoview')});
  $('#lectname').val(lectinfo.lectname);
  $('#lecttitle').val(lectinfo.lecttitle);
  $('.dob').val(lectinfo.dob);
  $('#address').val(lectinfo.address);
  $('#dept').val(lectinfo.departement);

  $('#faculty').val(lectinfo.faculty);
  $('#contactmobile').val(lectinfo.contactmobile);
  $('#contacthome').val(lectinfo.contacthome);
  $('#contactoffice').val(lectinfo.contactoffice);
  $('#contactofficeext').val(lectinfo.contactofficeext);

  $('#email').val(lectinfo.email);
  $('#status').val(lectinfo.status);
  $('#benifitname').val(lectinfo.benifitername);
  $('#benefitaddress').val(lectinfo.benefiteraddress);
};
Template.lectInfoview.lectinfo = function(){

  var lectinfo = lecturer.findOne({_id:Session.get('lectinfoview')});
  return lectinfo;
} 

Template.lectInfoview.lectbalance = function(){

  var lectinfo = transaction.find({memberid:Session.get('lectinfoview')});

  var  totalbalance= 0;
  var rec;
  lectinfo.forEach(function (trnsaction) {
    rec =  parseInt(trnsaction.amount);
     totalbalance = totalbalance + rec;
   });

  return totalbalance;
} 
