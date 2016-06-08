var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
	url : [],
	title : String,
	description : String,
	location : String,
	date : Date,
    price: String,
    size: String,
    slots: String, 
    facility : []  ,
    userid : String ,
    user_email : String,
    subAdmin : String
})

var promotionModel = mongoose.model('promotionModel',promotionSchema);

module.exports = promotionModel;