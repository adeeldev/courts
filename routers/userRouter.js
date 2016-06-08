var express = require('express'),
	router = express.Router(),
	userModel = require('../models/userModel'),
	verifyModel = require('../models/verifyModel'),
	adminModel = require('../models/adminModel'),
	moment = require('moment'),
	helperFun = require('../lib/helperFunc'),
	md5 = require('md5');
router.get('',function (request,response){
	userModel.find({},{"__v" : 0, "password" : 0, "emailCode" : 0},function (err,result){
		if(err){
			return response.status(500).send({"message" : "Internal Server Error" , "err" : err}).end();
		}
		response.status(200).send(result).end();
	})
})
router.get('/eventNotification',function (request,response){
	userModel.find({},{"__v" : 0, "password" : 0, "emailCode" : 0},function (err,result){
		if(err){
			return response.status(500).send({"message" : "Internal Server Error" , "err" : err}).end();
		}
		response.status(200).send(result).end();
	})
});
router.post('/login', function (request, response){ 
		var data = {
			"email" : request.body.email,
			"password" : request.body.password,
			"isVerified" : true
		};
		var deviceInfo = {
			deviceId : request.body.deviceId,
			deviceName : request.body.deviceName,
			lat : request.body.lat,
			lon : request.body.lon
		};
		if((data.email == null || "") && (data.password == null || "")){
			response.status(400).send({"message" : "Parameters are missing."}).end();
		}else{
			userModel.login(data,deviceInfo)
			.then(function(result){
				console.log("Successfully Logged In...");
				if(result.code == 'IC'){
					response.status(400).send({"message" : result.message}).end();
				}else{
					response.status(200).send({data : result}).end();
				}
			})
			.catch(function(err){
				console.log("Login Unsuccessful...");
				response.status(500).send({"message" : "Server Error. Please try again later...", "err" : err});
			})

		}
});
router.post('/register', function (request,response){
	var data = {
		username : request.body.username,
		password : request.body.password,
		image : request.body.image,
		email : request.body.email,
		agency : request.body.agency,
		agencyName : request.body.agencyName,
		city : request.body.city,
		telephone : request.body.telephone,
		dateCreated : moment().format('MM-DD-YYYY h:mm a'),
		isVerified : false,
		emailCode : helperFun.randomCode(6),
		deviceId : request.body.deviceId,
		deviceName: request.body.deviceName,
		notify : false
	}
	console.log(data);
	if((data.username == null || "") && (data.password == null || "") && (data.email == null || "") && (data.city == null || "") && (data.telphone == null || "")){
		response.status(400).send({"message" : "Parameters are missing."}).end();
	}else{
		//SARUH23500001
		userModel.findOne({'email':data.email},function (err, user){	
			if(err){
					response.status(400).send({"message" : err}).end();
			}
			if(user){
					return response.status(400).send({"message" : 'Email already exists'}).end();
			}	
			verifyModel.register(data)
			.then(function (result){
				var message = "Please Use this Authentication code : " + data.emailCode,
					subject = "Footbal court";
				response.status(200).send({"message" : "User Added.", "user" : result.user}).end();
				return helperFun.emailSender(data.email, message, subject);
				return true;
			})
			.then(function (data){
				console.log("Email is send to the user.");
			})
			.catch(function (error){
				if(error.code == "U-Reg"){
					//if had error in userRegistration
					if(error.err.code == 11000){	//if user Already exist
						var message = error.err.message.split('{');
						errorKey = message[1].replace('}',"");
						errorKey = errorKey.replace(':',"");
						errorKey = errorKey.split('"').join('') + ' Already exist.';
						return response.status(400).send({"message" : errorKey}).end();
					}
					response.status(500).send({"message" : "Server Error. Please try agian later...", "err" : error}).end();
				}else if(error.code == "SM:Err"){
					//if had error error in sending mail
					console.log(error);
					console.log("Email Not send.");
				}else{
					console.log("Other Error : "+ error);
				}
			})
		})
	}
	
});

