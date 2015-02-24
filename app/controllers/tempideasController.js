'use strict';
define(['app'], function (app) {
	app.register.controller('tempideasController', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
		ng.saludo = 'Hola soy Ideas';
	}]);
});
