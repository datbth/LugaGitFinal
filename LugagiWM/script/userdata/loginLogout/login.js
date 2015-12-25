
    //Code for the normal login button
    $("body").on("click", "#loginButton", function (e) {
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
                    WinJS.Navigation.navigate("/pages/userdata/profile.html");
                }
            },
            error: function (xhr, status, error) {
                //console.debug("AJAX request fail " + status + " " + error);
                //var err = xhr.responseText;
                alertBox("Some errors have occurred");
            }
        });
    });