var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
	this.resource('legislators', { path: '/legislators' });
});

export default Router;
