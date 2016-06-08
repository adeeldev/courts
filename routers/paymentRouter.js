var express = require('express'),
	router = express.Router(),
	helperFun = require('../lib/helperFunc'),
	md5 = require('md5'),
	paymentModel = require('../models/paymentModel'),
	stripe = require('stripe')('sk_test_cSMT4vPiWVxoncrwQbfXMVeW'); 

router.post('/addPayment', function (request, response){
	


	stripe.tokens.create({
		card: {
		    "number": request.body.number,
		    "exp_month": request.body.exp_month,
		    "exp_year": request.body.exp_year,
		    "cvc": request.body.cvc
		  }
		}, function(err, token) {
			if(err){
				console.log(err);
			}
				var price = request.body.price;//'60';
				var token = token.id;
				console.log(token);
				stripe.charges.create({
				  amount: price,
				  currency: "usd",
				  source: token, // obtained with Stripe.js
				  description: request.body.email
				}, function(err, charge) {
					if(err){
						response.send(err);
					}
					return response.send({'msg' :'Payment made successfully'}).end();
				});
	});

});


router.get('/getAllTrans', function (request, response){

		stripe.balance.listTransactions({ limit: 40 }, function(err, transactions) {
			console.log(transactions);
		  return response.send(transactions.data).end();
		});
});

router.post('/stripe', function (request,response){
	var email = request.body.email;
	stripe.customers.create({
	  email: email
	}).then(function(customer) {
	  return stripe.charges.create({
	    amount: 1600,
	    currency: 'usd',
	    customer: customer.id
	  });
	}).then(function(charge) {
		console.log(charge);
	  // New charge created on a new customer
	}).catch(function(err) {
		console.log(err);

	  // Deal with an error
	});
});

router.post('/balance', function (request,response){

	var price = request.body.price;//'60';
	var token = request.body.token;//'tok_17yi3TE6YpcUN5J364idK6pM';

	stripe.charges.create({
	  amount: price,
	  currency: "usd",
	  source: token, // obtained with Stripe.js
	  description: "Charge for test@example.com"
	}, function(err, charge) {
		if(err){
			response.send(err);
		}
		response.send(charge);
	  // asynchronously called
	});

});



router.post('/paypal', function (request,response){
	var data = {
		uid : request.body.uid,
		payType : request.body.payType,
		amount : request.body.amount
	}

		paymentModel.register(data)
			.then(function (result){
				return response.status(200).send({"data" : result.user}).end();
			}).catch(function (error){
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
});


module.exports = router;