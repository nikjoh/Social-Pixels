var SERVER_IP = "http://192.168.1.129:8080";

$(document).ready(function () {
    var login = function () {
        document.addEventListener("deviceready", function () {
            switch (device.platform) {
                case "browser":
                    localStorage['platform'] = "browser";
                    $(location).attr('href', '/index.html');
                    break;
                case "Android":
                    localStorage['platform'] = "Android";
                    $(location).attr('href', '/android_asset/www/index.html');
                    break;
            }
        });
        
    };
    
    if (localStorage['id'] !== undefined) {
        login();
    }
    $("#loginButton").click(function () {
        var loginName = $("#login-name").val();
        var password = $("#login-password").val();

        $.ajax({
            type: "POST",
            url: SERVER_IP,
            data: {
                'action': 'login', 'login': loginName, 'password': password
            },
            success: function (data) {
                var obj = $.parseJSON(data);
                localStorage['id'] = obj.ID;
                localStorage['username'] = obj.UserName;
                login();
            }
        });
    });
});
