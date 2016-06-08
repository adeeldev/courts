angular.module('TurkishApp')
	.controller('adminController',['$scope','$location','$uibModal','$rootScope','adminService','$cookies','userService',function ($scope,$location,$uibModal,$rootScope,adminService,$cookies,userService){
		$scope.animationsEnabled = true;
		$scope.fields = ["username","email","type","created"]; 
		$scope.error = false;
		$scope.login = function login(){
			adminService.login($scope.Admin)
				.then(function (result){
					//console.log(result.data[0]._id);
					console.log(result.data._id);
					$cookies.put('user',result.data._id );
					$cookies.put('username',result.data.username );
					$cookies.put('type',result.data.type);
					$cookies.put('email',result.data.email);
					$rootScope.loggedIn = true;
					$rootScope.Admin = result.data;
					console.log($rootScope.Admin);
					$rootScope.loggedIn = true;
					$scope.uid = $cookies.get('user');
					$scope.type = $cookies.get('type');
					$rootScope.typei = $scope.type;
					$location.path('/promotion');
				})
				.catch(function (response){
					$scope.error = true;
					$scope.errorMsg = response.data.message;
				})
		}

		$scope.uid = $cookies.get('user');
		$scope.type = $cookies.get('type');

		adminService.getAllAdmin()
		.then(function (success){
			$scope.users = success.data;
		}).catch(function (err){
			console.log(err);
		})


		$scope.prompt = function(size){
			var data = {
				'admin' : $rootScope.Admin,
				'action' : 'Verification'
			};
			var modalInstance = $uibModal.open({
				animation : $scope.animationsEnabled,
				templateUrl : '/views/promptModalView.html',
				controller : 'promptModalController',
				size : size,
				resolve : {
					package : function (){
						return data;
					}
				}
			})
			modalInstance.result
			.then(function() {
				console.log("Ok");
		    })
		}

		$scope.logout = function(){
			console.log("here");
			// $cookies.remove("user");
			// $scope.uid = undefined;
			// $location.path('/');

		}


		$scope.openNew = function(size){
			console.log('eeeee');
			var modalInstance = $uibModal.open({
				animation : $scope.animationsEnabled,
				templateUrl : '/views/addEventModal.html',
				controller : 'addModalController',
				size : size,
				resolve : {
					events : function (){
						return Event;
					}
				}
			})
			modalInstance.result
			.then(function (Event) {
				return userService.addAdmin(Event);
		    })
			.then(function (result){
				// console.log('result');
				// return userService.getAllUser();
				adminService.getAllAdmin()
				.then(function (success){
					$scope.users = success.data;
				}).catch(function (err){
					console.log(err);
				})				
			})
			.then(function (allEvent){
				console.log(allEvent);
				$scope.noEvent = false;
				$scope.Events = allEvent.data;
				adminService.getAllAdmin()
				.then(function (success){
					$scope.Events = success.data;
				}).catch(function (err){
					console.log(err);
				})				
			})
		}

	}])