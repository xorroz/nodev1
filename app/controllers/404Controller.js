'use strict';
define(['app'], function (app) {
	app.register.controller('404Controller', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
		ng.saludo = 'No se encontro la ruta especificada :(';
	}]);
});
