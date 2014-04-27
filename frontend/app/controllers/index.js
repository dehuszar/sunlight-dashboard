export default Ember.Controller.extend({
	results: [],
	addressValue: '',

	sampleText: 'Heres some text',

	actions: {
		actionSearch: function(){
			this.set('results', this.store.find('legislator', {
				address: this.get('addressValue')
			}));
		}
	}
});
