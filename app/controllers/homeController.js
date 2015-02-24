'use strict';
define(['app'], function (app) {
	app.register.controller('homeController', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
		ng.saludo = 'Login System';
	}]);
});
