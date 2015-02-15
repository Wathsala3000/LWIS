Template.summary.rendered = function(){

  Deps.autorun(function(){
  Meteor.subscribe("lecturer");  
  Meteor.subscribe("transaction");
  Meteor.subscribe("recived");
  })
}

Template.summary.calcrec = function(){

	var onlectcount = recived.find({}).count();
	var getallrecs = recived.find({});
	var  totalrec= 0;
	var rec;
	getallrecs.forEach(function (trnsaction) {
		rec =  parseInt(trnsaction.amount);
		 totalrec = totalrec + rec;
	 });

	return totalrec;
}

Template.recivedbadgeinfo.getsession = function(){

		return recived.find({});
}