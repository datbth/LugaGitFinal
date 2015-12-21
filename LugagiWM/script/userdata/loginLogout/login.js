
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
                for (var i in data.LoginStatus) {
                    var status = data.LoginStatus[i].Status;
                    var errorMessage = data.LoginStatus[i].ErrorMessage;
                    var currentUserID = data.LoginStatus[i].CurrentUserID;
                    var currentUsername = data.LoginStatus[i].CurrentUsername;
                    var profileImageURL = data.LoginStatus[i].ProfileImageURL;
                }

                if (status == "failed") {
                    alertBox(errorMessage);
                }
                else if (status == "success") {
                    saveUser(currentUserID, currentUsername, profileImageURL);
                    alertBox("Logged in succesfully!");
                    WinJS.Navigation.navigate("/pages/index/index.html");
                }
            },
            error: function (xhr, status, error) {
                console.debug("AJAX request fail " + status + " " + error);
                var err = xhr.responseText;
                alertBox(err + error);
            }
        });
    });