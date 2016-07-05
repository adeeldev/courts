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
		var reservationsData = request.body;
		if(reservationsData == "" || null){
			return response.status(400).send({"message" : "Parameter Missing"});
		}else{
			var newSlot= new reservationModel({
						name: reservationsData.name,
						type: reservationsData.type,
						number: reservationsData.number,
						email: reservationsData.email,
						title: reservationsData.title,
						date: reservationsData.date,
						startsAt: reservationsData.startsAt,
						endsAt: reservationsData.endsAt,
						court: reservationsData.court,
						courtId: reservationsData.courtId,
						notes: reservationsData.notes,
						first_name: reservationsData.first_name,
						last_name: reservationsData.last_name,
						address: reservationsData.address,
						city: reservationsData.city,
						postal_code: reservationsData.postal_code,
						state: reservationsData.state,
						province: reservationsData.province,
						advancePayment: reservationsData.advancePayment,
						remainingPayment: reservationsData.remainingPayment,
						timeFrom: reservationsData.timeFrom,
						timeTo: reservationsData.timeTo,
						date: reservationsData.date
					});

			reservationModel
				.find({ $and:[{ 'timeFrom': request.body.timeFrom }, { 'timeTo': request.body.timeTo }, { 'date': request.body.date }]},{'__v' : 0}).sort({date : '-1'})
				.exec(function (err,rr){
				if(err){
					return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
				}
				if(rr.length != 0){
					return response.status(500).send({"message" : "Already exists."}).end();
				}
				newSlot.save(function (error,result){
					if (error) {
						return response.status(500).send({"message" : "Internal Server error. Please try again later.", "err" : error}).end();
					}
					return response.status(200).send(result).end();
				})
			})

		}
	});

	router.post('/getReservation', function(request, response){
		var courtId = request.body.court;
		reservationModel.find({'courtId': courtId},{'created' : 0, '__v': 0, 'number': 0, 'checkin': 0, 'notes': 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			return response.status(200).send(result).end();
		})
	});

	router.post('/allReservations', function(request, response){
		
		reservationModel.find({},{'created' : 0, '__v': 0, 'number': 0, 'checkin': 0, 'notes': 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			return response.status(200).send(result).end();
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

	router.get('/', function(request, response){

		reservationModel.find({ },{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			return response.status(200).send({result}).end();
		})
	});




	module.exports = router;