// router.post('/verify',function (request,response){
// 	var user_id = request.body.id,
// 		code = request.body.code;
// 	if((user_id == null || "") || (code == null || "")){
// 		response.status(400).send({"message" : "Parameters are missing."}).end();
// 	}else{
// 		userModel.verifyCode(user_id,code)
// 		.then(function (result){
// 			console.log("Result : " + result);
// 			response.status(200).send(result).end();
// 		}).catch(function (err){
// 			console.log("Error : " + err);
// 			if (err.code === 1) {
// 				response.status(500).send({"message" : "Database Err. Please try again later", "err" : err}).end();
// 			} else{
// 				response.status(400).send({"message" : err.text}).end();
// 			}
// 		})
// 	}
// });

router.post('/verify',function (request,response){
	var code = request.body.code;
	if((code == null || "")){
		response.status(400).send({"message" : "Parameters are missing."}).end();
	}
	verifyModel.findOne({'emailCode':code},function (err, result){
		if(err){
			return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
		}
		if(result == null){
			return response.status(400).send({"message": "Invalid Verification Code"}).end();
		}

		var data = {
			username : result.username,
			password : result.password,
			email : result.email,
			city : result.city,
			telephone : result.telephone,
			dateCreated : result.dateCreated,
			isVerified : true,
			emailCode : result.emailCode,
			deviceId : result.deviceId,
			deviceName: result.deviceName,
			image : result.image,
			lat: result.lat,
			lon: result.lon,
			notify : true
		}
		console.log(data);
		var newUser = new userModel(data);
		// userModel.emailCode = helperFun.randomCode(6);
		newUser.save(function (err,newUser){
			if(err){
				return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
			}
				return response.status(200).send(newUser).end();			
		})
	});	
});

router.post('/addAdmin',function (request,response){
	var subAdmin = {
			username : request.body.username,
			password : md5(request.body.password),
			email    : request.body.email,
			location : request.body.location,
			noOfSlots : request.body.slots,
			type	 : 'subAdmin'
	}
	if((subAdmin.username == null || "")){
		response.status(400).send({"message" : "Parameters are missing."}).end();
	}
	adminModel.findOne({'email':subAdmin.email},function (err, result){
		if(err){
			return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
		}
		if(result == null){
		console.log(subAdmin);
		var newUser = new adminModel(subAdmin);
		newUser.save(function (err,newUser){
			if(err){
				return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
			}
				var message = "we have sent you email and password. Please use this email and password to login in admin panel",
				subject = "Login Credentials";
				message = message + ' email ' + subAdmin.email + "  password " + request.body.password;
				helperFun.emailSender(subAdmin.email, message, subject);
				// response.status(200).send({"message":"success"});	
				return response.status(200).send(newUser).end();			
		})
		}

	});	
});


router.post('/removeUser', function (request,response){
	var _id = request.body.user_id;
	if(_id == null || ""){
		response.status(400).send({"message": "Parameter Missing"}).end();
	}else{
		userModel.findOneAndRemove({"_id" : _id},function (err,result){
			if(err){
				console.log("An Error has occured." + err);
				return response.status(500).send({"message" : "Server Error . Please try Agin Later." , "err" : err}).end();
			}
			response.status(200).send({"message" : "Deleted Successfully."}).end();
		});
	}
});
router.post('/forgot',function (request,response){
	var email = request.body.email;
	if(email == "" || null){
		return response.status(400).send({"message": "Parameter Missing OR Invalid Parameter"}).end();
	}
	userModel.findOne({'email':email},function (err, result){
		if(err){
			return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
		}
		if(result == null){
			return response.status(400).send({"message": "Invalid Email"}).end();
		}
		result.reserToken = helperFun.randomCode(6);
		result.save(function (err,newUser){
			if(err){
				return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
			}
			var message = "You have requested to have your password reset for your account. Please visit this url to reset your password:: ",
				subject = "Forget Password Request";
				message = message + "http://104.236.44.223:3500/#!/reset/"+ newUser.reserToken;
				helperFun.emailSender(email, message, subject);
			response.status(200).send({"message":"success"});	
		})
	});
});

router.post('/reset',function (request,response){
	var resetToken = request.body.token;
	var password = request.body.password;
	console.log(resetToken);
	if(resetToken == "" || null){
		return response.status(400).send({"message": "Parameter Missing OR Invalid Parameter"}).end();
	}
	userModel.findOne({'reserToken':resetToken},function (err, result){
		if(err){
			return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
		}
		if(result == null){
			return response.status(400).send({"message": "Invalid Email"}).end();
		}
		result.password = md5(password);
		result.save(function (err,newUser){
			if(err){
				return response.status(500).send({"message": "Internal Server Error","err" : err}).end();
			}
		response.status(200).send({"message":"success"});
		})
	});
});

