angular.module('AwesomeCI', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'ngSanitize'])

.controller('DashboardController', ['$scope', '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location) {
    console.log("Initialized");
}])
.controller('JobController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.jobName = $routeParams.job;
    $scope.job = {};
    $scope.builds = [];
    $http.get('/job/'+$scope.jobName)
    .success(function(data, status, headers, config) {
        if (!data.error){
            $scope.job = data.job;
            $scope.builds = data.builds;
            console.log($scope.builds);
        }else{
            console.log('error');
        }
    })
    .error(function(data, status, headers, config) {
        console.log('success')
    });

}])
.controller('MainContentController', ['$scope', '$http', function($scope, $http) {
    console.log("Initialized");
}])
.controller('DrawerController', ['$scope', '$http', function($scope, $http) {

    $scope.jobs = [];

    $http.get('/jobs')
    .success(function(data, status, headers, config) {
        $scope.jobs = data.jobs;
    })
    .error(function(data, status, headers, config) {
        console.log('success')
    });

}])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'html/dashboard.html',
        controller: 'DashboardController'
    })
    .when('/dashboard', {
        templateUrl: 'html/dashboard.html',
        controller: 'DashboardController'
    })
    .when('/jobs/:job', {
        templateUrl: 'html/job.html',
        controller: 'JobController'
    })
}])