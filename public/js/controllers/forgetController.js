angular.module('TurkishApp')
	.controller('forgetController',['$scope','$rootScope','$location','forgetService', function ($scope,$rootScope,$location,forgetService){
		$scope.users = [];
		$scope.message = 'Forget Password';

	    var pathArray = $location.url().split('/') ;
	    $scope.tokenValue = pathArray[2];

		$scope.resetUserPassword = function (resetToken){
			if(resetToken.newPassword != resetToken.verifyPassword){
				$scope.error = 'Password not Matched';
			}
			var resetData = {'password' : resetToken.newPassword , 'token' : $scope.tokenValue};
			console.log(resetData);
	        forgetService.resetPass(resetData)
	        .then(function (response){
	            console.log(response.data);
	            $scope.success = 'Password changed successfully';
	        })
	        .catch(function (err){
	            if(err.status == 500){
	                $scope.serverError = true;              
	            }
	        })
		}

	}])