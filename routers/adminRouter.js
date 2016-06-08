var express = require('express'),
	router = express.Router(),
	adminModel = require('../models/adminModel'),
	moment = require('moment'),
	helperFun = require('../lib/helperFunc'),
	md5 = require('md5');

router

	.get('',function (request,response){
		adminModel.find({},{"__v" : 0, "password" : 0, "emailCode" : 0},function (err,result){
			if(err){
				return response.status(500).send({"message" : "Internal Server Error" , "err" : err}).end();
			}
			response.status(200).send(result).end();
		})
	})
	.post('/login',function (request,response){
		
		var username = request.body.username;
		var password = md5(request.body.password);
		if((username == null || '') || (password == '' || null)){
			return response.status(400).send({'message' : 'Parameters are missing'}).end();
		}
		adminModel.findOne({ $and:[ {'username':username}, {'password':password}]}, function (err,admin){
		
			if(err){
				return response.status(500).send({'message' : 'Internal Server error. Please try again later','err' :err}).end();
			}
			if(admin == null){
				return response.status(400).send({'message' : 'Invalid Username OR Password'}).end();
			}
			response.status(200).send(admin).end();
		})
	})
	.post('/update',function (request,response){
		var adminObj = request.body.admin;
	
		if(adminObj == null){
			return response.status(400).send({'message' : 'Parameters are missing'}).end();	
		}
		adminModel.findOne({"_id" : adminObj._id,'password' : md5(adminObj.password)},function (err,admin){
			if(err){
				return response.status(500).send({'message' : 'Internal Server error. Please try again later','err' :err}).end();
			}
			if(admin == null){
				return response.status(400).send({'message' : 'Invalid Password'}).end();	
			}
			admin.password = md5(adminObj.password);
			admin.username = adminObj.username;
			admin.firstName = adminObj.firstName;
			admin.lastName = adminObj.lastName;
			admin.email = adminObj.email;
			admin.save(function (error,adminNew){
				if(error){
					return response.status(500).send({'message' : 'Internal Server error. Please try again later','err' :err}).end();	
				}
				response.status(200).send(adminNew).end();
			})
		})
	})
	.post('/addAdmin', function (request,response){
		var admin = request.body.admin;
		if(admin == null || ''){
			return response.status(400).send({'message' : 'Parameters are missing'}).end();
		}
		admin.password = md5(admin.password);
		// admin.createdOn = moment().format('MM-DD-YYYY hh:mm a');
		var newAdmin = new adminModel(admin);
		newAdmin.save(function (err,result){
			if(err){
				return response.status(500).send({'message' : 'Internal Server error. Please try again later','err' :err}).end();
			}
			response.status(200).send(result).end();
		});
	})

module.exports = router;