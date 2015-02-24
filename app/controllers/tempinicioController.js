'use strict';
define(['app'], function (app) {
	app.register.controller('tempinicioController', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
		ng.saludo = 'Hola soy inicio';
	}]);
});
