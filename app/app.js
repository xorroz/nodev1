define(['services/routeResolver'],function () {
	var app = angular.module('appModule', ['ngRoute','ngResource','routeResolverServices']);

	console.info('app.js');
	console.info('USUARIO: '+ APP.DATA.CONFIG.USUARIO);
	console.info('URL: '+ APP.DATA.CONFIG.URL_TEMPLATE);

	app.config(['$routeProvider','routeResolverProvider','$controllerProvider','$compileProvider','$filterProvider','$provide',
		function ($routeProvider,routeResolverProvider,$controllerProvider,$compileProvider,$filterProvider,$provide) {
		
		app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

		var route = routeResolverProvider.route;
		angular.forEach(APP.DATA.CONFIG.MENU, function(obj){
			$routeProvider.when('/'+obj.temp, route.resolve(obj.temp));
		});

		$routeProvider.otherwise({ redirectTo: '/404' });
	}]);

	// app.controller('tempideasController', ['$scope', function ($scope) {
	// 	var ng = $scope;
	// 	ng.saludo = 'Hola soy el IDEAS';
	// }]);

	// app.controller('tempinicioController', ['$scope', function ($scope) {
	// 	var ng = $scope;
	// 	ng.saludo = 'Hola soy el IINICIOS';
	// }]);

	app.controller('appController', ['$scope','$http','dataResource', function($scope,$http,dataResource) {
	    var ng = $scope;
	    ng.menuDemo = [];

	    $http.get('/menu')
	    	.success(function(data){
	    		ng.menuDemo = data;
	    		console.log('before ----------------------');
	    		console.info(data);
	    	});

	    
	    // angular.forEach(APP.DATA.CONFIG.MENU, function(val){
	    // 	$scope.menuDemo.push(val);
	    // });

	    // sconsole.info(ng.prueba);
	    // $http.get("json/menu.json").success(function (data){
	    // 	ng.datos = data;
	    // });

	    // console.info(ng.datos);
	    // ng.dataResource = dataResource.get();
	}]);



	app.factory('dataResource', ['$resource',function ($resource) {
		// return $resource("json/menu.json",
  //       	{},
  //       	{ get: { method: "GET", isArray: true }
  //   	})
    }]);

	return app;
});