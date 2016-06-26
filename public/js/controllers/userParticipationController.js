angular.module('TurkishApp')
	.controller('userParticipationController',['$scope', '$rootScope','userParticipationService',function ($scope, $rootScope,userParticipationService){
		$scope.userObj = [];
		$scope.getParticipation = function (id){
			userParticipationService.getUserParticiapation(id)
			.then(function (response){
				console.log(response.data);
				if(response.data.message == "No Participation"){
					$scope.noParticipation = true;
				}else{
					$scope.userObj = response.data;
				}
			})
			.catch(function (response){
				console.log("err");
				console.log(response.data);
			})
		}
		$scope.getParticipation($rootScope.User._id);
	}])