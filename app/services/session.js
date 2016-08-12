'use strict';

angular.module('bisadministrationApp').factory('session', function ($cookies, $cookieStore, $q) {

    var instance = {};

    instance.token = function () {
        var user = {};

        if ($cookies.get('user')) {
            var token = $cookies.get('user');

            token = token.substring(6, token.length);

            var userCookie = $cookies.get('user');

            userCookie = userCookie.substring(5, userCookie.length);


            //console.log("tt", userCookie);
            userCookie = DecodeString(userCookie);
            //console.log("tt1", userCookie);

            user = angular.fromJson(userCookie);

            return user;
        }
      return null;
    }

    instance.setCookie = function (newToken) {
        var user = {};
        if ($cookies.get('user')) {
            var token = $cookies.get('user');
            token = token.substring(6, token.length);

            var userCookie = $cookies.get('user');
            userCookie = userCookie.substring(5, userCookie.length);
            userCookie = DecodeString(userCookie);
            user = angular.fromJson(userCookie);
            user.token = newToken;

            //$cookies.putObject('user', user);

            var expireDate = new Date();
            expireDate.setMinutes(expireDate.getMinutes() + 15);

            var userJSON = angular.toJson(user);
            userJSON = "user=" + EncodeString(userJSON);//userJSON;
             $cookies.remove("user");
             delete $cookies["user"];
             $cookies.put("user", userJSON, { 'expires': expireDate });

            return user;
        }

        return null;
    }


    instance.destroy = function () {
        instance.usr = null;
        var key;
        if (typeof (Storage) !== "undefined") {
            localStorage.clear();
        }
        for (key in $cookies) {
            delete $cookies[key];
        }
    };


    instance.language = function () {
       // var user = {};

        if ($cookies.get('lg')) {
            var token = $cookies.get('lg');
            token = token.substring(3, token.length);

            //user = angular.fromJson(userCookie);

            return token;
        }
        return null;
    }



    return instance;


});


