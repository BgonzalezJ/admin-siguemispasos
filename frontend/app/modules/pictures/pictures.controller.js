sgmpApp.controller("picturesController", function ($scope, $rootScope, User, $http) {	

	$scope.page = 0;
	$scope.pictures = [];
	$scope.nomore = false;

	$scope.getPictures = function (page) {

			var headers = {headers: {Authorization: User.token}};
			if (!page)
				page = 0;

			$http.get(appconfig.api + '/pictures/page/' + page, headers)
			.success(function (data) {
				
				if (data.pictures.length > 0) {
					for (var i = 0; i < data.pictures.length; i++) {
						var pic = data.pictures[i];
						var found = false;
						for (var j = 0; j < $scope.pictures.length;j++) {
							if (pic.id == $scope.pictures[j].id) {
								found = true;
								j = $scope.pictures.length;
							}
						}
						if (!found) {
							$scope.pictures.push(pic);
						}
					}
					$scope.page = data.nextPage;
					jQuery('html, body').animate({
					    scrollTop: document.body.clientHeight
					}, 1000);
				} else {
					$scope.nomore = true;
				}
			});
	};

	$scope.search = function () {
		angular.element("#pictures .loader").addClass("show");
		angular.element("#pictures .alert").html("Esto puede tomar unos minutos.");
		angular.element("#pictures .alert").addClass("show");
		var headers = {headers: {Authorization: User.token}};
		$http.get(appconfig.api + '/pictures/search', headers)
		.success(function (data) {
			angular.element("#pictures .loader").removeClass("show");
			if (data.pictures.length > 0) {
				var bkp_array = $scope.pictures;
				$scope.pictures = data.pictures.concat(bkp_array);
			}
			jQuery('html, body').animate({
			    scrollTop: jQuery("#pictures ul").offset().top
			}, 1000);
			angular.element("#pictures .alert").html("Se ha(n) encontrado " + data.pictures.length + " elemento(s).");
		})
		.error(function (data) {
			angular.element("#pictures .loader").removeClass("show");
			angular.element("#pictures .alert").html(data.message);
		});
		
	}

	$scope.getMore = function () {
		$scope.getPictures($scope.page);
	}

	$scope.activar = function (picture) {
		var headers = {headers: {Authorization: User.token}};
		$http.put(appconfig.api + '/pictures/publicar/' + picture.id, {}, headers)
		.success(function (data) {
			if (data.picture)
				picture.active = data.picture.active;
		})
		.error(function (data) {
			alert(data.message);
		});
	}

	$scope.getPictures();
});