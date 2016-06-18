app.controller('reservationCtrl',['$scope','$uibModal', 'reservationService' , '$location','$cookies','$rootScope', function ($scope, $uibModal, reservationService, $location , $cookies, $rootScope){



  reservationService.getreservations()
  .then(function (reserveResponse){
    if(reserveResponse.data.result.length == 0){
      $scope.msg = 'no data exists';
    }
    $scope.reservation = reserveResponse.data.result;
  })
  .catch(function (err){
    if(err.status == 500){
      $scope.serverError = true;
    }
  })

  $scope.view = function(name) {
      $scope.name = name.court;
      console.log($scope.name);
      $location.path( "/app/dashboard/"+ $scope.name);
  }

  $scope.addReservation = function(data, resDate){
    var reservationData = {
      name: data.name,
      number: data.number,
      advancePayment: data.advancePayment,
      remainingPayment: data.remainingPayment,
      startTime : data.sTime,
      endTime : data.eTime,
      court : data.court,
      notes : data.notes,
      resDate : resDate._d
    }
    reservationService.addreservation(reservationData)
    .then(function (reserveResponse){
      // if(reserveResponse.data.length == 0)
      //     $scope.reserveResponse = true;
      $location.path( "/all/reservation" );
    })
    .catch(function (err){
      if(err.status == 500){
        $scope.serverError = true;
      }
    })

  }
}]);
