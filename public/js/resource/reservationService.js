app.service('reservationService',['$http','$location',function ($http,$location){

		var URL = "http://" + $location.host() + ':' + $location.port() + "/reservation";
		var req = {};
		// this.getSlot = function(data){
		// 	req = {
		// 		'method' : 'POST',
		// 		'url' : URL+"/getSlots",
		// 		header : {
		// 			"Content-Type" : "application/json"
		// 		},
		// 		data : data
		// 	}
		// 	return $http(req);
		// }

		// this.Payment = function(data){
		// 	var p_url = 'http://' + $location.host() + ':' + $location.port() + '/payment/addPayment';
		// 	console.log(p_url);
		// 	req = {
		// 		method : 'POST',
		// 		url    : 	p_url	,
		// 		header : {
		// 			"Content-Type"  : "application/json"
		// 		},
		// 		data : data
		// 	}
		// 	return $http(req);
		// }

		// this.getreservations = function(){
		// 	var p_url = 'http://' + $location.host() + ':' + $location.port() + '/reservation';
		// 	req = {
		// 		'method' : 'GET',
		// 		'url' : p_url,
		// 	}
		// 	return $http(req);
		// }


		this.getCourts = function(){
			var p_url = 'http://' + $location.host() + ':' + $location.port() + '/court';
			req = {
				method : "POST",
				url : p_url + '/courts',
				header : {
					"Content-Type" : "application/json"
				}
			}
			return $http(req);
		}

		this.getreservations = function(data){
			var p_url = 'http://' + $location.host() + ':' + $location.port() + '/reservation';
			req = {
				method : "POST",
				url : p_url + '/getReservation',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}   

		this.allReservations = function(data){
			var p_url = 'http://' + $location.host() + ':' + $location.port() + '/reservation';
			req = {
				method : "POST",
				url : p_url + '/allReservations',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}   
		
		this.createToken = function(data){
			var p_url = 'http://' + $location.host() + ':' + $location.port() + '/payment';
			req = {
				method : "POST",
				url : p_url + '/addPayment',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

		this.addreservation = function(data){
			req = {
				method : "POST",
				url : URL + '/addReservation',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

		this.deleteReservation = function(data){
			req = {
				method : "POST",
				url : URL + '/deleteReservation',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

		this.checkin = function(data){
			req = {
				method : "POST",
				url : URL + '/checkin',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

	}])
