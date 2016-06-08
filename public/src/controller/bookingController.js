angular.module('TurkishApp')
	.controller('bookingController',['$scope','$uibModal', 'slotService' , 'FileUploader' , '$location','$cookies','$rootScope', function ($scope, $uibModal, slotService,  FileUploader, $location , $cookies, $rootScope){
		$scope.message = "Slots";
		$scope.animationsEnabled = true;
    $scope.url = $location.host();
    $scope.port = $location.port();
    $scope.base_url = 'http://'+$scope.url+':'+$scope.port+'/images/';	
    $scope.uid = $cookies.get('user');
    $scope.userType = $cookies.get('type');
    $scope.email = $cookies.get('email');


        slotService.getTrans()
        .then(function (result){
            if(result.data.message == "No data found."){
                // $scope.slots = [];
            }else{
                console.log(result);
                $scope.transactions = result.data;
            }
        })
        .catch(function (err){
            if(err.status == 500){
                $scope.serverError = true;              
            }
        })

	$scope.getTrans = function(){

		slotService.getTrans()
		.then(function (result){
			if(result.data.message == "No data found."){
				// $scope.slots = [];
			}else{
                console.log(result);
                $scope.transactions = result.data;
			}
		})
		.catch(function (err){
			if(err.status == 500){
				$scope.serverError = true;				
			}
		})
	}


    $scope.addPayment = function(stripe){
        var stripeData = {
            number      :  stripe.number,
            exp_month   :  stripe.exp_month,
            exp_year    :  stripe.exp_year,
            cvc         :  stripe.cvc,
            price       :  stripe.amount,
            email       :  stripe.email
        }
        console.log(stripeData);
        slotService.Payment(stripeData)
        .then(function (result){
            console.log(result);
            $location.path('booking');

        })
        .catch(function (err){
            if(err.status == 500){
                $scope.serverError = true;              
            }
        })        
    }






	}])