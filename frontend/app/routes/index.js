export default Ember.Route.extend({
	model: function(){
		return this.store.findAll('legislator'); //Ember.$.getJSON('http://congress.api.sunlightfoundation.com/legislators/locate?zip=60618&apikey=66603c029b1b49428da28d6a783f795e');
	}
});