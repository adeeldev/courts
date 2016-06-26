angular.module('TurkishApp')
	.service('forgetService',['$http','$location',function ($http,$location){

		var URL = "http://" + $location.host() + ':' + $location.port() + "/user";
		var req = {};

		this.resetPass = function(data){
			console.log(data);
			req = {
				method : "POST",
				url : URL + '/reset',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}
	}])