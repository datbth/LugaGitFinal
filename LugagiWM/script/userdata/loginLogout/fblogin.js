/***** Facebook Login code *****/

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        // Change navigation bar and session value

    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
    }
}

//Code for the log in to facebook button
function fbLogin() {
    FB.login(function (response) {
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.

        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.

        }
    }, { scope: 'email, user_birthday' });
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '489908747836961', //Production: 489908747836961
        cookie: true,  // enable cookies to allow the server to access 
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    //   FB.getLoginStatus(function(response) {
    //      statusChangeCallback(response);
    //   });

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email,birthday,gender', function (response) {
        console.log('Successful login for: ' + response.name);

        //Run ajax and log the user in
        var fbAutologin = "";
        var fbUsername = response.name;
        var fbUserID = response.id;
        var fbEmail = response.email;
        var fbGender = response.gender;
        var fbBirthday = response.birthday;

        //Ask for your auto login choice
        var r = confirm("Bạn có muốn tự động đăng nhập trong những lần sau?");
        if (r == true) {
            fbAutologin = "Y";
        }
        else {
            fbAutologin = "N";
        }

        //Run ajax and log the user in
        $.ajax({
            type: "POST",
            url: "http://lugagi.com/script/userdata/loginLogout/fblogin.php",
            data: "fbUserID=" + fbUserID + "&fbUsername=" + fbUsername +
                  "&fbEmail=" + fbEmail + "&fbGender=" + fbGender +
                  "&fbBirthday=" + fbBirthday + "&fbAutologin=" + fbAutologin,
            dataType: "text",
            success: function (data) {
                window.location = "/";
            }
        });

    });
}

/***** End of Facebook Login code **********/