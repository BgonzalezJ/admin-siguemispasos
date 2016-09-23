sgmpApp.controller("loginController", function ($scope, User, $location) {	
	$scope.password;

	$scope.login = function () {
		User.login($scope.password, {
			success: function (){
				$location.path("/");
			},
			error: function (r) {
				angular.element("#login .alert").html(r.message);
				angular.element("#login .alert").addClass("show");
			}
		});
	}
});