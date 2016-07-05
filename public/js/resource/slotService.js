app.service('slotService',['$http','$location',function ($http,$location){

		var URL = "http://" + $location.host() + ':' + $location.port() + "/slot";
		var req = {};
		this.getSlot = function(data){
			req = {
				'method' : 'POST',
				'url' : URL+"/getSlots",
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

		this.Payment = function(data){
			var p_url = 'http://' + $location.host() + ':' + $location.port() + '/payment/addPayment';
			console.log(p_url);
			req = {
				method : 'POST',
				url    : 	p_url	,
				header : {
					"Content-Type"  : "application/json"
				},
				data : data
			}
			return $http(req);
		}


		this.getTrans = function(){
			var p_url = 'http://' + $location.host() + ':' + $location.port() + '/payment/getAllTrans';
			req = {
				'method' : 'GET',
				'url' : p_url,
			}
			return $http(req);
		}

		this.addSlot = function(data){
			req = {
				method : "POST",
				url : URL + '/addSlot',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

		this.deletePromotion = function(data){
			req = {
				method : "POST",
				url : URL + '/removePromotion',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

		this.changeSlot = function(data){
			req = {
				method : "POST",
				url : URL + '/changeSlot',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}

	}])
