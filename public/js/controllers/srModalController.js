angular.module('TurkishApp')
	.controller('srModalController',['$uibModalInstance','$scope','data', function ($uibModalInstance,$scope,data){
		$scope.status = data.status;
		$scope.message = data.message;
		$scope.error = data.status;
		$scope.ok = function (){
			$uibModalInstance.close();
		}
		
	}])