(function () {
    function loginToLugagi() {
        var loginData = $("#loginFormData").serialize();
        $.ajax({
            url: "http://lugagi.com/script/smartPhoneAPI/userdata/loginLogout/login.php",
            type: "POST",
            data: loginData,
            dataType: "json",
            async: true,
            success: function (data) {
                loginStatus = data.LoginStatus
                var status = loginStatus.Status;
                var errorMessage = loginStatus.ErrorMessage;
                var currentUserID = loginStatus.CurrentUserID;
                var currentUsername = loginStatus.CurrentUsername;
                var profileImageURL = loginStatus.ProfileImageURL;

                if (status == "failed") {
                    alertBox("Wrong ID or Password. Please try again");
                }
                else if (status == "success") {
                    saveUser(currentUserID, currentUsername, profileImageURL);
                    alertBox("Welcome back to Lugagi, " + currentUsername + "!");
                    if (!WinJS.Application.sessionState.goingToNewFood) {
                        WinJS.Navigation.navigate("/pages/userdata/profile.html");
                    }
                    else {
                        WinJS.Application.sessionState.goingToNewFood = false;
                        WinJS.Navigation.navigate("/pages/food/addNewFood.html");
                    }
                }
            },
            error: function (xhr, status, error) {
                //console.debug("AJAX request fail " + status + " " + error);
                //var err = xhr.responseText;
                alertBox("Some errors have occurred");
            }
        });
    }

    //Code for the normal login button
    $("body").on("click", "#loginButton", function (e) {
        loginToLugagi();
    });

    $("body").on("keypress", "#password", function (e) {
        if ((e.keyCode == 10 || e.keyCode == 13)) {
            e.preventDefault();
            loginToLugagi();
        }
    });

    WinJS.UI.Pages.define("/pages/userdata/loginform.html", {
        ready: function (element, options) {
            $('#username').focus();
        }
    });
})();