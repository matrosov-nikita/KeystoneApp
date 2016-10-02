
var keystone = require('keystone');
var SportEvent = keystone.list('SportEvent');
var User = keystone.list('User');
var Trip = keystone.list('Trip');


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
    },

    getEventsByCategory: function(req, res, next) {
        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        };
        var events = Trip.model.find({category : req.query.category}).exec(function(err, events) {
            console.log(events);
             events = events.map(function(event) {
                event.startDate = event.startDate.addHours(3);
                event.finishDate = event.finishDate.addHours(3);
                return event;
             });
            if (err) {
                return null;
            }
            res.json(events);
        });
    },

    getTrainers: function(req, res, next) {
        var trainers = User.model.find({isTrainer: true}).select('-password').exec(function(err, trainers) {
            if (err) {
                return null;
            }
            res.json(trainers);
        });
        
    }
}


