'use strict';

/**
 * @ngdoc function
 * @name bisadministrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bisadministrationApp
 */
angular.module('bisadministrationApp' )
  .controller('RoleInsertCtrl', function ($scope,toastr, gatewayService, $http ,$route) {

 $scope.Role = {};
 $scope.RoleN = {};
  $scope.selectedItem={};
   $scope.Application ={};

     $scope.GetApplication = function(){
      gatewayService.request("/api/Administration/1/ApplicationFetch?applicationid=0", "GET").then(function (data,status,headers,config){
        $scope.application = data;
      },function(){
      });
       }

    $scope.GetApplication();

 

      $scope.GetRole = function(){
      gatewayService.request("/api/Administration/1/RoleFetch", "GET").then(function (data,status,headers,config){
        $scope.Role = data;
        // $scope.Role.roleId=data[0].roleId;
        // $scope.Role.roleDescription= data[0].roleDescription;
        console.log("getrole",$scope.Role);
      },function(){
      });
       }

    $scope.GetRole();

     $scope.selectedRow = null;  // initialize our variable to null

    $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
      $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
    };

    $scope.previewForEdit = function(item) {
      //console.log("selectedRow",$scope.selectedRow);
      if($scope.selectedRow != null) {
        console.log("this is the item: ", item);
        $scope.selectedItem=item;
        $scope.RoleN = {};
        $scope.RoleN.RoleDescription = item.roleDescription;
        $scope.RoleN.ApplicationId = item.applicationId;
        $scope.RoleN.RoleId = item.roleid;
      }
      else
        $scope.RoleName={};
      };
      

      /////////////////////
      $scope.insertupdateRole = function () {

      console.log("selected",$scope.selectedItem );
         if($scope.selectedRow!=null) 
        {
              console.log("Role",$scope.Role);
       var item={};
       item.roleId= $scope.selectedItem.roleId;
       item.roleDescription= $scope.RoleN.RoleDescription;
       item.applicationId=$scope.RoleN.ApplicationId;
       console.log("item.roleid",item.roleid);
       console.log("item.applicationId",item.applicationId);
       console.log("scope.selectedItem.applicationId",$scope.selectedItem.applicationId);
       gatewayService.request("/api/Administration/1/RoleFetch?roleid="+ item.roleId +"&applicationid="+$scope.selectedItem.applicationId, "GET").then(function (data, status, heders, config) {
        if(data.length>0) {
 // console.log("itemU55",data);
 //         // item.Type="U";
 //          console.log("itemU",$scope.Role);
          gatewayService.request("/api/Administration/1/RoleUpdate", "POST", item).then(function (data, status, heders, config) {

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
       item.roleid= 0;
       item.roledescription= $scope.RoleN.RoleDescription;
       item.applicationId=$scope.RoleN.ApplicationId;
console.log("insert33",item);
console.log("insert3app",$scope.RoleN);
          gatewayService.request("/api/Administration/1/RoleInsert", "POST",item).then(function (data, status, heders, config) {
$scope.GetRole();
            toastr.success('Записот е успешно снимен');
            $route.reload();
          }, function (data, status, headers, config) {
            console.log(status);
          });
    

    }
  };
  
  


     });