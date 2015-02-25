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
		//rutas fijas
		$routeProvider.when('/dashboard', route.resolve('dashboard'));
		$routeProvider.when('/404', route.resolve('404'));
		$routeProvider.when('/', route.resolve('dashboard'));

		$routeProvider.when('/', { redirectTo: '/dashboard' });
		$routeProvider.otherwise({ redirectTo: '/404' });
	}]);

	app.controller('appController', ['$scope','$http','dataResource', function($scope,$http,dataResource) {
	    var ng = $scope;
	    ng.menuDemo = [];
	}]);



	app.factory('dataResource', ['$resource',function ($resource) {
		// return $resource("json/menu.json",
  //       	{},
  //       	{ get: { method: "GET", isArray: true }
  //   	})
    }]);

	return app;
});