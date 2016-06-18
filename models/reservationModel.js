var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
	name : String,
	number      : Number,
	date	 : String,
	startTime     : Date,
	endTime	 : String,
	court : String,
	notes : String,
	advancePayment : String,
	remainingPayment : String,
	checkin : {
		type: String,
		default : '0'
	},
	created: {
		type: Date,
		default: Date.now 
	}
});

var reservation = mongoose.model('reservationModel',reservationSchema);

module.exports = reservation; 