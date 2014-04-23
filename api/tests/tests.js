// // Initialize tests
// document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
// //App.rootElement = '#application-container';
// App.setupForTesting();
// App.injectTestHelpers();


// // Helpers
// // ============================================================
// function exists(selector) {
// 	return !!find(selector).length;
// }

// function contains(selector, contents) {
// 	return find(selector).html().trim() === contents.trim();
// }


// // Tests
// // ============================================================
// test('Navigation on page', function() {
// 	App.reset();
// 	visit('/').then(function() {
// 		ok(exists('.application header'), 'Header exists');
// 		ok(contains('.application header .navigation li[data-state-selected="selected"]', 'About You'), 'First tab is highlighted');
// 	});
// });

// test('Index is rendering', function() {
// 	App.reset();
// 	visit('/').then(function() {
// 		ok(find('.content .field').length === 11, 'All the personal fields are visible');
		
// 		// First Name		
// 		fillIn('.content .field input[name="firstName"]', 'Jim');
// 		ok(App.get('applicant.firstName') === 'Jim', 'First name is being set on applicant');

// 		// Last Name
// 		andThen(function(){
// 			fillIn('.content .field input[name="lastName"]', 'Hall');
// 			ok(App.get('applicant.lastName') === 'Hall', 'Last name is being set on applicant');
// 		});

// 		// Middle Initial
// 		andThen(function(){
// 			fillIn('.content .field input[name="middleInitial"]', 'G');
// 			ok(App.get('applicant.middleInitial') === 'G', 'Middle initial is being set on applicant');
// 		});

// 		// Suffix
// 		andThen(function(){
// 			find('.content .field select[name="suffix"]').val(1).change();
// 			ok(App.get('applicant.suffix') == 1, 'Suffix is being set on applicant');
// 		});

// 		// Address
// 		andThen(function(){
// 			fillIn('.content .field input[name="address"]', '3019 W. Logan Blvd.');
// 			ok(App.get('applicant.address') === '3019 W. Logan Blvd.', 'Address is being set on applicant');
// 		});

// 		// Address Continued
// 		andThen(function(){
// 			fillIn('.content .field input[name="addressContinued"]', 'address 2');
// 			ok(App.get('applicant.addressContinued') === 'address 2', 'Address Continued is being set on applicant');
// 		});

// 		// Unit
// 		andThen(function(){
// 			fillIn('.content .field input[name="unit"]', '2');
// 			ok(App.get('applicant.unit') === '2', 'Unit is being set on applicant');
// 		});

// 		// Zip Code
// 		andThen(function(){
// 			fillIn('.content .field input[name="zipCode"]', '60647');
// 			ok(App.get('applicant.zipCode') === '60647', 'Zip Code is being set on applicant');
// 		});

// 		// State
// 		andThen(function(){
// 			find('.content .field select[name="state"]').val('IL').change();
// 			ok(App.get('applicant.state') == 'IL', 'State is being set on applicant');
// 		});

// 		// Date of birth
// 		andThen(function(){
// 			fillIn('.content .field input[name="dateOfBirth"]', '03/20/1988');
// 			ok(App.get('applicant.dateOfBirth') === '03/20/1988', 'Date Of Birth is being set on applicant');
// 		});

// 	});
// });

