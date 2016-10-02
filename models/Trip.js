var keystone = require('keystone');
var Types = keystone.Field.Types;


var Trip = new keystone.List('Trip');

Trip.add({
	peopleAmount: {
        type: Types.Number,
        required: true,
        default: 0
	},
	startDate: {
		type: Types.Datetime, 
		required: true, 
        default: Date.now
	},

    finishDate: {
        type: Types.Datetime,
        required: true, 
        default: Date.now
    },

    trainer: {
        type: Types.Relationship,
        ref: 'User',
        default: null
    },

    category : {
        type: Types.Relationship,
        ref : 'SportCategory',
        default: null
    },

    extraInfo: {
        type: Types.Text,
        default: ""
    }
});

Trip.defaultColumns='peopleAmount, startDate, finishDate, trainer';
Trip.register();