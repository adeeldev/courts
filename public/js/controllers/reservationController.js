app.controller('reservationCtrl',['$scope', 'ngNotify', '$uibModal', 'reservationService' , '$location','$cookies','$rootScope',
  function ($scope, ngNotify, $uibModal, reservationService, $location , $cookies, $rootScope){



  reservationService.getCourts()
    .then(function (courts){
     $scope.courts = courts.data;
  })
  .catch(function (err){
    if(err.status == 500){
      $scope.serverError = true;
    }
  })

  reservationService.allReservations()
  .then(function (reserveResponse){
    if(reserveResponse.data.length == 0){
      $scope.msg = 'no data exists';
    }
    $scope.reservation = reserveResponse.data;
  })
  .catch(function (err){
    if(err.status == 500){
      $scope.serverError = true;
    }
  })

  $scope.do = function(stripe){
    // console.log(stripe);

    var payment = {
      'number': stripe.number,
      'exp_month': stripe.exp_month,
      'exp_year': stripe.exp_year,
      'cvc': stripe.cvc,
      'price': stripe.amount
    }
    reservationService.createToken(payment)
      .then(function (response){

      }).catch(function (err){

      })
  }

  $scope.view = function(name) {
      $scope.name = name.court;
      // console.log($scope.name);
      $location.path( "/app/dashboard/"+ $scope.name);
  }

  $scope.viewReservation = function(name) {
      $scope.url = name._id;
      $location.path( "/app/dashboard/"+ $scope.url);
  }

  $scope.addReservation = function(data){

    var dFrom = data.startsAt;
    dFrom = dFrom.toLocaleTimeString().replace(/:\d+ /, ' ');

    var dTo = data.endsAt;
    dTo = dTo.toLocaleTimeString().replace(/:\d+ /, ' ');

    var utc = data.endsAt.toJSON().slice(0,10);

    var reservationData = {
      court: data.court.title,
      courtId: data.court._id,
      email: data.email,
      number: data.number,
      title: data.title,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      advancePayment: data.advance,
      remainingPayment: data.remaining,
      first_name: data.f_name,
      last_name: data.l_name,
      address: data.address,
      city: data.city,
      postal_code: data.p_code,
      state: data.state,
      province: data.province,
      notes : data.notes,
      timeFrom: dFrom,
      timeTo: dTo,
      date: utc
    }

    reservationService.addreservation(reservationData)
    .then(function (reserveResponse){
      // if(reserveResponse.data.length == 0)
      //     $scope.reserveResponse = true;
      $location.path( "/app/courts" );
    })
    .catch(function (err){
        ngNotify.set($scope.notify.text, {
            theme: $scope.notify.theme,
            position: $scope.notify.position,
            duration: $scope.notify.duration,
            type: $scope.notify.type,
            sticky: $scope.notify.sticky,
            button: $scope.notify.button,
            html: $scope.notify.html
        });
      if(err.status == 500){
        $scope.serverError = true;
      }
    })

  }
    $scope.notify = {
        theme: 'error',
        position: 'top',
        duration: 3000,
        type: 'error',
        sticky: 'false',
        button: 'true',
        html: 'false',
        text: 'SLot Timing is already booked! choose other Time'
    };

    $scope.set = function () {
        ngNotify.set($scope.notify.text, {
            theme: $scope.notify.theme,
            position: $scope.notify.position,
            duration: $scope.notify.duration,
            type: $scope.notify.type,
            sticky: $scope.notify.sticky,
            button: $scope.notify.button,
            html: $scope.notify.html
        });
    };

  $scope.openNew = function(size){
    var modalInstance = $uibModal.open({
      animation : $scope.animationsEnabled,
      templateUrl : '/views/app/paymentModal.html',
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
        return reservationService.createToken(Event);
      })
    .then(function (result){

    })
    .then(function (allEvent){
      // console.log(allEvent);
    })
  }



}]);
