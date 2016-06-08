var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var md5 = require('md5');

var verifySchema = new Schema({
	name : String,
	username :String,
	password :String,
	email 	: String,
	image : String,
	agency : String,
	agencyName : String,
	city : String,
	telephone :  String,
	dateCreated : Date,
	isVerified : Boolean,
	emailCode : String,
	deviceId : String,
	deviceName : String,
	lat:Number,
	lon:Number,
	notify : Boolean
});



verifySchema.statics.login = function login(data, deviceInfo) {
	data.password = md5(data.password);
	var defered = Q.defer();
		this.findOne(data,{"__v" : 0}, function (err,result){
		if(result == null){
			defered.resolve({"code" : 'IC','message':'No User Found. Did You verified yourself?'});
		}else{
			if(!err){
				result.deviceId = deviceInfo.deviceId;
				result.deviceName = deviceInfo.deviceName;
				result.save(function (error, userInfo){
					if(error){
						defered.reject(false);
					}else{
						defered.resolve(userInfo);
					}
				})
			}else{
				defered.reject(false);
			}
		}
	});

	return defered.promise;
};

verifySchema.statics.register = function register(data){
	data.password = md5(data.password);
	var newUser = new (mongoose.model('verifyModel'))(data);
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


var verifyModel = mongoose.model('verifyModel', verifySchema);
module.exports = verifyModel;