router.post('/changePassword',function (request,response){
	var password = request.body.password,
		email = request.body.email,
		code = request.body.code;
	if((password == null || '') || (password == null || '') || (code == null || '')){
		return response.status(400).send({"message" : "Parameter Missing"}).end();
	}
	userModel.findOne({"email" : email, "emailCode" : code},function (err,User){
		if(err){
			return response.status(500).send({"message" : "Internal Server Error", "err" : err}).end();
		}
		if(User == null){
			return response.status(400).send({"message" : "Invalid Email OR Code"}).end();
		}
		User.password = md5(password);
		User.save(function (error,result){
			if(error){
				return response.status(500).send({"message" : "Internal Server Error", "err" : error}).end();
			}
			delete result.__v;
			response.status(200).send(result).end();	
		})
	})
});
router.post('/updateUser', function (request,response){
	var data = request.body;
	var user_id = data.user_id,
		username = data.username,
		email = data.email,
		city = data.city,
		telephone = data.telephone;
	if((data.username == null || "") && (data.email == null || "") && (data.telphone == null || "")){
		response.status(400).send({"message" : "Parameters are missing."}).end();
	}else{
	userModel.findOne({"_id" : user_id},function (err,User){
		if(err){
			return response.status(500).send({"message" : "Internal Server Error", "err" : err}).end();
		}
		if(User == null){
			return response.status(400).send({"message" : "Invalid Email OR Code"}).end();
		}
		User.username = username;
		User.email = email;
		User.city = city;
		User.telephone = telephone;
		User.save(function (error,result){
			if(error){
				return response.status(500).send({"message" : "Internal Server Error", "err" : error}).end();
			}
			var message = "Your User name is updated.Your new Username is : " + result.username;
			var subject = "Profile Update";
			// helperFun.emailSender(result.email, message, subject)
			// 	.then(function (result){
			// 		console.log("Email is sent.");
			// 	})
			// 	.catch(function (error){
			// 		console.log(error);
			// 	})
			delete result.__v;
			response.status(200).send(result).end();	
		})
	})
	}
});
router.post('/switchNotify', function (request,response){
	var id = request.body.id;
	var action = request.body.action;
	if((id == "" || null) || (action == '' || null)){
		return response.status(400).send({'message' : "Parameters are missing"}).end();
	}
	userModel.findOne({"_id" : id},function (error,user){
		if(error){
			return response.status(500).send({'message' : "Internal Server error. Please try again later.",'err' : error}).end();
		}
		if(user == null){
			return response.status(400).send({'message' : "Invalid User ID"}).end();	
		}
		user.notify = action;
		user.save(function (err, updatedUser){
			if(err){
				return response.status(500).send({'message' : "Internal Server error. Please try again later.",'err' : err}).end();
			}
			response.status(200).send({'user' : updatedUser}).end();
		})
	});
});
router.post('/testing', function (request,response){
	var length = request.body.num;
	var rand = helperFun.randomCode(length);
	response.status(200).send({"Random Number" : rand.toString(), "length" : rand.toString().length}).end();
});
router.get('/participation/:id', function (request,response){
	var id = request.params.id;
	questionModel.find({'userAnswer.user._id' : id},{'question' : 1, 'correctAnswer' : 1,'userAnswer.user': 1,'userAnswer.answer' : 1,'userAnswer.date' :1},function (err,result){
		if(err){
			return response.status(500).send({'message' : 'Internal Server Error. Please Try again later',"err" : err}).end();
		}
		if(result.length == 0){
			return response.status(200).send({'message' : 'No Participation'}).end();
		}
		var userParticipation = [];
		for(var i = 0;i < result.length;i++){
			for(var j = 0; j<result[i].userAnswer.length;j++){
				if(result[i].userAnswer[j].user._id == id){
					var userObj = {
						'question' : result[i].question,
						'correctAnswer' : result[i].correctAnswer,
						'user' : result[i].userAnswer[j]
					};
					userParticipation.push(userObj);
					break;
				}
			}
		}
		response.status(200).send(userParticipation).end();
	})
})
module.exports = router;
