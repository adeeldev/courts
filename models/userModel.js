var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var md5 = require('md5');

var userSchema = new Schema({
	name : String,
	username : String,
	password : {type : String},
	image	 : String,
	email 	:String,
	agency : {type : String},
	agencyName : {type : String},
	city : {type : String},
	telephone : String,
	dateCreated : Date,
	isVerified : Boolean,
	emailCode : String,
	deviceId : String,
	deviceName : String,
	lat:Number,
	lon:Number,
	notify : Boolean,
	reserToken: String
});



userSchema.statics.login = function login(data, deviceInfo) {
	data.password = md5(data.password);
	console.log(data.password);
	var defered = Q.defer();
		console.log(data);
		this.findOne(data,{"__v" : 0}, function (err,result){
		if(result == null){
			defered.resolve({"code" : 'IC','message':'No User Found. email or password is incorrect.'});
		}else{
			if(!err){
				result.deviceId = deviceInfo.deviceId;
				result.deviceName = deviceInfo.deviceName;
				result.lat = deviceInfo.lat;
				result.lon = deviceInfo.lon;
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

userSchema.statics.register = function register(data){
	data.password = md5(data.password);
	var newUser = new (mongoose.model('UserModel'))(data);
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
userSchema.statics.verifyCode = function verifyCode(uid,code){
	var defered = Q.defer(),	
		query = {"_id" : uid,"emailCode" : code};

	this.findOne(query, function (err,result){
		if(err){
			defered.reject({code:1 , err: err});
		}else{
			if(result == null){
				defered.reject({code : 2,"text" : "Invalid Email OR Code"});
			}else{
				result.isVerified = true;
				result.notify = true;
				result.save(function (error , newUser){
					if(error){
						defered.reject({code:1 , error: error});		
					}
					else{
						defered.resolve(newUser);
					}
				})
			}
		}
	});
	return defered.promise;
}



var userModel = mongoose.model('UserModel', userSchema);
module.exports = userModel;