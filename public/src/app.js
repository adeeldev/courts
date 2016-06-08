angular.module('TurkishApp',['ngRoute','ngResource','ui.bootstrap', 'angularFileUpload', 'datePicker','ngCookies', 'checklist-model'])
.config(function ($routeProvider,$locationProvider){
	$routeProvider
		.when('/gallery', {
			controller : 'galleryController',
			templateUrl : '../views/galleryView.html'
		})
		.when('/user/participation/:id',{
			controller : 'userParticipationController',
			templateUrl : '../views/userParticipationView.html'
		})
		.when('/gallery/:id',{
			controller : 'albumController',
			templateUrl : '../views/albumView.html'
		})
		.when('/event', {
			controller : 'EventController',
			templateUrl : '../views/event.html'	
		})
		.when('/event/newEvent', {

		})
		.when('/question/:id',{
			controller : 'oneQuestionViewController',
			templateUrl : '../views/oneQuestionView.html'	
		})
		.when('/admin/update',{
			controller : 'adminController',
			templateUrl : '../views/editProfile.html'
		})
		.when('/home',{
			controller : 'HomeController',
			templateUrl : '../views/homeView.html'
		})
		.when('/addData',{
			controller : 'DataCtrl',
			templateUrl : '../views/dataForm.html'

		}).when('/users',{
			controller : 'UserController',
			templateUrl : '../views/userView.html'

		}).when('/admins',{
			controller : 'adminController',
			templateUrl : '../views/adminView.html'

		}).when('/',{
			controller : 'adminController',
			templateUrl : '../views/login.html'

		}).when('/promotion',{
			controller: 'promotionController',
			templateUrl: '../views/promotionView.html'

		}).when('/viewPresentation',{
			controller: 'presentationController',
			templateUrl: '../views/presentationView.html'

		}).when('/Question',{
			controller: 'questionController',
			templateUrl: '../views/questionView.html'

		}).when('/addAlbum',{
			controller: 'galleryController',
			templateUrl: '../views/addGallery.html'

		}).when('/addImages/:id',{
			controller: 'galleryController',
			templateUrl: '../views/addImages.html'

		}).when('/slider',{
			controller: 'galleryController',
			templateUrl: '../views/addSliderImages.html'

		}).when('/sliderView',{
			controller: 'sliderController',
			templateUrl: '../views/sliderView.html'

		}).when('/slots/:id/:slots/',{
			controller: 'slotController',
			templateUrl: '../views/slotView.html'

		}).when('/reset/:token',{
			controller : 'forgetController',
			templateUrl : '../views/reset-password-template.html'
			
		}).when('/booking',{
			controller: 'bookingController',
			templateUrl: '../views/booking.html'

		});  
		$locationProvider 
			// .html5Mode(true)
			.hashPrefix('!');
})