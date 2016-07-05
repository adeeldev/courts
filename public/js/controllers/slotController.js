app.controller('slotController',['$scope','$uibModal', 'slotService' , 'FileUploader' , '$location','$cookies','$rootScope', function ($scope, $uibModal, slotService,  FileUploader, $location , $cookies, $rootScope){
		$scope.message = "Slots";
		$scope.animationsEnabled = true;
    $scope.url = $location.host();
    $scope.port = $location.port();
    $scope.base_url = 'http://'+$scope.url+':'+$scope.port+'/images/';
    $scope.uid = $cookies.get('user');
    $scope.userType = $cookies.get('type');
    $scope.email = $cookies.get('email');

    var pathArray = $location.url().split('/') ;
    $scope.court_id = pathArray[2];
    $scope.slot = pathArray[3];
    console.log($scope.slot);
      $scope.roles = [
        {id: 1, name: 'Wifi' , url: 'http://104.236.44.223:3500/images/wifi@2x.png'},
        {id: 2, name: 'Indoor' , url : 'http://104.236.44.223:3500/images/indoor@2x.png'},
        {id: 3, name: 'Toilets' , url : '"http://104.236.44.223:3500/images/toilet@2x.png'},
        {id: 4, name: 'Lights', url : 'http://104.236.44.223:3500/images/lights@2x.png'},
      ];
      $scope.user = {
        roles: [$scope.roles[1]]
      };
    $scope.slots_array = [];
    for (var i = 1; i <= $scope.slot; i++) {
        $scope.slots_array.push({'no': i});
    };
    console.log($scope.slots_array);
	$scope.getSlots = function(){
        var courtid = {'courtid' : $scope.court_id }
		slotService.getSlot(courtid)
		.then(function (result){
			if(result.data.message == "No data found."){
				// $scope.slots = [];
			}else{
                // console.log(result);
				$scope.slots = result.data.data;
                console.log($scope.slots);
                $scope.addedSlots = $scope.slots.length;
                console.log($scope.addedSlots);
                //$scope.courtSlots = result.data[0].slotNumber;
			}
		})
		.catch(function (err){
			if(err.status == 500){
				$scope.serverError = true;
			}
		})
	}

    $scope.addSlot = function(slot, facility, startDate, endDate){

        var slotData = {
            title: slot.title,
            userid  :  $scope.uid ,
            courtid :  $scope.court_id ,
            courtImage : $scope.base_url+$scope.image_url,
            price: slot.price,
            size: slot.size,
            facility : facility,
            startDate : moment(startDate).toDate(),
            endDate : moment(endDate).toDate(),
            status  : 'pending'
        }
        console.log(slotData);
        slotService.addSlot(slotData)
        .then(function (promotionResult){
            if(promotionResult.data.length == 0){
                $scope.promotionResult = true;
            }else{
                var courtid = {'courtid' : $scope.court_id }
                $scope.getSlots(courtid);
            }
        })
        .catch(function (err){
            if(err.status == 500){
                $scope.serverError = true;
            }
        })

    }


    $scope.changeStatus = function(id, status){

        var slotData = {
            id :  id,
            status  :  status
        }
        slotService.changeSlot(slotData)
        .then(function (slots){
            if(slots.data.length == 0){
                $scope.promotionResult = true;
            }else{
$scope.getSlots();
            }
        })
        .catch(function (err){
            if(err.status == 500){
                $scope.serverError = true;
            }
        })

    }




    /*********************************************************************/
    /*               Angular file uploading code                         */
    /*********************************************************************/
    $scope.uploader = new FileUploader({
        url: 'http://'+$scope.url+':'+$scope.port+'/upload/uploads'
    });
    // FILTERS
    $scope.uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 150;
        }
    });
        // CALLBACKS
        $scope.remove_image = function(){
            $scope.image_selected = false;
            $scope.show_choose = true;
            $scope.uploader.clearQueue();
            $scope.image_url = '/images/upload.png';
            jQuery('#file').val('');    //empty the input file value so next time if same file selects then it works
        };

        $scope.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
        };
        $scope.uploader.onAfterAddingFile = function(fileItem) {
        //console.info('onAfterAddingFile', fileItem);
            $scope.show_choose = false;
            if(!fileItem.file.name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|mp3|mp4|pdf)$/)){
                alert('Selected file is not a valid image');
                $scope.invalid_image = true;
            }else{
                $scope.invalid_image = false;
            }
        };
        $scope.uploader.onAfterAddingAll = function(addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
        };
        $scope.uploader.onBeforeUploadItem = function(item) {
        //console.info('onBeforeUploadItem', item);
        };
        $scope.uploader.onProgressItem = function(fileItem, progress) {
        //console.info('onProgressItem', fileItem, progress);
        };
        $scope.uploader.onProgressAll = function(progress) {
        //console.info('onProgressAll', progress);
        };
        $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //console.info('onSuccessItem', fileItem, response, status, headers);
        };
        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            $scope.image_selected = true;
        //console.info('onCompleteItem', fileItem, response, status, headers);
            $scope.image_url = fileItem.file.name;
            $scope.promotion_image = fileItem.file.name;

        };
        $scope.uploader.onCompleteAll = function() {
            console.info('uploader', $scope.uploader.queue);
        };

        // $scope.dates = {
        //     today: moment.tz('UTC').hour(12).startOf('h'),
        //     end: moment.tz('UTC').hour(12).startOf('h'), //12:00 UTC, today.
        //     minDate: moment.tz('UTC').add(-4, 'd').hour(12).startOf('h'), //12:00 UTC, four days ago.
        //     maxDate: moment.tz('UTC').add(4, 'd').hour(12).startOf('h'), //12:00 UTC, in four days.
        // };
        //   $scope.options = {
        //     view: 'date',
        //     format: 'lll',
        //     maxView: false,
        //     minView: 'hours',
        // };
        //   $scope.minDate = $scope.dates.minDate;
        //   $scope.maxDate = $scope.dates.maxDate;
        //   $scope.formats = [
        //      "MMMM YYYY",
        //      "DD MMM YYYY",
        //      "ddd MMM DD YYYY",
        //      "D MMM YYYY HH:mm",
        //      "lll",
        //      "MM-DD-YYYY hh:mm a",
        //   ];
        //   $scope.timezones = [
        //     ['London, UK', 'Europe/London'],
        //     ['Hong Kong, China', 'Asia/Hong_Kong'],
        //     ['Vancouver, Canada', 'America/Vancouver'],
        //   ];
        //   $scope.views = ['year', 'month', 'date', 'hours', 'minutes'];
        //   $scope.callbackState = 'Callback: Not fired';
        //   $scope.changeDate = function (modelName, newDate) {
        //     console.log(modelName + ' has had a date change. New value is ' + newDate.format());
        //     $scope.callbackState = 'Callback: Fired';
        //   }
        //   $scope.changeMinMax = function (modelName, newValue) {
        //     //minDate or maxDate updated. Generate events to update relevant pickers
        //     var values = {
        //       minDate: false,
        //       maxDate: false,
        //     }
        //     if (modelName === 'dates.minDate') {
        //       values.minDate = newValue;
        //       $scope.$broadcast('pickerUpdate', ['pickerMinDate', 'pickerMinDateDiv', 'pickerMaxSelector'], values);
        //       values.maxDate = $scope.dates.maxDate;
        //     } else if (modelName === 'dates.maxDate') {
        //       values.maxDate = newValue;
        //       $scope.$broadcast('pickerUpdate', ['pickerMaxDate', 'pickerMaxDateDiv', 'pickerMinSelector'], values);
        //       values.minDate = $scope.dates.minDate;
        //     }
        //     //For either min/max update, update the pickers which use both.
        //     $scope.$broadcast('pickerUpdate', ['pickerBothDates', 'pickerBothDatesDiv'], values);
        //   }
        //   $scope.changeData = function (type) {
        //     var values = {},
        //         pickersToUpdate = ['pickerMinDate', 'pickerMaxDate', 'pickerBothDates', 'pickerMinDateDiv', 'pickerMaxDateDiv', 'pickerBothDatesDiv', 'pickerRange'];
        //     switch (type) {
        //       case 'view':
        //         values.view = $scope.options.view;
        //         break;
        //       case 'minView':
        //         values.minView = $scope.options.minView;
        //         break;
        //       case 'maxView':
        //         values.maxView = $scope.options.maxView;
        //         break;
        //       case 'format':
        //         values.format = $scope.options.format;
        //         break;
        //     }
        //     if (values) {
        //       $scope.$broadcast('pickerUpdate', pickersToUpdate, values);
        //     }
        // }

	}])
