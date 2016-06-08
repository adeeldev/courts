angular.module('TurkishApp')
	.controller('DataCtrl',['$scope','multiPart',function ($scope,multiPart){

		$scope.newData = {};
		$scope.newData.type = 'Presentation';

		$scope.Submit = function(){
			var url = 'http://localhost:5000/'
		}

		$scope.readURL = function(input,id) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            reader.onload = function (e) {
	                $('#'+id)
	                    .attr('src', e.target.result);
	            };
		        reader.readAsDataURL(input.files[0]);
		    }
	    }
	    $scope.AddAttr = function(){
	    	if ($("#select").val()=='Video') {
	    		$('#dataFile').attr('accept','video/*');
	    	}else if($("#select").val()=='Presentation'){
	    		$('#dataFile').attr('accept','.pdf');
	    	}else{
	    		$('#dataFile').attr('accept','image/*');
	    	}
	    	console.log("OHK");
	    }
	}])