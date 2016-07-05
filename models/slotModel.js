var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var slotSchema = new Schema({
	slotNumber : Number,
	title      : String,
	status	 : String,
	userid     : String,
	courtid	 : String,
	courtImage : String,
	price: String,
	size: String,
	slots: String,
	facility : []  ,
	startDate : Date,
	endDate : Date,
	created: {
		type: Date,
		default: Date.now
	}
});

var slotModel = mongoose.model('slotModel',slotSchema);

module.exports = slotModel;
