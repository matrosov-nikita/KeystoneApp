
var keystone = require('keystone');
var SportEvent = keystone.list('SportEvent');


module.exports = {

	getAllEvents: function(req, res, next) {
		var view = new keystone.View(req, res);
		view.query('sportevents', SportEvent.model.find().populate('category'));
		view.render('index');
	},

	getEventById: function(req, res, next) {
		var view = new keystone.View(req, res);
		view.query('sportevent', SportEvent.model.findOne({_id: req.params.id}).populate('category'));
		view.render('event');
	}
}


