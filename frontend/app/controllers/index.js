export default Ember.Controller.extend({
	results: [],
	addressValue: '',

	actions: {
		actionSearch: function(){
			this.set('results', this.store.find('legislator', {
				address: this.get('addressValue')
			}));
		}
	}
});
