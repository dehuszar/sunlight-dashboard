(function() {
	"use strict";

	// Initialize App
	// ============================================================
	window.App = Ember.Application.create();

	App.Router.map(function(){
		this.route('personal', { path: '/' });
		this.route('financial', { path: '/financial' });
		this.route('contact', { path: '/contact' });
		this.route('security', { path: '/security' });
		this.route('review', { path: '/review' });
	});


	// Base model with user's information
	App.set('applicant', Ember.Object.create({
		firstName: 			'',
		lastName: 			'',
		suffix: 			null,
		address: 			'',
		addressContinued: 	'',
		unit: 				'',
		zipCode: 			'',
		city: 				'',
		state: 				null,
		dateOfBirth: 		'',
		incomeSource: 		null,
		employer: 			'',
		accountType: 		null,
		grossAnnualIncome: 	'',
		residenceStatus: 	null,
		socialSecurityNumber:'',
		securityAnswer: 	''
	}));


	// Routes
	// ============================================================
	App.TabRoute = Ember.Route.extend({
		model: function() { return App.get('applicant'); },

		// Attributes
		nextSlug: null,

		// Events
		actions: {
			actionNext: function(){
				this.linkTo(this.get('nextSlug'));
			},
			actionLinkTo: function(slug){
				this.transitionTo(slug);
			}
		},

		linkTo: function(slug){
			if(this.get('controller.isComplete'))
				this.transitionTo(slug);
			else
				this.validate();
		},

		validate: function(){
			this.set('controller.showInvalid', true);
		}

	});

	// Extends TabRoute
	App.PersonalRoute = 	App.TabRoute.extend({ nextSlug: 'financial' });
	App.FinancialRoute = 	App.TabRoute.extend({ nextSlug: 'contact' });
	App.ContactRoute = 		App.TabRoute.extend({ nextSlug: 'security' });
	App.SecurityRoute = 	App.TabRoute.extend({ nextSlug: 'review' });
	App.ReviewRoute = 		App.TabRoute.extend();



	// Components
	// ============================================================
	App.HeaderNavigationComponent = Ember.Component.extend({
		selectedSlug: 	'personal',

		tabs: 			[{
			slug: 'personal',
			title: 'About You'
		},{
			slug: 'financial',
			title: 'Financial Info'
		},{
			slug: 'contact',
			title: 'Contact Info'
		},{
			slug: 'security',
			title: 'Security Info'
		},{
			slug: 'review',
			title: 'Review'
		}],

		// Methods
		isSelected: function(slug){
			return slug === this.get('selectedSlug');
		}
	});

	App.NavigationButtonComponent = Ember.Component.extend({
		tagName: 'li',
		attributeBindings: 	['data-state-selected'],

		'data-state-selected': function(){
			return (this.get('slug') === this.get('selectedSlug')) ? 'selected' : '';
		}.property('slug', 'selectedSlug')
	});

	App.ValidatedComponent = Ember.Component.extend({

		// Attributes
		tagName: 			'div',
		classNames: 		['field'],
		attributeBindings: 	['data-state-valid'],
		value: 				'',

		isInitialized: 		false,
		isRequired: 		true,

		// Properties
		'data-state-valid': function(){
			if(this.get('isValid'))
				return 'invalid';
		}.property('isValid'),

		isValid: function(){
			if(!this.get('isRequired'))
				return false;

			if(this.get('isInitialized'))
				return this.validCheck();
			else
				this.set('isInitialized', true);

		}.property('value', 'showInvalid')
	});

	// Extends ValidatedComponent
	App.ValidatedTextFieldComponent = App.ValidatedComponent.extend({

		// Methods
		validCheck: function(){
			return (!this.get('value').length > 0);
		}

	});

	App.ValidatedSelectComponent = App.ValidatedComponent.extend({

		// Methods
		validCheck: function(){
			return !(this.get('value') || this.get('value') == 0);
		},

		// Views
		SelectView: Ember.Select.extend({
			prompt: Ember.computed.oneWay('parentView.prompt'),
			content: Ember.computed.oneWay('options')
		})

	});



	// Controllers
	// ============================================================
	App.PersonalController = Ember.Controller.extend({

		// Attributes
		showInvalid: 	false,
		suffixOptions: 	[ { id: 0, name: 'Jr' },{ id: 1, name: 'Sr' },{ id: 2, name: 'II' },{ id: 3, name: 'III' },{ id: 4, name: 'IV' },{ id: 5, name: 'V' },{ id: 6, name: 'DDM' },{ id: 7, name: 'DDS' },{ id: 8, name: 'DO' },{ id: 9, name: 'ESQ' },{ id: 10, name: 'MD' },{ id: 11, name: 'RN' }],
    	states: 		[ { id: "AL", name: "AL" }, { id: "AK", name: "AK" }, { id: "AS", name: "AS" }, { id: "AZ", name: "AZ" }, { id: "AR", name: "AR" }, { id: "CA", name: "CA" }, { id: "CO", name: "CO" }, { id: "CT", name: "CT" }, { id: "DE", name: "DE" }, { id: "DC", name: "DC" }, { id: "FM", name: "FM" }, { id: "FL", name: "FL" }, { id: "GA", name: "GA" }, { id: "GU", name: "GU" }, { id: "HI", name: "HI" }, { id: "ID", name: "ID" }, { id: "IL", name: "IL" }, { id: "IN", name: "IN" }, { id: "IA", name: "IA" }, { id: "KS", name: "KS" }, { id: "KY", name: "KY" }, { id: "LA", name: "LA" }, { id: "ME", name: "ME" }, { id: "MH", name: "MH" }, { id: "MD", name: "MD" }, { id: "MA", name: "MA" }, { id: "MI", name: "MI" }, { id: "MN", name: "MN" }, { id: "MS", name: "MS" }, { id: "MO", name: "MO" }, { id: "MT", name: "MT" }, { id: "NE", name: "NE" }, { id: "NV", name: "NV" }, { id: "NH", name: "NH" }, { id: "NJ", name: "NJ" }, { id: "NM", name: "NM" }, { id: "NY", name: "NY" }, { id: "NC", name: "NC" }, { id: "ND", name: "ND" }, { id: "MP", name: "MP" }, { id: "OH", name: "OH" }, { id: "OK", name: "OK" }, { id: "OR", name: "OR" }, { id: "PW", name: "PW" }, { id: "PA", name: "PA" }, { id: "PR", name: "PR" }, { id: "RI", name: "RI" }, { id: "SC", name: "SC" }, { id: "SD", name: "SD" }, { id: "TN", name: "TN" }, { id: "TX", name: "TX" }, { id: "UT", name: "UT" }, { id: "VT", name: "VT" }, { id: "VI", name: "VI" }, { id: "VA", name: "VA" }, { id: "WA", name: "WA" }, { id: "WV", name: "WV" }, { id: "WI", name: "WI" },{ id: "WY", name: "WY" }],

		// Properties
		isComplete: function(){
			if(
				this.get('model.firstName')
				&& this.get('model.lastName')
				&& this.get('model.address')
				&& this.get('model.zipCode')
				&& this.get('model.city')
				&& this.get('model.state')
				&& this.get('model.dateOfBirth')
				)
				return true
		}.property(
			'model.firstName',
			'model.lastName',
			'model.address',
			'model.zipCode',
			'model.city',
			'model.state',
			'model.dateOfBirth')
	});

	App.FinancialController = Ember.Controller.extend({

		// Attributes
		showInvalid: 		false,
		incomeSources: 		[ { id: 0, name: 'Employed' },{ id: 1, name: 'Unemployed' },{ id: 2, name: 'Self Employed' },{ id: 3, name: 'Student' },{ id: 4, name: 'Disabled' },{ id: 5, name: 'Retired' },{ id: 6, name: 'Military' },{ id: 7, name: 'Other' }],
		accountTypes: 		[ { id: 0, name: 'Checking' },{ id: 1, name: 'Savings' },{ id: 2, name: 'Both' },{ id: 3, name: 'Neither' }],
		residenceStatuses: 	[ { id: 0, name: 'Rent' },{ id: 1, name: 'Own' },{ id: 2, name: 'Other' }],


		// Properties
		isOtherIncomeSource: 		Ember.computed.equal('model.incomeSource', 7),

		isOtherResidenceStatuses: function(){
			var status = this.get('model.residenceStatus');
			if(status == 0 || status == 2)
				return true;
		}.property('model.residenceStatus'),

		isComplete: function(){
			if(
				typeof this.get('model.incomeSource') === 'number'
				&& this.get('model.employer')
				&& typeof this.get('model.accountType') === 'number'
				&& this.get('model.grossAnnualIncome')
				&& typeof this.get('model.residenceStatus') === 'number'
				)
				return true
		}.property(
			'model.incomeSource',
			'model.employer',
			'model.accountType',
			'model.grossAnnualIncome',
			'model.residenceStatus')
	});

	App.ContactController = Ember.Controller.extend({

		// Attributes
		showInvalid: 		false,

		isComplete: function(){
			if(this.get('model.primaryPhone') && this.get('model.email'))
				return true
		}.property(
			'model.primaryPhone',
			'model.email')
	});

	App.SecurityController = Ember.Controller.extend({

		// Attributes
		showInvalid: 		false,

		isComplete: function(){
			if(this.get('model.socialSecurityNumber') && this.get('model.securityAnswer'))
				return true
		}.property(
			'model.socialSecurityNumber',
			'model.securityAnswer')
	});

})();