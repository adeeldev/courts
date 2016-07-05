var promotionModel = require('../models/promotionModel'),
	adminModel = require('../models/adminModel'),
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
	.post('/allPromotions',function (request,response){
		var date = Date.now();
		var userid = request.body.userid;
		var userType =  request.body.type;
		console.log(userid);
		if (userType == 'subAdmin'){
			promotionModel.find({'subAdmin' : userid },{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
				if(err){
					console.log(err);
					return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
				}
				if(result.length==0){
					return response.status(200).send({"message" : "No data found."}).end();
				}
				response.status(200).send(result).end();
			})
		}
		if (userType == 'admin'){
		promotionModel.find({},{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			response.status(200).send(result).end();
		})
	}
	})

	.post('/allcourts/location',function (request,response){
		var location = request.body.location;

		promotionModel.find({"location" : location},{'__v': 0},function (err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			response.status(200).send({'data': result}).end();
		})
	})
	.get('/locations',function (request,response){
		promotionModel.find({}).select('location _id').exec(function (err, result) {
		//promotionModel.find({},{'__v': 0},function (err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			response.status(200).send({'data': result}).end();
		})
	})
	.get('/allCourts',function (request,response){
		var date = Date.now();
		promotionModel.find({},{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			console.log(result);
			response.status(200).send({'data': result}).end();
		})
	})
	.get('/subAdmins',function (request,response){
		// var date = Date.now();'type': 'subAdmin'
		adminModel.find({},{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			response.status(200).send({result}).end();
		})
	})
	.get('/:userid',function (request,response){
		var date = Date.now();
		var userid = request.params.userid;
		promotionModel.find({'userid' :userid },{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			response.status(200).send({'data': result}).end();
		})
	})
	.get('/:id', function(request,response){
		var id = request.params.id;
		if(id == '' || null){
			return response.status(400).send({"message" : "Parameter missing"}).end();
		}
		promotionModel.findOne({"_id" : id},{'__v': 0},function (err,promotion){
			if(err){
				return response.status(500).send({"message" : "Internal server error.","code": "PE-One", "err" : err}).end();
			}
			if(promotion == null){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			response.status(200).send(promotion).end();
		})
	})

	.get('/allCourts',function (request,response){
		var date = Date.now();
		promotionModel.find({},{'__v' : 0}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			response.status(200).send({'data': result}).end();
		})
	})

	.post('/courts',function (request,response){
		var date = Date.now();
		promotionModel.find({},{'title' : 1}).sort({date : '-1'}).exec(function	(err,result){
			if(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal server error.","code": "PE-ALL","err" : err}).end();
			}
			if(result.length==0){
				return response.status(200).send({"message" : "No data found."}).end();
			}
			console.log(result);
			response.status(200).send(result).end();
		})
	})

	.post('/addCourtAdmin',multipartMiddleware,function (request,response){
		var description = request.body.description,
			title = request.body.title,
			location = request.body.location,
			subAdmin = request.body.subAdmin,
			// price = request.body.price,
   //          size = request.body.size,
            slots = request.body.slots,
   //          facility = request.body.facility,
            userid = request.body.userid,
            user_email = request.body.email
			date = Date.now(),
			url = request.body.url;
		if((title == "" || null)  || (description == "" || null)){
			return response.status(400).send({"message" : "Parameter Missing"});
		}else{
			var newProm = new promotionModel({
						"title" : title,
						"description" : description,
						"date" : date,
						'subAdmin'  : subAdmin,
						"slots" : slots,
						"url" : url,
						'location' : location,
						"userid" : userid,
						"user_email" : user_email
					});

					newProm.save(function (error,result){
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
	.post('/addPromotion',multipartMiddleware,function (request,response){
		var description = request.body.description,
			title = request.body.title,
			expireDate = helperFunc.getDateFunction(request.body.expireDate),
			date = helperFunc.getDateFunction(request.body.date),
			file = request.files.file_0;
		if((title == "" || null) ||(expireDate == "Invalid Date") || (date == "Invalid Date") || (file == null) || (description == "" || null)){
			return response.status(400).send({"message" : "Parameter Missing"});
		}else{
			var id = mongoose.Types.ObjectId(),
				fileData = helperFunc.getFileProp(id,"promotions",file);
			try{
				if(!fs.existsSync(fileData.destPath)){
				fs.mkdirSync(fileData.destPath);
			}
			var des = path.resolve(path.join(fileData.destPath,fileData.filename));
			fs.createReadStream(file.path)
				.pipe(fs.createWriteStream(des).on('close', function (err,result){
					if(err){
						return response.status(500).send({"message" : "Internal Server error. Please try again later.", "err" : err}).end();
					}
					var newProm = new promotionModel({
						"_id" : id,
						"title" : title,
						"description" : description,
						"expireDate" : expireDate,
						"date" : date,
						"url" : helperFunc.serverBaseURL() + fileData.dbPath
					});
					newProm.save(function (error,result){
						if (error) {
							return response.status(500).send({"message" : "Internal Server error. Please try again later.", "err" : error}).end();
						}
						response.status(200).send(result).end();
					})
				}))
			}catch(err){
				console.log(err);
				return response.status(500).send({"message" : "Internal Server error. Please try again later.","err" : err}).end();
			}
		}
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
