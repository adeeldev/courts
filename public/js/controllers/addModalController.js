app.controller('addModalController',['$scope','$uibModalInstance', 'FileUploader',function ($scope, $uibModalInstance, FileUploader){

		$scope.Event = {};
		$scope.Errors = [];
		// $scope.timezone = tz.name();
		// $scope.minDate = moment();
		// $scope.maxDate = moment.tz($scope.timezone).add(4, 'd').hour(12).startOf('h');
		// $scope.Event.eventDate = moment();
		$scope.ok = function (form){
			if(form.location.$error.required ){
				$scope.errCheck = 'Location is required';
			}else if(form.location.$error.required){
					$scope.errCheck = 'Title is required';
			}else if(form.username.$error.required){
				$scope.errCheck = 'Title is required';
			}else{

				$uibModalInstance.close($scope.Event);
			}
		}

		$scope.cancel = function (){
			$uibModalInstance.dismiss('cancel');
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
			$scope.image_url = '../uploads/images/'+fileItem.file.name;
			$scope.promotion_image = fileItem.file.name;

		};
		$scope.uploader.onCompleteAll = function() {
			console.info('uploader', $scope.uploader.queue);
		};

	}])
