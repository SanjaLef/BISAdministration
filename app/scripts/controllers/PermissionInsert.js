'use strict';

/**
 * @ngdoc function
 * @name bisadministrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bisadministrationApp
 */
angular.module('bisadministrationApp' )
  .controller('PermissionInsertCtrl', function ($scope,toastr, gatewayService, $http ,$route) {

  $scope.PermissionN={};
  $scope.Permission = {};
  $scope.selectedItem={};

 $scope.PermissionSave =function(){
      var item={};
      item.PermissionDescription=$scope.Permission.PermissionDescription;
      gatewayService.request("/api/Administration/1/PermissionInsert", "POST", item).then(function (data, status, heders, config)
        {
           toastr.success('Записот е успешно снимен!', '');
        }, function (data, status, headers, config) {
        });
       }

      $scope.GetPermission = function(){
      gatewayService.request("/api/Administration/1/PermissionFetch?permissionid=0", "GET").then(function (data,status,headers,config){
        $scope.Permission = data;
         console.log("data", $scope.Permission);
      },function(){
      });
       }

    $scope.GetPermission();

     $scope.selectedRow = null;  // initialize our variable to null

    $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
      $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
      console.log($scope.selectedRow);
    };

    $scope.previewForEdit = function(item) {
      //console.log("selectedRow",$scope.selectedRow);
      if($scope.selectedRow != null) {
        console.log("this is the item: ", item);
        $scope.selectedItem=item;
        $scope.PermissionN = {};
        $scope.PermissionN.PermissionDescription = item.permissionDescription;
        $scope.PermissionN.permissionId = item.permissionId;


        

      }
      else
        $scope.PermissionN={};


  };
      

      /////////////////////
      $scope.insertupdatePermission = function () {

console.log("selected",$scope.selectedItem );
         if($scope.selectedRow!=null) 
        {
             
       var item={};
       item.permissionDescription= $scope.PermissionN.PermissionDescription;
       item.permissionId=$scope.selectedItem.permissionId;
 // console.log("itemU12",$scope.selectedItem);
 // console.log("itemU12",$scope.AppName);
 // console.log("itemappliid",item.applicationId);
 // console.log("itemU545",item);
       gatewayService.request("/api/Administration/1/PermissionFetch?permissionid="+item.permissionId, "GET").then(function (data, status, heders, config) {
        if(data.length>0) {
 // console.log("itemU55",data);
 //         // item.Type="U";
 //          console.log("itemU",$scope.AppName);
  console.log("update",item);
          gatewayService.request("/api/Administration/1/PermissionUpdate", "POST", item).then(function (data, status, heders, config) {

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
            item.PermissionDescription=$scope.PermissionN.PermissionDescription;
console.log("insert $scope.Permission",$scope.Permission);
console.log("insert item ",item);
          gatewayService.request("/api/Administration/1/PermissionInsert", "POST", item).then(function (data, status, heders, config) {
$scope.GetPermission();
            toastr.success('Записот е успешно снимен');
            $route.reload();
          }, function (data, status, headers, config) {
            console.log(status);
          });
    

    }
  };
      /////////////////////

  
      //   if(item.Pol=="М")
      //   {
      //     $scope.Komitent.Pol={Pol:'М'};


      //   }
      //   else if(item.Pol=="Ж")
      //   {
      //     $scope.Komitent.Pol={Pol:'Ж'};
      //   }


      // }
      // else {
      //   $scope.Komitent={};
      // }

  


     });