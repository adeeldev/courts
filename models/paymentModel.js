var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var moment = require('moment');

var paymentSchema = new Schema({
	uid  : String,
	payType : String,
	amount  : String,
	created: {
		type: Date,
		default: Date.now 
	}
});

paymentSchema.statics.register = function register(data){

	var newUser = new (mongoose.model('PaymentModel'))(data);
	var defered = Q.defer();

	newUser.save(function (err,result){
		if(err){
			defered.reject({code : "U-Reg" , err : err});
		}else{
			defered.resolve({code : "U-Reg-SU" , "user" : result});
		}
	});
	return defered.promise;
};

var paymentModel = mongoose.model('PaymentModel', paymentSchema);
module.exports = paymentModel;