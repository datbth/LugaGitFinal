(function () {
    var userFoodPageNum = 1;
    var currentUserID;
    var userID;
    var userFoodProgress;

    function loadProfile() {
        $.ajax({
            url: "http://lugagi.com/script/smartPhoneAPI/userdata/profile/profile.php",
            data: "UserID=" + userID,
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
    };

    function loadUserCreatedFood(pageNumber) {
        $.ajax({
            type: "GET",
            url: "http://lugagi.com/script/userdata/profile/userMostViewFood.php",
            data: {
                UserID: userID,
                PageNumber: userFoodPageNum,
                OrderBy: "recentlyuploaded"
            },
            dataType: 'json',
            cache: false,
            async: true,
            beforeSend: function () {
                userFoodProgress.show();
            },
            success: function (data) {
                source = data.MostViewFoods;
                numOfFood = source.length;
                if (numOfFood > 0) {
                    for (var i = 0; i < source.length; i++) {
                        var currentSource = source[i];
                        var currentFoodItem = $("#sampleUserFood").clone();

                        var fullImgURL = "http://lugagi.com/script/timthumb.php?src=" + currentSource.ImageURL + "&w=300&h=200";
                        currentFoodItem.attr("id", "");
                        currentFoodItem.find(".userFoodImg").attr("src", fullImgURL);
                        currentFoodItem.find(".userFoodName").text(currentSource.MonAnName);
                        currentFoodItem.attr("foodID", currentSource.MonAnID);
                        currentFoodItem.show();
                        $("#userFoodContainer").append(currentFoodItem);
                    };
                }
                else {
                    $("#loadMoreUserFood").hide();
                    $("#userFoodContainer").append("<p>There is no dishes to display<p>");
                };
                userFoodProgress.hide();
                wrapTwoLines();
            }
        });
    };
    $("body").on("click", "#loadMoreUserFood", function () {
        userFoodPageNum++;
        loadUserCreatedFood(userFoodPageNum);
    });

    $("body").on("click", ".userFoodItem", function () {
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", $(this).attr("foodID"));
    });

    // do when the page is ready
    WinJS.UI.Pages.define("/pages/userdata/profile.html", {
        ready: function (element, options) {
            userID = options;
            if (!userID) {
                userID = Windows.Storage.ApplicationData.current.roamingSettings.values["currentUserID"];
            }
            else {
                $("#logoutButton").hide();
            };
            userFoodProgress = $("#userFoodContainer").find("progress");
            loadProfile();
            loadUserCreatedFood(userFoodPageNum);
            
        }
    });
})();
