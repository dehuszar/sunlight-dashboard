// Legislator
var attr 		= DS.attr,
	hasMany 	= DS.hasMany,
	belongsTo 	= DS.belongsTo;

var Legislator = DS.Model.extend({
	birthday:  		attr('string'),
	first_name: 	attr('string'),
	last_name: 		attr('string'),
	chamber: 		attr('string'),
	party: 			attr('string')
});

export default Legislator;