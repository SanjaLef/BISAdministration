'use strict';

/**
 * @ngdoc function
 * @name bisadministrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bisadministrationApp
 */
angular.module('bisadministrationApp' )
  .controller('MainCtrl', function ($scope,toastr, gatewayService, $http ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.Role={};
    $scope.Permission ={};
     $scope.Application ={};

     $scope.GetApplication = function(){
      gatewayService.request("/api/Administration/1/ApplicationFetch?applicationid=0", "GET").then(function (data,status,headers,config){
        $scope.application = data;
      },function(){
      });
       }

    $scope.GetApplication();
    $scope.polni=function(item){
        console.log(item)
         gatewayService.request("/api/Administration/1/RoleFetch?roleid=0&applicationid=" + item, "GET").then(function (data, status, heders, config) {
    //    console.log(data)
        // if(data.length<1)
        // {
        //   toastr.warning("Не постојат податоци.");
        // }
               $scope.roles=data;

      }, function (data, status, headers, config) {
        console.log(status);

      });
    };
 $scope.polniCombo=function(item){
     gatewayService.request("/api/Administration/1/PermissionFetch?permissionid=0&roleid=" + item, "GET").then(function (data,status,headers,config){
        $scope.permissions = data;
      },function(){
      });
 }
    $scope.GetRole = function () {
            // var url = "api/Administration/1/RoleFetch?roleid=0"
            // gatewayService.request(url, "GET").then(
            //    function (data, status, headers, config) {
            //     console.log("roles",data);
            //     $scope.roles = data;
            //    },
            //    function (data, status, headers, config)
            //    { }
            //    )
            // ;
console.log("zz" ,$scope.Application)
           
            //  gatewayService.request("api/Administration/1/RoleFetch?roleid=0", "GET").then(function (data, status, heders, config)
            // {
            //   console.log("uspeh")

             
            // }, function (data, status, headers, config) {
            //   console.log(status);
            // });

        }

    $scope.GetRole();

    $scope.GetPermission= function(){
   
       }

    $scope.GetPermission();
     // $scope.GetPermission = function () {
     //        var url = "api/Administration/1/PermissionFetch?permissionid=0"
     //        gatewayService.request(url, "GET").then(
     //           function (data, status, headers, config) {
     //            console.log(data);
     //            $scope.permissions = data;
     //           },
     //           function (data, status, headers, config)
     //           { }
     //           )
     //        ;
     //    }

       // $scope.GetPermission();

  $scope.ApplicationRolePermissionSave =function(){
      var item={}
      item.ApplicationId=$scope.Application.ApplicationId;
      item.RoleId =$scope.Role.RoleID ;
      item.PermissionId = $scope.Permission.PermissionId;
      gatewayService.request("/api/Administration/1/InsertApplicationRolePermission", "POST", item).then(function (data, status, heders, config)
        {
           toastr.success('Записот е успешно снимен!', '');
        }, function (data, status, headers, config) {
        });
       }

$scope.RolePermissionSave = function  () {

  var item={}
      item.RoleId =$scope.Role.RoleID ;
      item.PermissionId = $scope.Permission.PermissionId;
     
   //   console.log("Item",item);
 //        gatewayService.request("api/Administration/1/InsertRolePermission1", "POST",item).then(function (data, status, heders, config)
 //         {
 // //console.log("Item",item);
 // //         // console.log("data",data);
 //          $route.reload();

 //           $scope.item.selected={RoleId:item.RoleId,PermissionId: item.PermissionId};
 //          toastr.success('Записот е успешно снимен!', '');
 //       }, function (data, status, headers, config) {
 //          console.log(status);
 //        });

     gatewayService.request("/api/Administration/1/InsertRolePermission1", "POST", item).then(function (data, status, heders, config)
        {
          //console.log("uspeh")

        }, function (data, status, headers, config) {
        //  console.log(status);
        });


  // $http.post("http://localhost:2628/api/Administration/1/InsertRolePermission1", item).success(function(data, status) {
           
  //     console.log('da', data);

  // });

}


 // console.log("zz" ,$scope.Products.ProductTypeID)

 //  $scope.vidRabotaSave = function () {

 //    var item={}
 //    item.Type="U";
 //    item.ProductTypeID =$scope.Products.ProductTypeID ;
 //    item.ProductID = $scope.Products.ProductID;
 //    item.Description= $scope.Products.Decsription ;
 //    if($scope.Products.Status==true)
 //    {
 //      item.Status="1";
 //    }
 //    else
 //    {
 //      item.Status="0";
 //    }
 //    item.OpeningDate=$filter('date')( $scope.Products.OpeningDate, "yyyy-MM-dd");
 //    if(item.ClosingDate!=null)
 //    {
 //      item.ClosingDate=$filter('date')(   $scope.Products.ClosingDate, "yyyy-MM-dd");
 //    }
 //   // console.log("Item",item);
 //    gatewayService.request("/api/Products/1/ProductsFetchByProductIDProductTypeID?ProductTypeID="+$scope.Products.ProductTypeID+"&ProductID="+$scope.Products.ProductID, "GET").then(function (data, status, heders, config)
 //    {


 //      if(data.length>0)
 //      { //console.log("dat",data);
 //        $scope.productExist = false;

 //        gatewayService.request("/api/Products/1/ProductsUpdate", "POST",item).then(function (data, status, heders, config)
 //        {
 //         // $route.reload();
 //          console.log("sel111",$scope.item.selected);
 //          $scope.item.selected={ProductTypeID:item.ProductTypeID,ProductID: item.ProductID,Description:item.Description};
 //          console.log("sel",$scope.item.selected);
 //          toastr.success('Записот е успешно уреден!', '');
 //        }, function (data, status, headers, config) {
 //          console.log(status);
 //        });


 //        // console.log(item);
 //       // $scope.products.push(item);
 //      }
 //      else
 //      {
 //       // console.log("pro", $scope.Products);  console.log("ii", item)//return false;
 //        //item.ProductTypeID =$scope.Products.ProductTypeID.ProductTypeID ;

 //        item.Type="I";
 //        gatewayService.request("/api/Products/1/ProductsInsert", "POST",item).then(function (data, status, heders, config)
 //        {
 //         // console.log("Item",item);
 //         // console.log("data",data);
 //          $route.reload();

 //          $scope.item.selected={ProductTypeID:item.ProductTypeID,ProductID: item.ProductID,Description:item.Description};
 //          toastr.success('Записот е успешно снимен!', '');
 //        }, function (data, status, headers, config) {
 //          console.log(status);
 //        });


 //      //  $scope.products.push(item);
 //      }
 //    }, function (data, status, headers, config) {
 //      console.log(status);
 //    });
 //  }
 //  /////////////////////////////////////// Inicijalizacija na OpeningDate na denes /////////////////////////////////
 //  $scope.init = function () {
 //    $scope.Products.OpeningDate = new Date();

 //  }

 

 //  /////////////////////////////////////// Button Otkazi /////////////////////////////////

 //  $scope.cancel=function () {
 //    $scope.Products.ProductID=null;
 //    $scope.Products.ProductTypeID=null;
 //    $scope.Products.Decsription=null;
 //    $scope.Products.Status=true;
 //    $scope.Products.OpeningDate=new Date();
 //    $scope.Products.ClosingDate="";
 //    $route.reload();
 //  }​

  });
