var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var moment = require('moment');
var bookingSchema = new Schema({
	firstname :  String,
	lastname : String,
	email : String,
	userid : String,
	mobileNumber : String,
	country : String,
	city : String,
	credit_card_number : String,
	cvcNumber : String,
	expirtDate : String,
	price : String,
	totalPrice : String,
	duration : String,
	courtName : String,
	courtId : String,
	Slot_number : String,
	isVerify : String,
	created: {
		type: Date,
		default: Date.now 
	}
});

bookingSchema.statics.getYearEvents = function getYearEvents (year){
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
bookingSchema.statics.getMonthEvents = function getMonthEvents(year,month){
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

bookingSchema.statics.addEvent = function addEvent(data){
	var defered = Q.defer();
	// data.eventDate = new Date(data.eventDate);
	var newEvent = mongoose.model('BookingSchema');
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

var bookingSchema = mongoose.model('BookingSchema', bookingSchema);
module.exports = bookingSchema;