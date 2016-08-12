'use strict';

/**
 * @ngdoc overview
 * @name bisadministrationApp
 * @description
 * # bisadministrationApp
 *
 * Main module of the application.
 */
angular
  .module('bisadministrationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'ngAnimate', 
    'toastr',
    'mgcrea.ngStrap',
    'angularUtils.directives.dirPagination'
   ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/userapplication', {
        templateUrl: 'views/userapplication.html',
        controller: 'UserapplicationCtrl',
        controllerAs: 'userapplication'
      })
       .when('/ApplicationFetch', {
        templateUrl: 'views/ApplicationFetch.html',
        controller: 'ApplicationFetchCtrl',
         controllerAs: 'ApplicationFetch'
      })
        .when('/RoleInsert', {
        templateUrl: 'views/RoleInsert.html',
        controller: 'RoleInsertCtrl',
         controllerAs: 'RoleInsert'
      })
         .when('/PermissionInsert', {
        templateUrl: 'views/PermissionInsert.html',
        controller: 'PermissionInsertCtrl',
         controllerAs: 'PermissionInsert'
      })
           .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
         controllerAs: 'Login'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
