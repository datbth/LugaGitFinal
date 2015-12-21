function loadProfile(userID) {
    if (!userID) {
        var currentUserID = Windows.Storage.ApplicationData.current.roamingSettings.values["currentUserID"];
    }
    else {
        var currentUserID = "";
    }

    if (currentUserID) {
        $.ajax({
            url: "http://lugagi.com/script/smartPhoneAPI/userdata/profile/profile.php",
            data: "UserID=" + currentUserID,
            dataType: "json",
            async: true,
            cache: false,
            success: function (data) {
                //get data from JSON
                var username = data.UserProfile.Username;
                var fullName = data.UserProfile.FirstName + " " + data.UserProfile.LastName;
                var gender = data.UserProfile.Gender;
                var oAuthMethod = data.UserProfile.OAuthMethod;

                if (oAuthMethod == 1) {
                    var profileImageURL = "http://lugagi.com/script/timthumb.php?src=" + data.UserProfile.ProfileImageURL + "&w=60&h=60";
                }
                else if (oAuthMethod == 2) {
                    var profileImageURL = data.UserProfile.ProfileImageURL;
                }

                var membersince = data.UserProfile.RegistrationDate;
                var userIntroduction = data.UserProfile.UserIntroduction;

                //Display data to the page
                $("#userProfilePic").attr("src", profileImageURL);
                $("#username").text(username);
                $("#fullname").text(fullName);
                $("#gender").text(gender);
                $("#membersince").text(membersince);
                $("#userIntroduction").text(userIntroduction);
            }
        });
    }
}

// do when the page is ready
WinJS.UI.Pages.define("/pages/userdata/profile.html", {
    ready: function (element, options) {
        loadProfile();
    }
});