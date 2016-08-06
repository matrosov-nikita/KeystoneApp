var keystone = require('keystone');
var Types = keystone.Field.Types;


var SportEvent = new keystone.List('SportEvent');

SportEvent.add({
	header: {
		type: Types.Text,  
		required: true, 
		index: true, 
		initial: true,
		label: "Название"
	},
	description: {
		type: Types.Markdown, 
		required: true, 
		initial: true,
		label: "Описание"
	},
	category: {
		type: Types.Relationship,
		ref: 'SportCategory',
	},
	personMinCount: {
		type: Types.Number, 
		required: true, 
		default: 0,
		label: "Минимальное количество человек"
	},
	personMaxCount: {
		type: Types.Number, 
		required: true, 
		default: 0,
		label: "Максимальное количество человек"
	},
	costPerPerson: {
		type: Types.Money, 
		require: true, 
		label: "Стоимость на человека" 
	}
});


SportEvent.defaultColumns = 'header, description, personMinCount, personMaxCount, costPerPerson';
SportEvent.register();