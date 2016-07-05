app.controller('UserController',['$scope','$rootScope','$location','userService', '$uibModal', function ($scope,$rootScope,$location,userService,$uibModal ){
		$scope.users = [];
		$scope.message = 'Hello world';
		$scope.fields = ["username","email","city","telephone"];

		userService.getAllUser()
		.then(function (success){
			$scope.users = success.data;
		}).catch(function (err){
			console.log(err);
		})

		$scope.getInfo = function (userObj){
			$rootScope.User = userObj;
			$location.path('user/participation/' + userObj._id);
		}
		$scope.sort = function (field){
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		}
		$scope.sort.field = 'name';
		$scope.sort.order = false;

		$scope.openNew = function(size){
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
				return userService.getAllEvents();
			})
			.then(function (allEvent){
				$scope.noEvent = false;
				$scope.Events = allEvent.data;
			})
		}
	}])