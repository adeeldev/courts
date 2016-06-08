angular.module('TurkishApp')
	.controller('HomeController',['$scope','$cookies',function ($scope,$cookies){
		$scope.message = "Footbal Courts";
		$scope.type = $cookies.get('type');
	}])