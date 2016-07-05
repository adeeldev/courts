app.service('userService', ['$http','$location',function($http,$location){

		var url = "http://" + $location.host() + ':' + $location.port() + "/user";
		var req = {};
		this.getAllUser = function(){
			var req = {
				method : "get",
				url :  url,
				headers : {
					"Content-Type" : "application/json"
				}
			}
			return $http(req);
		}

		this.addAdmin = function(data){
			req = {
				method : "POST",
				url : url + '/addAdmin',
				header : {
					"Content-Type" : "application/json"
				},
				data : data
			}
			return $http(req);
		}
		// this.test = function(){
		// 	return 'oyeee ki  eee';
		// }
	}]);
