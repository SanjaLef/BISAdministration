'use strict';

/**
 * @ngdoc function
 * @name bisadministrationApp.controller:UserapplicationCtrl
 * @description
 * # UserapplicationCtrl
 * Controller of the bisadministrationApp
 */
angular.module('bisadministrationApp' )
  .controller('UserapplicationCtrl', function ($scope,toastr, gatewayService, $http ,$route ) {
    $scope.Application = {};

    $scope.SelectedUser = {}

    $scope.UserProfile = {}
    $scope.UserProfileN = {}

    $scope.userNameDomain=[];

    $scope.GetUserNameDomain = function(){
      console.log("dd1",$scope.userNameDomain);
    	gatewayService.request("/api/Administration/1/UserNameDomain","GET").then(function (data,status,headers,config){
        console.log("data",data);
    	$scope.userNameDomain=data;
    	console.log("dd",$scope.userNameDomain);
    	},function(){
    		console.log("dd43",$scope.userNameDomain);
    	});
    }
    $scope.GetUserNameDomain();


     $scope.GetApplication = function(){
      gatewayService.request("/api/Administration/1/ApplicationFetch?applicationid=0", "GET").then(function (data,status,headers,config){
        $scope.application = data;
      },function(){
      });
       }

    $scope.GetApplication(); 

    $scope.polni=function(item){
        console.log("ROLES",item)
         gatewayService.request("/api/Administration/1/RoleFetch?roleid=0&applicationid=" + item, "GET").then(function (data, status, heders, config) {
         $scope.roles=data;
      }, function (data, status, headers, config) {
        
      });
    };


      $scope.GetUserProfile1 = function(){
      gatewayService.request("/api/Administration/1/UserProfileFetch", "GET").then(function (data,status,headers,config){
        $scope.UserProfile1 = data;
        console.log("getuserprofile",$scope.UserProfile1);
      },function(){
      });
       }

       $scope.GetUserProfile1();

      $scope.selectedRow = null;  // initialize our variable to null

    $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
      $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
    };

    $scope.previewForEdit = function(item) {
      //console.log("selectedRow",$scope.selectedRow);
      if($scope.selectedRow != null) {
        console.log("this is the item: ", item);
        $scope.selectedItem=item;
        $scope.UserProfileN = {};
        $scope.SelectedUser = item.userName;
        $scope.UserProfileN.ApplicationId = item.applicationId;
        $scope.polni(item.applicationId);
        $scope.UserProfileN.RoleID = item.roleId;
        $scope.UserProfileN.UserName = item.userName;
      }
      else
        $scope.UserProfile={};
      };
      
      $scope.insertupdateUsers = function () {

      console.log("selected",$scope.selectedItem );
         if($scope.selectedRow!=null) 
        {
              console.log("$scope.UserProfile",$scope.UserProfile);
       var item={};
       item.userProfileId= $scope.selectedItem.userProfileId;
       item.applicationId=$scope.UserProfileN.ApplicationId;
       item.roleId=$scope.UserProfileN.RoleID;
       item.userName=$scope.SelectedUser;
       item.active=1;
       console.log("item za vnes",item);
       gatewayService.request("/api/Administration/1/UserProfileFetch?userProfileId="+ item.userProfileId, "GET").then(function (data, status, heders, config) {
        if(data.length>0) {
 // console.log("itemU55",data);
 //         // item.Type="U";
 //          console.log("itemU",$scope.Role);
          gatewayService.request("/api/Administration/1/UserProfileUpdate", "POST", item).then(function (data, status, heders, config) {

            toastr.success('Записот е успешно изменет');
           // $scope.GetApplication();
            $route.reload();
          }, function (data, status, headers, config) {
            console.log(status);
        

      });
      }
          }, function (data, status, headers, config) {
        console.log(status);
      });
     }
   
        else {
       var item={};
       console.log("$scope.SelectedUser",$scope.SelectedUser)
       item.userProfileId= 0;
       item.applicationId= $scope.UserProfileN.ApplicationId;
       item.roleId=$scope.UserProfileN.RoleID;
       item.userName=$scope.SelectedUser.userID;
       item.active=1;
console.log("insert33",item);
console.log("insert3app",$scope.UserProfileN);
          gatewayService.request("/api/Administration/1/UserProfileInsert", "POST",item).then(function (data, status, heders, config) {
            toastr.success('Записот е успешно снимен');
            $route.reload();
          }, function (data, status, headers, config) {
            console.log(status);
          });
    

    }
  };

});
