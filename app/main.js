angular.element(document).ready(function () {
	require([
		'app'
		],
		function (app){
			console.info('APP');
			APP.DATA.FN.getInitialize(function (rpta){
				console.log(rpta);
				angular.bootstrap(angular.element(document), [
					'appModule'
				]);
				APP.DATA.FN.showMessageStart('CODE001');
				APP.DATA.FN.removeMessageStart();
			});
		});
});