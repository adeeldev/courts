angular.module('TurkishApp')
	.service('multiPart', ['$http',function($http){
		this.post = function(uploadURL, data){
			var fd = new FormData();
			console.log("Here... In Service");
			
			fd.append("title",angular.toJson(data.title));
			
			for(var i=0;i<data.files.length;i++){
				fd.append("file_" + i, data.files[i]);
			}

			$http.post(uploadURL, fd, {
				transformRequest : angular.indentity,
				headers : {'Content-Type' : undefined}
			}).then(function (result){
				console.log(result);
			},function (err){
				console.log(err);
			})
		}
	}])