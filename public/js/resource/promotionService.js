angular.module('TurkishApp')
	.service('promotionService',['$http','$location',function ($http,$location){

		var URL = "http://" + $location.host() + ':' + $location.port() + "/court";
		var req = {};
		this.getAllPromotions = function(data){
			req = {
				'method' : 'POST',
				'url' : URL+"/allPromotions",
				header : {
					"Content-Type" : "application/json"
				},
				data : data				
			}
			return $http(req);
		}

		this.addPromotion = function(data){
			req = {
				method : "POST",
				url : URL + '/addCourtAdmin',
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

		this.getSubAdmins = function(){
			var req = {
					method : "get",
					url :  URL + '/subAdmins',
					headers : {
						"Content-Type" : "application/json"
					}
				}
				return $http(req);
			}	

	}])