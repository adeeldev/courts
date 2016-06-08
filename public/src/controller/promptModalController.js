angular.module('TurkishApp')
	.controller('promptModalController',['$scope','$uibModalInstance','$rootScope','adminService','package' , function ($scope, $uibModalInstance,$rootScope,adminService, package){
		$scope.password;
		$scope.message = package.action;
		$scope.error = false;
		console.log(package);
		if(package.action == 'Confirmation'){
			$scope.isConfirmation = true;
		}else{
			$scope.isConfirmation = false;
		}
		$scope.ok = function(form){
			if(!$scope.isConfirmation){
				if(form.password.$error.required){
					$scope.error = true;
					$scope.errorMsg = 'Password is required';
				}else{
					package.admin.password = $scope.password;
					adminService.update(package.admin)
					.then(function (response){
						$rootScope.Admin = response.data;
						$uibModalInstance.close('done');
					})
					.catch(function (err){
						if(err.status == 500){
							$scope.error = true;
							$scope.errorMsg = 'Server is not responding.Please try again.';
						}
						if(err.status == 400){
							$scope.error = true;
							$scope.errorMsg = err.data.message;
						}
					})
				}
			}else{
				$uibModalInstance.close('ok');
			}
		}
		$scope.cancel = function(){
			$uibModalInstance.dismiss('close');
		}
	}])