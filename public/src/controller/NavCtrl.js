angular.module('TurkishApp')
	.controller('NavCtrl',['$rootScope','$scope', '$location','$cookies', function ( $rootScope,$scope,$location,$cookies){
		$scope.isActive = function(destination){
			return destination === $location.path;
		}
		$scope.type = $cookies.get('type');
		$scope.logOut = function(){
			$cookies.remove("user");
			$cookies.remove("username");
			$cookies.remove("type");
			$cookies.remove("email");
			$location.path('/');
			window.location.reload();
		} 
	}])