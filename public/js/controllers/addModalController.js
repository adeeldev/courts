angular.module('TurkishApp')
	.controller('addModalController',['$scope','$uibModalInstance',function ($scope, $uibModalInstance){
		var tz = jstz.determine();
		$scope.Event = {};
		$scope.Errors = [];
		// $scope.timezone = tz.name();
		// $scope.minDate = moment();
		// $scope.maxDate = moment.tz($scope.timezone).add(4, 'd').hour(12).startOf('h');
		// $scope.Event.eventDate = moment();
		$scope.ok = function (form){
			if(form.location.$error.required ){
				$scope.errCheck = 'Location is required';
			}else if(form.location.$error.required){
					$scope.errCheck = 'Title is required';
			}else if(form.username.$error.required){
				$scope.errCheck = 'Title is required';
			}else{

				$uibModalInstance.close($scope.Event);
			}
		}

		$scope.cancel = function (){
			$uibModalInstance.dismiss('cancel');
		}
	}])
