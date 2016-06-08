var slotModel = require('../models/slotModel');
	express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	moment = require('moment'),
	mongoose = require('mongoose'),
	multipart = require('connect-multiparty'),
	multipartMiddleware = multipart(),
	path = require('path'),
	helperFunc = require('../lib/helperFunc');

router
	.post('/getSlots',function (request,response){
		var courtid = request.body.courtid;

			slotModel.find({'courtid' : courtid },{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
				if(err){
					console.log(err);
					return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
				}
				if(result.length==0){
					return response.status(200).send({"message" : "No data found."}).end();	
				}
				console.log(result);
				return response.status(200).send({'data': result}).end();
			})

	})

	.post('/allcourts/location',function (request,response){
		var location = request.body.location;

		slotModel.find({"location" : location},{'__v': 0},function (err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();	
			}
			response.status(200).send(result).end();
		})
	})	
	.get('/locations',function (request,response){
		slotModel.find({}).select('location _id').exec(function (err, result) { 
		//promotionModel.find({},{'__v': 0},function (err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();	
			}
			response.status(200).send(result).end();
		})
	})		
	.get('/allCourts',function (request,response){
		var date = Date.now();
		console.log(date);
		slotModel.find({},{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();	
			}
			response.status(200).send(result).end();
		})
	})
	.get('/:userid',function (request,response){
		var date = Date.now();
		var userid = request.params.userid;
		console.log(date);
		slotModel.find({'userid' :userid },{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();	
			}
			response.status(200).send(result).end();
		})
	})	
	.get('/:id', function(request,response){
		var id = request.params.id;
		if(id == '' || null){
			return response.status(400).send({"message" : "Parameter missing"}).end();
		}
		slotModel.findOne({"_id" : id},{'__v': 0},function (err,promotion){
			if(err){
				return response.status(500).send({"message" : "Internal server error.","code": "PE-One", "err" : err}).end();	
			}
			if(promotion == null){
				return response.status(200).send({"message" : "No data found."}).end();	
			}
			response.status(200).send(promotion).end();	
		})
	})
	.post('/addSlot', function (request,response){
		var title = request.body.title,
			// slotNumber = request.body.slotNumber,
			userid = request.body.userid,
			courtid = request.body.courtid,
			status = request.body.status,
			courtImage = request.body.courtImage,
			size = request.body.size,
			facility = facility,
			startDate = request.body.startDate,
			endDate = request.body.endDate,
			price = request.body.price,
			created = Date.now();
		if((title == "" || null)  || (endDate == "" || null)){
			return response.status(400).send({"message" : "Parameter Missing"});
		}else{
			var newSlot= new slotModel({
						"title" : title,
						// "slotNumber" : slotNumber,
						"userid" : userid,
						"courtid" : courtid,
						"status" : status,
						"courtImage":courtImage,
						"size" : size,
						"facility" : facility,
						"startDate" : startDate,
						"endDate" : endDate,
						"price" : price,
						"created" : created
					});
			console.log(newSlot);
					newSlot.save(function (error,result){
						if (error) {
							return response.status(500).send({"message" : "Internal Server error. Please try again later.", "err" : error}).end();
						}
						// var message = "New promotion added."
						// helperFunc.sendNotification('promotion',message,function (err,solution){
						// 	if(err){
						// 		console.log(err);
						// 	}else{
						// 		console.log("Notification Sent.");
						// 	}
						// })
						return response.status(200).send(result).end();
					})
		}
	})    
	.post('/changeSlot',function (request,response){
		console.log(request.body.data);
		var id = request.body.id,
			status = request.body.status;

		if(id == null || ""){
			return response.status(400).send({"message" : "Id is Missing"});
		}
		var updateDate = {
			'status' : status
		}

		slotModel.findOneAndUpdate({'_id' : id},updateDate,function (err,slots){
			console.log(slots);
			if(err){
				return response.status(500).send({"message" : "Internal server error.","code": "PE-PS-UP","err" : err}).end();
			}
			response.status(200).send(slots).end();
		})
	})	
	.post('/removePromotion',function (request,response){
		var id = request.body.id;
		if(id == '' || null){
			return response.status(400).send({"message" : "Parameter missing"}).end();
		}
		promotionModel.findOneAndRemove({'_id' : id},function (err,result){
			if(err){
				return response.status(500).send({"message" : "Internal server error.","code": "PE-PS-DEL","err" : err}).end();
			}
			response.status(200).send({"message" : "ok"}).end();
		})
	})
	.post('/updatePromotion',function (request,response){
		var id = request.body.id,
			description = request.body.description,
			expireDate = request.body.expireDate,
			title = request.body.title,
			date = request.body.date;

		if(id == null || ""){
			return response.status(400).send({"message" : "Id is Missing"});
		}
		var updateDate = {
			'title' : title,
			'description' : description,
			'expireDate' : expireDate,
			'date' : date
		}

		promotionModel.findOneAndUpdate({'_id' : id},updateDate,function (err,promotion){
			console.log(promotion);
			if(err){
				return response.status(500).send({"message" : "Internal server error.","code": "PE-PS-UP","err" : err}).end();
			}
			response.status(200).send(promotion).end();
		})
	})

module.exports = router;