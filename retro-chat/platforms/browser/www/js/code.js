var SERVER = "http://retrochatrestapi.azurewebsites.net";

var app = {

    showLoading: function () {
        document.getElementById("loading").style.display = "block";
    },
    hideLoading: function () {
        document.getElementById("loading").style.display = "none";
    },
    showMenu: function (show) {
        if (show) {
            document.getElementById("header-chat").style.visibility = "visible";
            document.getElementById("header-logout").style.visibility = "visible";
            document.getElementById("footer-menu").style.visibility = "visible";
        } else {
            document.getElementById("header-chat").style.visibility = "hidden";
            document.getElementById("header-logout").style.visibility = "hidden";
            document.getElementById("footer-menu").style.visibility = "hidden";
        }
    }

};
// create the module
var retroApp = angular.module('retroApp', ['ngRoute', 'ngCordova']);

// configure routes
retroApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'account.html',
            controller: 'accountCtrl'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .when('/index.html', {
            templateUrl: 'account.html',
            controller: 'accountCtrl'
        })
        .when('/account', {
            templateUrl: 'account.html',
            controller: 'accountCtrl'
        })
        .when('/create', {
            templateUrl: 'create.html',
            controller: 'createCtrl'
        })
        .when('/search', {
            templateUrl: 'search.html',
            controller: 'searchCtrl'
        })
        .when('/post', {
            templateUrl: 'post.html',
            controller: 'postCtrl'
        })
        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userCtrl'
        })
        .when('/chat', {
            templateUrl: 'chat.html',
            controller: 'chatCtrl'
        });

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});


// create the controller and inject Angular's $scope
retroApp.controller('accountCtrl', function ($scope, $http, $location) {
    if (localStorage['id'] !== undefined) {
        app.showMenu(true);
        $location.path('/home');
    }
    $scope.loginButton = function () {
        var data = $.param({
            'UserName': $scope.login,
            'Password': $scope.password
        });

        var config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        app.showLoading();
        $http.post(SERVER + "/Account/Login", data, config)
            .then(
            function (response) {
                app.hideLoading();
                $scope.data = response.data;
                if (response.data.loggedIn) {
                    localStorage['id'] = response.data.id;
                    localStorage['username'] = response.data.userName;
                    app.showMenu(true);
                    $location.path('/home');
                } else {
                    $scope.loginError = response.data.text;
                }

            },
            function (response) {
                // failure callback
                app.hideLoading();
            }
            );

    };
    $scope.registerButton = function () {
        var data = $.param({
            'UserName': $scope.registerUsername,
            'Password': $scope.registerPassword
        });
        var config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        app.showLoading();
        $http.post(SERVER + "/Account/Register", data, config)
            .then(
            function (response) {
                app.hideLoading();
                $scope.data = response.data;
                if (response.data.success) {
                    localStorage['id'] = response.data.id;
                    localStorage['username'] = response.data.userName;
                    app.showMenu(true);
                    $location.path('/home');
                } else {
                    $scope.registerError = response.data.text;
                }
            },
            function (response) {
                // failure callback
                app.hideLoading();
            }
            );

    };
    $scope.logoutButton = function () {
        localStorage.clear();
        app.showMenu(false);
        $location.path('/');
    };

});

retroApp.controller('homeCtrl', function ($scope, $http, $location) {


    var config = {
        params: {
            id: localStorage['id']
        }
    };
    app.showLoading();
    $http.get(SERVER + "/Members/Home", config)
        .then(
        function (response) {
            $scope.data = response.data;
            $scope.id = response.data.id;
            $scope.username = response.data.userName;
            $scope.posts = response.data.posts;
            app.hideLoading();
        },
        function (response) {
            // failure callback
            app.hideLoading();
        }
        );
    $scope.setPost = function (userID, postID) {
        localStorage["userID"] = userID;
        localStorage["postID"] = postID;
    };

});

retroApp.controller('createCtrl', function ($scope, $http, $cordovaCamera, $location) {

    // create a message to display in our view
    $scope.message = 'Hello test page!';
    document.addEventListener("deviceready", function () {
        console.log(device.platform);
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            allowEdit: true,
            encodingType: 0,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            var image = document.getElementById('postImage');
            image.src = "data:image/png;base64," + imageData;
        }, function (err) {
            // error
        });

    }, false);
    $scope.addPost = function () {
        app.showLoading();
        var base64Image = document.getElementById("postImage").src;
        var postText = document.getElementById("postText").value;
        var data = $.param({
            'Id': localStorage['id'],
            'Image': base64Image,
            'Text': postText
        });

        var config = {
            headers: {

                'content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        $http.post(SERVER + "/Members/AddPost", data, config)
            .then(
            function (response) {
                app.hideLoading();
                $location.path('/home');
            },
            function (response) {
                app.hideLoading();
                alert(response);
            }
            );
    };
});
retroApp.controller('postCtrl', function ($scope, $http) {


    var config = {
        params: {
            id: localStorage['userID'],
            postId: localStorage['postID']
        }
    };
    app.showLoading();
    $http.get(SERVER + "/Members/Post", config)
        .then(
        function (response) {
            $scope.data = response.data;
            $scope.image = response.data.image;
            $scope.like = response.data.like;
            $scope.text = response.data.text;
            app.hideLoading();
        },
        function (response) {
            // failure callback
            alert(response);
            app.hideLoading();
        }
        );


});
retroApp.controller('searchCtrl', function ($scope, $http, $location) {


    $http.get(SERVER + "/Members/GetAllUsers")
        .then(
        function (response) {
            $scope.users = response.data;
        },
        function (response) {
            // failure callback
            app.hideLoading();
        }
        );
    $scope.setUser = function (userID) {
        localStorage["userID"] = userID;
        $location.path('/user');

    };



});
retroApp.controller('userCtrl', function ($scope, $http) {

    var config = {
        params: {
            id: localStorage['userID']
        }
    };
    app.showLoading();
    $http.get(SERVER + "/Members/GetUser", config)
        .then(
        function (response) {
            $scope.data = response.data;
            $scope.id = response.data.id;
            $scope.username = response.data.userName;
            $scope.posts = response.data.posts;
            app.hideLoading();
        },
        function (response) {
            // failure callback
            alert(response);
            app.hideLoading();
        }
        );
    $scope.setPost = function (userID, postID) {
        localStorage["userID"] = userID;
        localStorage["postID"] = postID;
    };

});
retroApp.controller('chatCtrl', function ($scope, $http) {

});