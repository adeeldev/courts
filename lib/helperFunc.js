// my key = key-6704911661baf7b9441d6be158196d32
// my domian = sandbox4f4dbb04845c49dd816f7a2e9055c16f.mailgun.org
var _ = require ('lodash'),
	//mailer = require('nodemailer'),
	fs = require('fs'),
	Q = require('q'),
	path = require('path'),
	users = require('../models/userModel'),
	gcm = require('node-gcm'),
	mg = require('nodemailer-mailgun-transport'),
	apn = require('apn'),
	nodemailer = require('nodemailer');

	var api_key = 'key-8ceec1c7b51434f5d1300c67851a6b2a';
	var domain = 'sandboxd162fbc33a2e43a5af0459a2fe8870d4.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var helperFunctions = {
	randomCode : function (codeLength) {
		codeLength = codeLength || 5;
		var min = Math.pow(10,codeLength - 1);
		var max = (Math.pow(10,codeLength - 1) * 9) + (min - 1);
		var	num = Math.floor((Math.random() * max) + 1);
		console.log(max);
		var leng = num.toString().length;
		
		if(leng < codeLength){
			for(var i = 1; i <= codeLength - leng; i++){
				num = "0" + num;
			}
		}
		if(leng > codeLength){
			num = Math.floor(parseInt(num) / 10);
		}
		return num;
	},
	sendNotification : function(type,text, callback){
		// var message = new gcm.Message();
		// var data = {"type" : type,'message' : text};
		// message.addData('key1', data);
		// users.find({'notify' : true}, function(err, user){
		// 	if(err){
		// 		return response.status(500).send({"message" : "Internal server Error", "err" : err}).end();
		// 	}
		// 	if(user != "" || user != null){
		// 		// Set up the sender with you API key
		// 		var registrationIds = []; 
		// 		var registrationIdsIos = [];
		// 		var sender = new gcm.Sender('AIzaSyBPRtV5Vu1h6eHslzoZtczxR1ozd_40Xvc');
		// 		for (var i = 0;  i <= user.length - 1; i++) {
		// 			if(user[i].deviceName == "android"){
		// 				registrationIds.push(user[i].deviceId);
		// 			}else{
		// 				registrationIdsIos.push(user[i].deviceId);
		// 			}
		// 		};
		// 		var regIds = registrationIds;   		 
		// 		// Now the sender can be used to send messages   
		// 		sender.send(message, { registrationIds: regIds }, function (err, result) {
		// 		    if(err) callback(err);
		// 		    else{
		// 		    	console.log(result);
		// 		    	console.log(user);
		// 		    	callback(null,result);
		// 		    }
		// 		});
		// 		sender.sendNoRetry(message, { topic: '/topics/global' }, function (err, result) {
		// 		    if(err) callback(err);
		// 		    else callback(null,result);
		// 		})

		// 		var cert_and_key = require('fs').readFileSync('./config/ck.pem');
		// 			// Create a connection to the service using mostly default parameters.
		// 			var service = new apn.connection({				    
		// 					production: false,
		// 				    key: cert_and_key,
		// 				    cert: cert_and_key ,
		// 				    passphrase : 'name'
		// 			});
		// 			service.on("connected", function() {
		// 			    console.log("Connected");
		// 			});
		// 			service.on("transmitted", function(notification, device) {
		// 			    console.log("Notification transmitted to:" + device.token.toString("hex"));
		// 			});
		// 			service.on("transmissionError", function(errCode, notification, device) {
		// 			    console.error("Notification caused error: " + errCode + " for device ", device, notification);
		// 			    if (errCode === 8) {
		// 			        console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
		// 			    }
		// 			});
		// 			service.on("timeout", function () {
		// 			    console.log("Connection Timeout");
		// 			});
		// 			service.on("disconnected", function() {
		// 			    console.log("Disconnected from APNS");
		// 			});
		// 			service.on("socketError", console.error);
		// 			// If you plan on sending identical paylods to many devices you can do something like this.
		// 			function pushNotificationToMany() {
		// 			    console.log("Sending the same notification each of the devices with one call to pushNotification.");
		// 			    var note = new apn.notification();
		// 			    note.setAlertText(text);
		// 			    note.badge = 1;
		// 			    note.payload = {"key": type};
		// 			    service.pushNotification(note, registrationIdsIos);
		// 			}
		// 			pushNotificationToMany();	

		// 	}
		// })
	},
	getDateFunction : function(input){
		var d = new Date(input);
			year = d.getFullYear(),
			month = d.getMonth(),
			date = d.getDate(),
			h = d.getHours(),
			min = d.getMinutes(),
			utc = Date.UTC(year,month,date,h,min);
		console.log(utc);
		return utc;

	},
	emailSender : function(userEmail,message,subject){
		var defered = Q.defer();


		var data = {
			from: 'SaudiCourt <postmaster@sandboxd162fbc33a2e43a5af0459a2fe8870d4.mailgun.org>',
			to: userEmail,
			subject: 'Saudi Court',
			text: message
		};
		mailgun.messages().send(data, function (error, body) {
			if(error){
				console.log('Error in sending email');
			}
			console.log('ddd');
		});
		// var transporter = nodemailer.createTransport({
		//     service: 'gmail',
		//     auth: {
		//         user: 'testonebyte@gmail.com',
		//         pass: '1byte@biz'
		//     }
		// }, {
		//     // default values for sendMail method
		//     from: 'testonebyte@gmail.com',
		//     headers: {
		//         'My-Awesome-Header': '123'
		//     }
		// });
		// transporter.sendMail({
		//     to: userEmail,
		//     subject: subject,
		//     text: message
		// });

		// var defered = Q.defer();
		// var options = {
		// 	service:'gmail',
		// 	auth : {
		// 		user : "tkagencyapp@gmail.com",
		// 		pass : "fahad@123"
		// 	}
		// }
		// var transporter = mailer.createTransport(
		//    smtpTransport('smtps://tkagencyapp%40gmail.com:onebyte.biz@smtp.gmail.com',function (error,reposne){
		// 	if(error){
		// 		defered.reject(error);
		// 	}
		// 	else{
		// 		defered.resolve(reposne);
		// 	}
		// })
		// );
		// var transporter = mailer.createTransport(smtp(options));
		// transporter.sendMail({
		// 	from : "tkagencyapp@gmail.com",
		// 	to : userEmail,
		// 	subject : subject,
		// 	text : message
		// },function (error,reposne){
		// 	if(error){
		// 		defered.reject(error);
		// 	}
		// 	else{
		// 		defered.resolve(reposne);
		// 	}
		// })
		// var auth = {
		// 	auth : {
		// 		api_key : 'key-7106ce1d07afb32c2e02f5f322c00244',
		// 		domain : "tkapp.onebytellc.com"
		// 	}
		// }
		// var nodemailerMailgun = mailer.createTransport(mg(auth));
		// nodemailerMailgun.sendMail({
		// 	from : '"Turkish Airlines" <ruhagency@thy.com>',
		// 	to : userEmail,
		// 	subject : subject,
		// 	text : message,

		// },function (err,info){
		// 	if(err){
		// 		defered.reject({"code": "SM:Err", "err" : err});
		// 	}else{
		// 		defered.resolve({"code":"SM:Succ", "info" : info});
		// 	}
		// });
		return defered.promise;
	},
	serverBaseURL : function() {
		if (process.env.NODE_ENV == 'development') {
			return 'http://127.0.0.1:5000/';
		} else {
			return 'http://159.203.70.181:5000/';
		}
	},
	getFileProp : function(ObjectId, type, file){
		var fileData = { 
				destPath : "",
				filename : "",
				dbPath 	: ""
			}
			fileID = ObjectId;
		if(type == "video"){
			fileData.destPath = path.resolve(path.join(__dirname,'../public/videos'));
			fileData.filename = fileID.toString()  + file.name.substring(file.name.lastIndexOf('.') , file.name.length);
			fileData.dbPath = 'videos/' + fileData.filename;
		}else if(type == "promotions"){
			fileData.destPath = path.resolve(path.join(__dirname,'../public/images/promotion'));
			fileData.filename = fileID.toString() + file.name.substring(file.name.lastIndexOf('.') , file.name.length);
			fileData.dbPath = 'images/promotion/' + fileData.filename;
		}else if(type == 'sliderImage'){
			fileData.destPath = path.resolve(path.join(__dirname,'../public/images/homeImages'));
			fileData.filename = fileID.toString() + file.name.substring(file.name.lastIndexOf('.') , file.name.length);
			fileData.dbPath = 'images/homeImages/' + fileData.filename;
		}else if(type === "thumbnail-video"){
			fileData.destPath = path.resolve(path.join(__dirname,'../public/videos'));
			fileData.filename = fileID.toString() + "_thumbnail"  + file.name.substring(file.name.lastIndexOf('.') , file.name.length);
			fileData.dbPath = 'videos/' + fileData.filename;
		}else if(type == "thumbnail-ppt"){
			fileData.destPath = path.resolve(path.join(__dirname,'../public/presentation'));
			fileData.filename = fileID.toString() + "_thumbnail"  + file.name.substring(file.name.lastIndexOf('.') , file.name.length);
			fileData.dbPath = 'presentation/' + fileData.filename;
		}else{
			fileData.destPath = path.resolve(path.join(__dirname,'../public/presentation'));
			fileData.filename = fileID.toString() + file.name.substring(file.name.lastIndexOf('.') , file.name.length);
			fileData.dbPath = 'presentation/' + fileData.filename;
		}
		return fileData;
	}
}


module.exports = helperFunctions;