
Template.rec.rendered = function(){

  Deps.autorun(function(){
  Meteor.subscribe("lecturer");  
  Meteor.subscribe("transaction");
  Meteor.subscribe("recived");
  })
}
Template.rec.calconlect = function(){

	return lecturer.find({status:'On'}).count();
}

Template.rec.calcrec = function(){

	var onlectcount = lecturer.find({status:'On'}).count();
	return 20*onlectcount;
}


Template.rec.events({
	'click #craterect':function(e, tmpl){

		var ctoday = new Date();
		var cmonth = ctoday.getMonth()+1;
	 	var cyear = ctoday.getFullYear();
	 	var cparent = cyear+'.'+cmonth;
		var checklect = transaction.findOne({parent:cparent});

	 	

		if(!checklect)
	 	{
	 		
		var today = new Date();
		var month = today.getMonth()+1;
	 	var year = today.getFullYear();
	 	var day = today.getDate();
	 	var parent = year+'.'+month;
	 	var tdate = parent +'.'+day;
	 
        var onlectcount = lecturer.find({status:'On'}).count();
        var recived = onlectcount * 20;

         var reciveddata ={sessionname:parent,
						amount : recived,
	 					date : tdate,				
	 					};

         Meteor.call('addRecived',reciveddata,function(err2, result)
        {

        if(!err2)
	         {
	            toastr.success('Recived Added');
	            Session.set('showlectform',false);
	            Session.set('updatelect',false);
	         }
         	else
	         {
	            toastr.error('Recived Adding Failed');
	         }
    	}	);

	 	var lectinfo = lecturer.find({status:'On'});
	 	var payment ='20';
	 	var today = new Date();
		var month = today.getMonth()+1;
	 	var year = today.getFullYear();
	 	var day = today.getDate();
	 	var parent = year+'.'+month;
	 	var tdate = parent +'.'+day;
	 	
	 	lectinfo.forEach(function (trnsaction) {
	 	
	 		var transact ={memberid: trnsaction._id,
	 					amount : payment,
	 					date : today,
	 					parent: parent,
	 					createdDate: tdate				
	 					};
	 					
	 		Meteor.call('addTransac',transact);
		});

	 	}
	 	else
	 	{
			toastr.warning('Only Once Per Month');	 		
	 	}    
	},


	'click #removeall':function(e, tmpl){
			Meteor.call('remove');

	},
	'click #addSpecTransac':function(e, tmpl){

		
		var specpayment = $('#camount').val();

		if(specpayment === '')
		{		
				toastr.warning('Enter Special Recived Value!!');	
		}
		else
		{
			

		var today = new Date();
		var month = today.getMonth()+1;
	 	var year = today.getFullYear();
	 	var cday = today.getDate();
	 	var parent = 'spec-'+year+'.'+month;
	 
        var onlectcount = lecturer.find({status:'On'}).count();
        var recived = onlectcount * specpayment;
        var cdate = parent +'.'+cday;
	 	

         var reciveddata ={sessionname:parent,
						amount : recived,
	 					date : cdate,				
	 					};

         Meteor.call('addRecived',reciveddata,function(err2, result)
        {

        if(!err2)
	         {
	            toastr.success('Recived Added');
	            Session.set('showlectform',false);
	            Session.set('updatelect',false);
	         }
         	else
	         {
	            toastr.error('Recived Adding Failed');
	         }
    	}	);

	 	var lectinfo = lecturer.find({status:'On'});
	 	var payment = $('#camount').val();
	 	var today = new Date();
		var month = today.getMonth()+1;
	 	var year = today.getFullYear();
	 	var cday = today.getDate();
	 	var parent = year+'.'+month;
	 	var cdate = parent +'.'+cday;
	 	
	 	
	 	lectinfo.forEach(function (trnsaction) {
	 	
	 		var transact ={memberid: trnsaction._id,
	 					amount : payment,
	 					date : today,
	 					parent: parent,
	 					createdDate: cdate				
	 					};
	 					
	 		Meteor.call('addTransac',transact);
		});

		
		}	  
	}
})


Template.recivedinfo.getrecinfo = function(){
		var today = new Date();
	 	var month = today.getMonth()+1;
	 	var year = today.getFullYear();
	 	var parent = year+'.'+month;

		return transaction.find({parent:parent});
}

Template.recivedinfo.getrecmeminfo = function(tmpl){

		var lectinfo = lecturer.findOne({_id:this.memberid});
		return	lectinfo;
}

Template.recivedinfo.getsession = function(){
		var today = new Date();
	 	var month = today.getMonth()+1;
	 	var year = today.getFullYear();
	 	var parent = year+'.'+month;

		return recived.find({sessionname:parent});
}
