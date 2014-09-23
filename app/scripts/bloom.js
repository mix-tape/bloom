var app = angular.module('bloom', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute']);

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
			element.fadeIn(500, done);
			return function() {
				element.stop();
			}
		},
		leave: function(element, done) {
			element.css('position', 'absolute');
			element.fadeOut(500, done);

			return function() {
				element.stop();
			}
		}
	}
})

app.controller('MainController', ['$scope', '$route', '$location', function($scope, $route, $location) {

	$scope.location = $location.path();

	$scope.$on('$routeChangeSuccess', function(ev,data) {
		$scope.routeClassName = $route.current.locals.className;
	})

}]);

app.run(['$rootScope', function ($rootScope) {

	'use strict';

}]);
