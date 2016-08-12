'use strict';

/**
 * @ngdoc function
 * @name bisadministrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bisadministrationApp
 */
angular.module('bisadministrationApp' )
  .controller('ApplicationFetchCtrl', function ($scope,toastr, gatewayService, $http ,$route) {

 $scope.Application = {};
  $scope.selectedItem={};

 $scope.ApplicationSave =function(){
      var item={};
      item.ApplicationName=$scope.Application.ApplicationName;
      gatewayService.request("/api/Administration/1/ApplicationInsert", "POST", item).then(function (data, status, heders, config)
        {
           toastr.success('Записот е успешно снимен!', '');
        }, function (data, status, headers, config) {
        });
       }

      $scope.GetApplication = function(){
      gatewayService.request("/api/Administration/1/ApplicationFetch?applicationid=0", "GET").then(function (data,status,headers,config){
        $scope.Application = data;
         console.log("data", $scope.Application);
      },function(){
      });
       }

    $scope.GetApplication();

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
        $scope.AppName = {};
        $scope.AppName.ApplicationName = item.applicationName;
        $scope.AppName.applicationId = item.applicationId;


        

      }
      else
        $scope.AppName={};


  };
      

      /////////////////////
      $scope.insertupdateApplication = function () {

console.log("selected",$scope.selectedItem );
         if($scope.selectedRow!=null) 
        {
              console.log("App",$scope.Application);
       var item={};
       item.applicationName= $scope.selectedItem.applicationName;
       item.applicationId=$scope.selectedItem.applicationId;
 // console.log("itemU12",$scope.selectedItem);
 // console.log("itemU12",$scope.AppName);
 // console.log("itemappliid",item.applicationId);
 // console.log("itemU545",item);
       gatewayService.request("/api/Administration/1/ApplicationFetch?applicationid="+item.applicationId, "GET").then(function (data, status, heders, config) {
        if(data.length>0) {
 // console.log("itemU55",data);
 //         // item.Type="U";
 //          console.log("itemU",$scope.AppName);
          gatewayService.request("/api/Administration/1/ApplicationUpdate", "POST", $scope.AppName).then(function (data, status, heders, config) {

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
            // var item={};
            // item.applicationName=$scope.AppName.ApplicationName;
console.log("insert",$scope.AppName);
          gatewayService.request("/api/Administration/1/ApplicationInsert", "POST", $scope.AppName).then(function (data, status, heders, config) {
$scope.GetApplication();
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