lecturer = new Meteor.Collection('lecturer');
transaction = new Meteor.Collection('transaction');
recived = new Meteor.Collection('recived');
lecturer.initEasySearch('lecturer');
EasySearch.createSearchIndex('lecturer', {
    'field' : ['lectname', 'email','faculty','departement','status'],  // required, searchable field(s)
    'collection' : lecturer,          // required, Mongo Collection
    'limit' : 30                  // not required, default is 10
});