Meteor.publish("lecturer",function(){
	return lecturer.find({});
})
Meteor.publish("transaction",function(){
	return transaction.find({});
})
Meteor.publish("recived",function(){
	return recived.find({});
})
Meteor.methods({
		'addLectinfo':function(lectinfo){
			lecturer.insert(lectinfo);
			return true;
		},

		'updateLectinfo':function(id,lectinfo){
			lecturer.update(id,lectinfo);
			return true;
		},
		
		'deletelect':function(id){
			lecturer.remove(id);
			return true;
		},

		'addTransac':function(trancat){
			transaction.insert(trancat);
			return true;
		},

		'addRecived':function(recieved){
			recived.insert(recieved);
			return true;
		},

		'remove':function(trancat){
			transaction.remove({});
			return true;
		}				
});


