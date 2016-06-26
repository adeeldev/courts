app.controller('EventController',['$scope','eventService','$uibModal',function ($scope, eventService, $uibModal){
		var tz = jstz.determine();
		$scope.timezone = tz.name();
		$scope.message = "Events";
		$scope.serverMsg = '';
		$scope.Events = [];
		$scope.noEvent = false;
		$scope.newEvent = {};
		$scope.serverError = false;
		$scope.fields = ["EventTitle","EventLocation","EventDate","EventDescription","Edit","Delete"];

		$scope.sort = function (field){
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		}
		$scope.sort.field = 'EventDate';
		$scope.sort.order = false;

		var toLocalTime = function(time) {
			var d = new Date(time);
			// var offset = (new Date().getTimezoneOffset() / 60) * -1;
			// var n = new Date(d.getTime() + offset);
			// return n;
			return d;
		};

		$scope.Submit = function(){
			eventService.addEvent($scope.newEvent)
			.then(function (result){})
			.catch(function (err){})
		}
		$scope.delete = function (event){
			eventService.removeEvent(event)
			.then(function (result){
				return eventService.getAllEvents();
			})
			.then(function (events){
				if(events.data.length == 0){
					$scope.noEvent = true;
				}else{
					$scope.Events = events.data;
				}
			})
			.catch(function (Err){
				alert(Err.err);
			})
		}
		eventService.getAllEvents()
		.then(function (result){
			if(result.data.length == 0){
				$scope.noEvent = true;
			}else{
				for (var i = 0; i<result.data.length; i++) {
					var ev = result.data[i];
					ev.EventDate = toLocalTime(ev.EventDate);
				}
				$scope.Events = result.data;
			}
		})
		.catch(function (err){
			if(err.status == 500){
				$scope.serverError = true;
			}
		})
		$scope.animationsEnabled = true;

		$scope.openEdit = function(size,Event){
			var modalInstance = $uibModal.open({
				animation : $scope.animationsEnabled,
				templateUrl : '/views/editEventModal.html',
				controller : 'editModalController',
				size : size,
				resolve : {
					events : function (){
						return Event;
					}
				}
			})
			modalInstance.result
			.then(function (editEvent) {
		      return eventService.updateEvent(editEvent);
		    })
		    .then(function (result){
		    	return eventService.getAllEvents();
		    })
		    .then(function (final){
		    	$scope.Events = final.data;
		    })
		    .catch(function (Err){
		    	console.log('close');
		    })
		}
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
				console.log(Event);
				return eventService.addEvent(Event);
		    })
			.then(function (result){
				console.log('result');
				return eventService.getAllEvents();
			})
			.then(function (allEvent){
				console.log(allEvent);
				$scope.noEvent = false;
				$scope.Events = allEvent.data;
			})
		}

		// $scope.dates = {
		// 	today: moment.tz('UTC').hour(12).startOf('h'),
		// 	end: moment.tz('UTC').hour(12).startOf('h'), //12:00 UTC, today.
		// 	minDate: moment.tz('UTC').add(-4, 'd').hour(12).startOf('h'), //12:00 UTC, four days ago.
		// 	maxDate: moment.tz('UTC').add(4, 'd').hour(12).startOf('h'), //12:00 UTC, in four days.
		// };
		// $scope.minDate = $scope.dates.minDate;
		// $scope.maxDate = $scope.dates.maxDate;
  //     $scope.options = {
  //       view: 'date',
  //       format: 'lll',
  //       maxView: false,
  //       minView: 'hours',
  //   };
  //     $scope.formats = [
  //        "MMMM YYYY",
  //        "DD MMM YYYY",
  //        "ddd MMM DD YYYY",
  //        "D MMM YYYY HH:mm",
  //        "lll",
  //        "MM-dd-yyyy hh:mm a",
  //     ];
  //     $scope.timezones = [
  //       ['London, UK', 'Europe/London'],
  //       ['Hong Kong, China', 'Asia/Hong_Kong'],
  //       ['Vancouver, Canada', 'America/Vancouver'],
  //     ];
  //     $scope.views = ['year', 'month', 'date', 'hours', 'minutes'];
  //     $scope.callbackState = 'Callback: Not fired';
  //     $scope.changeDate = function (modelName, newDate) {
  //       console.log(modelName + ' has had a date change. New value is ' + newDate.format());
  //       $scope.callbackState = 'Callback: Fired';
  //     }
  //     $scope.changeMinMax = function (modelName, newValue) {
  //       //minDate or maxDate updated. Generate events to update relevant pickers
  //       var values = {
  //         minDate: false,
  //         maxDate: false,
  //       }
  //       if (modelName === 'dates.minDate') {
  //         values.minDate = newValue;
  //         $scope.$broadcast('pickerUpdate', ['pickerMinDate', 'pickerMinDateDiv', 'pickerMaxSelector'], values);
  //         values.maxDate = $scope.dates.maxDate;
  //       } else if (modelName === 'dates.maxDate') {
  //         values.maxDate = newValue;
  //         $scope.$broadcast('pickerUpdate', ['pickerMaxDate', 'pickerMaxDateDiv', 'pickerMinSelector'], values);
  //         values.minDate = $scope.dates.minDate;
  //       }
  //       //For either min/max update, update the pickers which use both.
  //       $scope.$broadcast('pickerUpdate', ['pickerBothDates', 'pickerBothDatesDiv'], values);
  //     }
  //     $scope.changeData = function (type) {
  //       var values = {},
  //           pickersToUpdate = ['pickerMinDate', 'pickerMaxDate', 'pickerBothDates', 'pickerMinDateDiv', 'pickerMaxDateDiv', 'pickerBothDatesDiv', 'pickerRange'];
  //       switch (type) {
  //         case 'view':
  //           values.view = $scope.options.view;
  //           break;
  //         case 'minView':
  //           values.minView = $scope.options.minView;
  //           break;
  //         case 'maxView':
  //           values.maxView = $scope.options.maxView;
  //           break;
  //         case 'format':
  //           values.format = $scope.options.format;
  //           break;
  //       }
  //       if (values) {
  //         $scope.$broadcast('pickerUpdate', pickersToUpdate, values);
  //       }
  //     }
	}])
