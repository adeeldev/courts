angular.module('TurkishApp')
	.service('postData',['$http',function($http){
		this.post = function(url,Data){
			var req = {
				method : "POST",
				url : url,
				headers : {
					"Content-Type" : "application/json"
				},
				data : Data
			}
			$http(req).then(function (success){
				console.log(success);
			},function (err){
				console.log(err);
			})
		}
	}])