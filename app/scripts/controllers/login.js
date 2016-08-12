'use strict';

/**
 * @ngdoc function
 * @name bisadministrationApp.controller:UserapplicationCtrl
 * @description
 * # UserapplicationCtrl
 * Controller of the bisadministrationApp
 */
angular.module('bisadministrationApp' )
  .controller('LoginCtrl', function ($scope,toastr, gatewayService, $http ,$route,$location ) {
  	  if(localStorage.getItem("loginData")){

        var authData = JSON.parse(localStorage.getItem("loginData"));
        console.log(authData);
    }


    if (authData) {
      $location.path('/main');
    }


    $scope.loginData = {};
    var InfoUserProfile={};


    $scope.login = function(){

      var InfoBanka={};
      var InfoReferent={};

      gatewayService.request("/api/Administration/1/UserProfileFetchLogin?userProfileName="+$scope.loginData.UserName, "GET").then(function (data, status, heders, config) {

        if(data.length<1)
        {
          toastr.warning("Корисничкото име не постои!");
        }
        else
        {
          toastr.success("Успешна најава!");
           $location.path("/main")
         //  InfoBanka=data;
         // // console.log(InfoBanka);
         //  gatewayService.request("/api/Login/1/FetchReferent?Banka="+$scope.loginData.Banka+"&Referent="+$scope.loginData.Operator+"&Lozinka="+$scope.loginData.Lozinka, "GET").then(function (data, status, heders, config) {

         //    if(data.length<1)
         //    {
         //      toastr.warning("Погрешно внесени оператор или лозинка!");
         //    }
         //    else
         //    {
         //      InfoReferent=data;
         //     // console.log(InfoReferent[0].Ime);
         //      $scope.loginData.Naziv= InfoBanka[0].Naziv;
         //      $scope.loginData.Ime= InfoReferent[0].Ime;
         //      $scope.loginData.Prezime= InfoReferent[0].Prezime;
         //      $scope.loginData.Pozicija= InfoReferent[0].Pozicija;
         //      console.log("logindata",  $scope.loginData);
         //      toastr.success("Успешна најава!");


         //      localStorage.setItem("loginData", JSON.stringify($scope.loginData));



         //      $location.path("/main")

         //    }


         //  }, function (data, status, headers, config) {
         //    console.log(status);

         //  });


        }


      }, function (data, status, headers, config) {
        console.log(status);

      });




      // authService.login(loginData).then(function (data, status, headers, config) {
      //   console.log(data);
      //   $location.path("/main")
      // }, function (data, status, headers, config) {
      //   alert(data);
      //   console.log(data);
      // });


    }




  });

