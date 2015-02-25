'use strict';
define(['app'], function (app) {
	app.register.controller('dashboardController', ['$scope','$http', function($scope,$http) {
	 	var ng = $scope;
		ng.saludo = 'dashboard :3';
		// console.log('Estoy en Index');
		// ng.cerrarSession = function(){
		// 	console.log('Cerrar session');
		// 	$:http.post('/log-out').success(successCallBack);
		// };
	}]);
});
