var reservationModel = require('../models/reservationModel');
	express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	moment = require('moment'),
	mongoose = require('mongoose'),
	multipart = require('connect-multiparty'),
	multipartMiddleware = multipart(),
	path = require('path'),
	helperFunc = require('../lib/helperFunc');

router.post('/addReservation', function (request,response){
		var name = request.body.name,
			courtid = request.body.court,
			number  = request.body.number;
			advancePayment = request.body.advancePayment,
			remainingPayment = request.body.remainingPayment,
			startTime = request.body.startTime,
			endTime = request.body.endTime,
			notes = request.body.notes,
			date = request.body.resDate,
			checkin = '0';
		if(name == "" || null){
			return response.status(400).send({"message" : "Parameter Missing"});
		}else{
			var newSlot= new reservationModel({
						"name" : name,
						"court" : courtid,
						"number" : number,
						"advancePayment" : advancePayment,
						"remainingPayment" : remainingPayment,
						"startTime":startTime,
						"endTime" : endTime,
						"notes" : notes,
						"date" : date,
						"checkin" : checkin
					});
			console.log(newSlot);
					newSlot.save(function (error,result){
						if (error) {
							return response.status(500).send({"message" : "Internal Server error. Please try again later.", "err" : error}).end();
						}
						return response.status(200).send(result).end();
					})
		}
});	

router.get('/', function(request, response){

	reservationModel.find({ },{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
		if(err){
			console.log(err);
			return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
		}
		if(result.length==0){
			return response.status(200).send({"message" : "No data found."}).end();	
		}
		console.log(result);
		return response.status(200).send({result}).end();
	})
});

router.post('/deleteReservation', function(request, response){
	var id = request.body.id;	
	reservationModel.findOneAndRemove({_id : id },{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
		if(err){
			console.log(err);
			return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
		}
		if(result.length==0){
			return response.status(200).send({"message" : "No data found."}).end();	
		}
		console.log(result);
		return response.status(200).send({result}).end();
	})
});   


router.post('/checkin', function(request, response){
	var id = request.body.id;	
		// checkin = request.body.checkin;
		console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffff');
	if(id == null || ""){
		return response.status(400).send({"message" : "Id is Missing"});
	}
	// if(checkin == 1){
	// 	var updateDate = {
	// 	'checkin' : 0
	// 	}
	// }else{
		var updateDate = {
			'checkin' : 1
		}
	// }
	reservationModel.findOneAndUpdate({'_id' : id},updateDate,function (err,result){
		console.log('dddddddddddddddd');
		console.log(result);
		if(err){
			return response.status(500).send({"message" : "Internal server error.","code": "PE-PS-UP","err" : err}).end();
		}
		response.status(200).send(result).end();
	})
});



module.exports = router;