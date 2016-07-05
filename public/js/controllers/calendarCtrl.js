'use strict';
/**
 * Controller of the angularBootstrapCalendarApp
*/
app.controller('CalendarCtrl', ["$scope", "$uibModal", "reservationService", "$location",  "$aside", "moment", "SweetAlert", function ($scope, $uibModal, reservationService,  $location, $aside, moment, SweetAlert) {

    console.log('in chat controller');
    var pathArray = $location.url().split('/') ;
    $scope.court = pathArray[3];


    // reservationService.getCourts()
    //   .then(function (courts){
    //    $scope.courts = courts.data.data;
    //     console.log($scope.courts);
    // })
    // .catch(function (err){
    //   if(err.status == 500){
    //     $scope.serverError = true;
    //   }
    // })

    var reserveCourt = {'court' : $scope.court}
    reservationService.getreservations(reserveCourt)
      .then(function (reserveResponse){
       $scope.events = reserveResponse.data;
        console.log($scope.events);

    })
    .catch(function (err){
      if(err.status == 500){
        $scope.serverError = true;
      }
    })


    var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = $scope.reservation;
    // console.log($scope.events);

    // $scope.events = [
    //   {
    //       title: 'Birthday Party',
    //       type: 'home',
    //       startsAt: '2016-07-03T13:38:47.330Z',
    //       endsAt: '2016-06-26T14:44:30.561Z'
    //   },
    //   {
    //       title: 'AngularJS Seminar',
    //       type: 'off-site-work',
    //       startsAt: '2016-07-02T14:42:33.906Z',
    //       endsAt: '2016-07-03T14:42:33.906Z'
    //   },
    //   {
    //       title: 'Event 2',
    //       type: 'cancelled',
    //       startsAt: new Date(y, m, d - 3, 16, 0),
    //       endsAt: new Date(y, m, d - 3, 18, 0)
    //   },
    //   {
    //       title: 'This is a really long event title',
    //       type: 'to-do',
    //       startsAt: new Date(y, m, d + 1, 19, 0),
    //       endsAt: new Date(y, m, d + 1, 22, 30)
    //   }
    // ];






    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();

    function showModal(action, event) {
        var modalInstance = $aside.open({
            templateUrl: 'calendarEvent.html',
            placement: 'right',
            size: 'sm',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                $scope.$modalInstance = $uibModalInstance;
                $scope.action = action;
                $scope.event = event;
                $scope.cancel = function () {
                // var pathArray = $location.url().split('/') ;
                // $scope.court = pathArray[3];
                // var newReservation = {
                //     'email': $scope.event.email,
                //     'number': $scope.event.number,
                //     'title': $scope.event.title,
                //     'type': $scope.event.type,
                //     'startsAt': $scope.event.startsAt,
                //     'endsAt': $scope.event.endsAt,
                //     'name': $scope.event.name,
                //     'court':  $scope.court,
                //     'advancePayment': $scope.advance,
                //     'remainingPayment': $scope.remaining
                //   }
                //   console.log(newReservation);
                //   reservationService.addreservation(newReservation)
                //     .then(function (result){
                //         console.log(result);
                //     }).catch(function (err){
                //       console.log(err);
                //     });

                    // $uibModalInstance.dismiss('cancel');
                };
                $scope.deleteEvent = function () {
                    $uibModalInstance.close($scope.event, $scope.event);
                };

            }
        });
        modalInstance.result.then(function (selectedEvent, action) {

            $scope.eventDeleted(selectedEvent);

        });
    }


    $scope.eventClicked = function (event) {
        showModal('Clicked', event);
    };
    $scope.addEvent = function () {
        // $scope.events.push({
        //     title: 'New Event',
        //     startsAt: new Date(y, m, d, 10, 0),
        //     endsAt: new Date(y, m, d, 11, 0),
        //     type: 'job'
        // });
        $scope.eventEdited($scope.events[$scope.events.length - 1]);
    };

    $scope.eventEdited = function (event) {
        showModal('Edited', event);
    };

    $scope.eventDeleted = function (event) {
      var reservationId = event._id;
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this event!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                $scope.events.splice(event.$id, 1);
                SweetAlert.swal("Deleted!", "Event has been deleted.", "success");
                var data = {'id': reservationId }
                  reservationService.deleteReservation(data)
                    .then(function (result){
                        console.log(result);
                    }).catch(function (err){
                      console.log(err);
                    });                
            } else {
                SweetAlert.swal("Cancelled", "Event is safe :)", "error");
            }
        });
    };


    $scope.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();

        event[field] = !event[field];
    };



		$scope.openNew = function(size){
			var modalInstance = $uibModal.open({
				animation : $scope.animationsEnabled,
				templateUrl : '/views/app/addReservationModal.html',
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



}]);
