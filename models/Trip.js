var keystone = require('keystone');
var Types = keystone.Field.Types;


var Trip = new keystone.List('Trip');

Trip.add({
	peopleAmount: {
        type: Types.Number,
        required: true,
        default: 0
	},
	dateFrom: {
		type: Types.Date, 
		required: true, 
        default: Date.now
	},

    dateTill: {
        type: Types.Date,
        required: true, 
        default: Date.now
    },

    trainer: {
        type: Types.Relationship,
        ref: 'User'
    },

    extraInfo: {
        type: Types.Text,
        default: ""
    }
});

Trip.defaultColumns='peopleAmount, dateFrom, dateTill, trainer';
Trip.register();