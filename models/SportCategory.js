var keystone = require('keystone');
var Types = keystone.Field.Types;


var SportCategory = new keystone.List('SportCategory');

SportCategory.add({
	name: {type: Types.Text,  required: true, index: true},
	image: {type: Types.CloudinaryImage}
});


SportCategory.defaultColumns = 'header';
SportCategory.register();