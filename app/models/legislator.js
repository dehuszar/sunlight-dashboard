// Legislator
var attr 		= DS.attr,
	hasMany 	= DS.hasMany,
	belongsTo 	= DS.belongsTo;

var Legislator = DS.Model.extend({
	firstName: 		attr('string'),
	lastName: 		attr('string'),
	party: 			attr('string'),
	bioguideId: 	attr('string')
});

export default Legislator;