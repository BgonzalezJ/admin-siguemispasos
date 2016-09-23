sgmpApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/',
	{
		templateUrl: '/app/modules/pictures/pictures.template.html',
		controller: 'picturesController'
	})
	.when('/login',
	{
		templateUrl: '/app/modules/login/login.template.html',
		controller: 'loginController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);
