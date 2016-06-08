var express = require('express');
var router = express.Router();
var moment = require('moment');
var eventModel = require('../models/eventModel');
var helperFunc = require('../lib/helperFunc');
var gcm = require('node-gcm');
router
	.get('', function (request, response){
		eventModel.find({},{'__v': 0},function (err,result){
			if(err){
				return response.status(500).send({'message' : "Internal Server Error", "err" : err})
			}
			response.status(200).send(result).end();
		})
	})
	.get('/:year', function (request, response){
		var year = request.params.year;
		eventModel.getYearEvents(year)
		.then(function (result){
			response.status(200).send(result);
		}).catch(function (err){
			console.log("Error : " + err);
			response.status(500).send({"code":"ET:Ye","message" : "An error has Occured while retrieving event data.", "err" : err}).end();
		})
	})
	.get('/:year/:month',function (request, response){
		var year = parseInt(request.params.year);
		var month = parseInt(request.params.month);
		var date = parseInt(request.query.incDate);
		if(isNaN(date)){
			if((isNaN(year) || year > 10000 || year < 2000) || (isNaN(month) || month > 12 || month < 1)){
				response.status(400).send({"code":"ET:IP","message" : "Invalid Parameters."}).end();
			}else{
				eventModel.getMonthEvents(year,month,date)
				.then(function (result){
					response.status(200).send(result).end();
				}).catch(function (err){
					console.log("Err : " + err);
					response.status(500).send({"code":"ET:YM","message" : "Having Error in Server", "err" : err}).end();
				})
			}
		}else{
			console.log('with date');
			if((isNaN(year) || year > 10000 || year < 2000) || (isNaN(month) || month > 12 || month < 1) || (isNaN(date) || date > 31 || date < 1)){
				response.status(400).send({"code":"ET:IP","message" : "Invalid Parameters."}).end();
			}else{
				eventModel.getDateEvent(year,month,date)
				.then(function (result){
					response.status(200).send(result).end();
				}).catch(function (err){
					console.log("Err : " + err);
					response.status(500).send({"code":"ET:YM","message" : "Having Error in Server", "err" : err}).end();
				})
			}
		}
		
	})
	

	.post('/addEvent', function (request, response){
		var toLocalTime = function(time) {
			var d = new Date(time);
			var offset = (new Date().getTimezoneOffset() / 60);
			var n = new Date(d.getTime() + offset);
			return n;
		};
		// var date = new Date();
		// var offset = date.getTimezoneOffset() / 60;
		var eventDate = toLocalTime(request.body.eventDate);
		// eventDate = eventDate + eventDate.getTimezoneOffset() / 60;
		// console.log(eventDate); 
		var newEvent = {
			"eventTitle" : request.body.eventTitle,
			"eventDate" : eventDate,
			"eventLocation" : request.body.eventLocation,
			"eventDescription" : request.body.eventDescription
		};
		if((newEvent.eventTitle == null || "") || (newEvent.eventDate == null || new Date(newEvent.eventDate) == "Invalid Date" || isNaN(new Date(newEvent.eventDate))) || (newEvent.eventLocation == null || "") || (newEvent.eventDescription == null || "")){
			return response.status(400).send({"message" : "Invalid Parameters OR Parameters are missing."}).end();
		}
		eventModel.addEvent(newEvent)
		.then(function (event){
			if(event == null){
				response.status(400).send({"code":"NE-Dup","message" : "Duplicate Event"}).end();
			}else{
				var message = newEvent.eventTitle + ": is added."
				helperFunc.sendNotification('event',message,function (error,result){
					if(error){
						console.log(error);
					}else{
						console.log("Notification is send");
					}
				})
				response.status(200).send({"data" : event}).end();
			}
		})
		.catch(function (err){
			console.log("Server error : " + err);
			response.status(500).send({"code": "NE-Se","message" : "Server Error. Please try agin later.", "err" : err}).end();
		})
	})
	.post('/updateEvent' , function (request,response){
		var id = request.body._id;
		if(id == null){
			return response.status(400).send("Parameters Are missing").end();
		}
		eventModel.findOne({"_id" : id},function (err, Event){
			if(err){
				return response.status(500).send({"message" : "Internal server Error", "err" : err}).end();
			}
			Event.eventDate = new Date(request.body.eventDate) || Event.eventDate;
			Event.eventTitle = request.body.eventTitle || Event.eventTitle;
			Event.eventLocation = request.body.eventLocation || Event.eventLocation;
			Event.eventDescription = request.body.eventDescription || Event.eventDescription;
			Event.save(function (error, result){
				if(error){
					console.log(error);
					return response.status(500).send({"message" : "Internal server Error", "err" : error}).end();
				}
				response.status(200).send(result).end();
			})
		})
	})
	.post('/deleteEvent', function (request, response){
		var id = request.body._id;
		if(id == null || ""){
			return response.status(400).send("Parameters Are missing").end();	
		}
		eventModel.findOneAndRemove({"_id" : id},function (err , result){
			if(err){
				return response.status(500).send({"message" : "Internal Server Error.","err" : err}).end();
			}
			response.status(200).send({"message" : "Ok", "result" : result}).end();
		})
	});	

module.exports = router;