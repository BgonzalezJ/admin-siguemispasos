sgmpApp.run(function ($location, User){
	User.fetch(function (user){
		if (user) {
			$location.path("/");
		} else {
			$location.path("/login");
		}
	});
});
