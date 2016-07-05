var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
	number: Number,
	email: String,
	title: String,
	date: Date,
	startsAt: Date,
	endsAt: Date,
	court: String,
	courtId: String,
	notes: String,
	first_name: String,
	last_name: String,
	address: String,
	city: String,
	postal_code: String,
	state: String,
	province: String,
	advancePayment: String,
	remainingPayment: String,
	date:String,
	timeTo: String,
	timeFrom: String,
	status: {
		type: String,
		default: 'pending'
	},
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
