var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var moment = require('moment');
var eventSchema = new Schema({
	eventDate :  Date,
	eventTitle : String,
	eventLocation : String,
	eventDescription : String,
	created: {
		type: Date,
		default: Date.now 
	}
});

eventSchema.statics.getYearEvents = function getYearEvents (year){
	var defered = Q.defer();

	var startDate = new Date();
		startDate.setFullYear(year),
		startDate.setMonth(0),
		startDate.setDate(1);
	var endDate = new Date();
		endDate.setFullYear(year),
		endDate.setMonth(11),
		endDate.setDate(31);
	
	this.find({$and :[{"eventDate":{$gte : startDate}},{"eventDate":{$lte : endDate}}]},{"__v":0}).sort({eventDate: '-1'}).exec(function (err,result){
		if(err){
			defered.reject(err);
		}else{
			defered.resolve(result);
		}
	})
	return defered.promise;
}
eventSchema.statics.getMonthEvents = function getMonthEvents(year,month){
		var defered = Q.defer(),

			startDate = new Date();
			startDate.setFullYear(year),
			startDate.setMonth(month-1),
			startDate.setDate(1);
		var endDate = new Date();
			endDate.setFullYear(year),
			endDate.setMonth(month-1),
			endDate.setDate(31);
		this.find({$and :[{"eventDate":{$gte : startDate}},{"eventDate":{$lte : endDate}}]},{"__v" : 0}).sort({eventDate: '-1'})
		.exec(function (err,events){
			if(err){
				defered.reject(err);
			}else{
				defered.resolve(events);
			}
		});
		return defered.promise;
}
eventSchema.statics.getDateEvent = function getDateEvent(year,month,date){
	var defered = Q.defer();
	var dayStartEvents = moment(month + '-' + date + '-' + year + ' 12:00 AM', 'MM-DD-YYYY hh:mm a');
		// dayStartEvents.setFullYear(year),
		// dayStartEvents.setMonth(month - 1),
		// dayStartEvents.setDate(date),
		// dayStartEvents.setHours(00),
		// dayStartEvents.setMinutes(00),
		// dayStartEvents.setSeconds(00),
		// dayStartEvents.setMilliseconds(0000);

	var dayEndEvents = moment(month + '-' + date + '-' + year + ' 11:59 PM', 'MM-DD-YYYY hh:mm a');
		// dayEndEvents.setFullYear(year),
		// dayEndEvents.setMonth(month - 1),
		// dayEndEvents.setDate(date),
		// dayEndEvents.setHours(23),
		// dayEndEvents.setMinutes(59),
		// dayEndEvents.setSeconds(59),
		// dayEndEvents.setMilliseconds(999);
		// console.log(dayEndEvents.toString());
		// console.log(dayStartEvents.toString());
	this.find({$and :[{"eventDate":{$gte : dayStartEvents}},{"eventDate":{$lte : dayEndEvents}}]},{"__v" : 0}).sort({eventDate: '-1'}).exec(function (err,result){
		if(err){
			defered.reject(err);
		}else{
			console.log(result);
			defered.resolve(result);
		}
	});
	return defered.promise;
}
eventSchema.statics.addEvent = function addEvent(data){
	var defered = Q.defer();
	// data.eventDate = new Date(data.eventDate);
	var newEvent = mongoose.model('EventModel');
	var Event  = new newEvent(data);
	Event.save(function (err,event){
		if(err){
			console.log(err);
			defered.reject(err);
		}else{
			delete event.__v;
			defered.resolve(event);
		}
	});
	return defered.promise;
}

var eventModel = mongoose.model('EventModel', eventSchema);
module.exports = eventModel;