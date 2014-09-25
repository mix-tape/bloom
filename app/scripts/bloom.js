var app = angular.module('bloom', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'slick']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
'use strict';

	// $locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			resolve: {
				className: function () {
					return 'home';
				}
			}
		})
		.when('/:page', {
			templateUrl : function(parameters) {
				return 'partials/' + parameters.page + '.html';
			},
			resolve: {
				className: function($route) {
					return $route.current.params.page;
				}
			}
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.directive('activelink', function($location) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			scope.$watch(function() {
				return $location.path();
			},

			function(path) {

				var url = element.attr('href');

				if (url) {
					url = url.substring(1);
				}

				if (path == url) {
					element.addClass("active");
				} else {
					element.removeClass('active');
				}

			});
		}
	};
});


app.animation('.reveal-animation', function() {
	return {
		enter: function(element, done) {
			element.css('display', 'none');
			element.css('position', 'relative');
			element.fadeIn(700, done);
			return function() {
				element.stop();
			}
		},
		leave: function(element, done) {
			element.css('position', 'absolute');
			element.fadeOut(700, done);

			return function() {
				element.stop();
			}
		}
	}
})

app.controller('MainController', ['$scope', '$route', '$location', '$http', '$q', function($scope, $route, $location, $http, $q) {

	$scope.location = $location.path();

	$scope.$on('$routeChangeSuccess', function(ev,data) {
		$scope.routeClassName = $route.current.locals.className;
	});

	setTimeout(function() {
		angular.element('body').removeClass('faded');
	}, 1000);

	$scope.enquiry = {};

	$scope.submitForm = function (isValid) {

		if (isValid) {

			console.log($scope.enquiry);

			$http({
				method: 'post',
				url: '/processForm.php',
				params: $scope.enquiry,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (response) {
				$scope.success = true;
			}).error(function (response) {

			})


		} else {
			console.log("Whoops, missing something");
		}
	}

}]);

app.run(['$rootScope', function ($rootScope) {

	'use strict';

}]);
