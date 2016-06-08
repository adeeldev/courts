angular.module('TurkishApp')
	.service('eventService',['$http','$location',function ($http,$location){

		var URL = "http://" + $location.host() + ':' + $location.port() + "/event";
		var req = {};
		this.getAllEvents = function(){
			req = {
				'method' : 'GET',
				'url' : URL,
			}
			return $http(req);
		}
		this.addEvent = function (Data){
			req = {
				method : "POST",
				url : URL + '/addEvent',
				header : {
					"Content-Type" : "application/json"
				},
				data : Data
			}
			return $http(req);
		}
		this.updateEvent = function (Data){
			req = {
				method : "POST",
				url : URL + '/updateEvent',
				header : {
					"Content-Type" : "application/json"
				},
				data : Data
			}
			return $http(req);
		}
		this.removeEvent = function (Data){
			req = {
				method : "POST",
				url : URL + '/deleteEvent',
				header : {
					"Content-Type" : "application/json"
				},
				data : Data
			}
			return $http(req);
		}

	}])