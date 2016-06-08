angular.module('TurkishApp')
	.controller('editModalController',['$scope','$uibModalInstance', 'events',function ($scope, $uibModalInstance, events) {
		var tz = jstz.determine();
		$scope.timezone = tz.name();
		$scope.Event = events;
		$scope.minDate = moment();
		$scope.maxDate = moment.tz($scope.timezone).add(4, 'd').hour(12).startOf('h');
		
		$scope.ok = function (){
			$scope.Event.eventDate = moment($scope.Event.eventDate).utc().toDate();
			console.log($scope.Event.eventDate);
			$uibModalInstance.close($scope.Event);
			// console.log($scope.Event);
		}
		$scope.cancel = function (){
			$uibModalInstance.dismiss('cancel');
		}
	}])