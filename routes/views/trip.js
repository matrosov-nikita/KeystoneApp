var keystone = require('keystone');
var Trip = keystone.list('Trip');
var MS_IN_DAY = 24 * 60 * 60 * 1000;

module.exports = {
    createTrip: function(req, res, next) {

        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }
        var view = new keystone.View(req, res);
        var currDate = new Date(+req.query.date);
        currDate.setHours(0, 0, 0, 0);
        currDate.addHours(-3);
        var nextDay = new Date(currDate.getTime() + MS_IN_DAY);
        Trip.model.find({"startDate": {"$gte": currDate, "$lte": nextDay }, "category": req.query.category}).exec(function(err, events) {
            if (err) {
                return null;
            }
            events = events.map(function(event) {
                event.startDate = event.startDate.addHours(3);
                event.finishDate = event.finishDate.addHours(3);
                return event;
            });
            view.render('trip', {
                "trips" : events,
                "date" : +req.query.date,
                "category": req.query.category
            });
        });      
    },

    getTripsByDate: function(req, res, next) {
        var events = Trip.model.find({isTrainer: true}).exec(function(err, events) {
            if (err) {
                return null;
            }
            res.json(events);
        });
    },

    sendTrip: function(req, res, next) {
        var newTrip = new Trip.model();
        var updater = newTrip.getUpdateHandler(req);
        updater.process(req.body, null, function(err) {
            err ? res.send(err) :  res.send(true);
        });     
    }
}