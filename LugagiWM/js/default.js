// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
	    if (args.detail.kind === activation.ActivationKind.launch) {
		    if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
			    // TODO: This application has been newly launched. Initialize your application here.
		    } else {
			    // TODO: This application was suspended and then terminated.
			    // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
		    }
		    args.setPromise(WinJS.UI.processAll().done(function () {
		        // app variables
		        /* added by Dat - 18-11-2015 */
		        var viewWidth = window.innerWidth
		        var splitView = document.getElementById('mySplitView').winControl;
		        var windowSize;

                //Enable the title bar color of Windows 10
			    var v = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
			    v.titleBar.buttonBackgroundColor = Windows.UI.Colors.firebrick;
			    v.titleBar.buttonForegroundColor = Windows.UI.Colors.white;
			    v.titleBar.backgroundColor = Windows.UI.Colors.firebrick;
			    v.titleBar.foregroundColor = Windows.UI.Colors.white;

			    //Enable the back button
			    var systemNavigation = Windows.UI.Core.SystemNavigationManager.getForCurrentView();
			    systemNavigation.appViewBackButtonVisibility = Windows.UI.Core.AppViewBackButtonVisibility.visible;

                // app functions 
			    /* Author: Dat - Modified date: 18-11-2015 */
		        // function to hide pane in small window size
			    function navResize() {
			        if (window.innerWidth < 700) {
			            splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.overlay
			            splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.none
			            windowSize = 'small'
			        } else {
			            splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.overlay
			            splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.inline
			        }
			    };

		        //function to navigate between pages
			    function navigateDefault(eventObject) {
			        if (windowSize == 'small') {
			            splitView.closePane()
			        }
			        navigate(eventObject);
			    };

                // resize the pane based on window size
			    WinJS.UI.processAll().then(function () {
			        navResize();
			        $(window).resize(navResize);
			    });
                

                // load index page when app initiates
			    $('document').ready(function () {
			        WinJS.Navigation.navigate("/pages/index/index.html");
			        WinJS.Navigation.addEventListener("navigated", navigate);
			        WinJS.Navigation.navigate("/pages/index/index.html"); // navigate to Home page
			    })

                // bind events to navigation menu
			    $('#nav-goHome').click(function () {
			        WinJS.Navigation.navigate("/pages/index/index.html"); // navigate to Home page
			        WinJS.Navigation.addEventListener("navigated", navigateDefault);
			    })
			    $('#nav-addNewFood').click(function () {
			        WinJS.Navigation.navigate("/pages/food/addNewFood.html"); // navigate to addNewFood page
			        WinJS.Navigation.addEventListener("navigated", navigateDefault);
			        //WinJS.Navigation.navigate("/pages/food/addNewFood.html");
			    });
			    $('#nav-recommendation-ingredient').click(function () {
			        WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
			        WinJS.Navigation.addEventListener("navigated", navigateDefault);
			        //WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html");
			    });
			    $('#nav-recommendation-week-menu').click(function () {
			        WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestionFilter.html"); // navigate to weekMenuSuggestion page
			        WinJS.Navigation.addEventListener("navigated", navigateDefault);
			        //WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestionFilter.html");
			    });
			    $('#nav-login').click(function () {
			        WinJS.Navigation.navigate("/pages/userdata/loginform.html"); // navigate to weekMenuSuggestion page
			        WinJS.Navigation.addEventListener("navigated", navigateDefault);
			        //WinJS.Navigation.navigate("/pages/userdata/loginform.html");
			    });

		        //Search button in the navigation bar
		        //Code to show or hide the textbox
			    $("body").on("click", "#navSearchButton", function (e) {
			        var searchTextboxVisibility = $("#searchTextbox").css('display');
			        if (searchTextboxVisibility == "none") {
			            $("#searchTextbox").css('display', 'block');
			            $("#searchTextbox").focus();
			        }
			        else {
			            $("#searchTextbox").css('display', 'none');
			        }
			    });
			
		        //Hide search textbox on focus out
			    $("body").on("focusout", "#searchTextbox", function (e) {
			        $("#searchTextbox").css('display', 'none');
			    });

		        //Saerch textbox keypress (enter key)
			    $("body").on("keypress", "#searchTextbox", function (e) {
			        if ((e.keyCode == 10 || e.keyCode == 13)) {
			            e.preventDefault();
			            var searchKeyWord = $("#searchTextbox").val();
			            WinJS.Navigation.navigate("/pages/search/searchResult.html", searchKeyWord);
			            WinJS.Navigation.addEventListener("navigated", navigate);
			        }
			    });
                
			    $('#addNewFoodToolbarCommand').click(function () {
			        WinJS.Navigation.navigate("/pages/food/addNewFood.html"); // navigate to weekMenuSuggestion page
			        WinJS.Navigation.addEventListener("navigated", navigate);
			    });
			    
		    }));

	    }
    };

    app.oncheckpoint = function (args) {
	    // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
	    // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
	    // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
    };

    app.onbackclick = function (evt) {
	    WinJS.Navigation.back(1).done;
	    // Need to return true to cancel the default behavior of this event.
	    return true;
    }

    //Starting the app, do not remove
    app.start();

    function saveUser(currentUserID, currentUsername, profileImageURL) {
        //Session variables
        WinJS.Application.sessionState.currentUserID = currentUserID;
        WinJS.Application.sessionState.currentUsername = currentUsername;
        WinJS.Application.sessionState.profileImageURL = profileImageURL;

        //Autologin
        Windows.Storage.ApplicationData.current.roamingSettings.values["currentUserID"] = currentUserID;
        Windows.Storage.ApplicationData.current.roamingSettings.values["currentUsername"] = currentUsername;
        Windows.Storage.ApplicationData.current.roamingSettings.values["profileImageURL"] = profileImageURL

        //Change UI to reflect to logged in success
        $("#nav-login").find(".win-splitviewcommand-label").text(currentUsername);
        var imgProfilePicture = "<img src='" + profileImageURL + "' width=30 height=30 class='img-circle' style='margin-top:-5px; margin-left:-7px;'>";
        $("#nav-login").find(".win-splitviewcommand-icon").html(imgProfilePicture);
    }

    function removeUser() {
        //Session variables
        WinJS.Application.sessionState.currentUserID = "";
        WinJS.Application.sessionState.currentUsername = "";
        WinJS.Application.sessionState.profileImageURL = "";

        //Autologin
        Windows.Storage.ApplicationData.current.roamingSettings.values["currentUserID"] = "";
        Windows.Storage.ApplicationData.current.roamingSettings.values["currentUsername"] = "";
        Windows.Storage.ApplicationData.current.roamingSettings.values["profileImageURL"] = ""

        //Change UI to reflect to logged out success
        WinJS.UI.processAll($("#panearea")[0]);
    }


    function alertBox(message) {
        var msg = new Windows.UI.Popups.MessageDialog(message);

        // Add commands and set their command handlers
        msg.commands.append(new Windows.UI.Popups.UICommand("OK"));

        // Set the command that will be invoked by default
        msg.defaultCommandIndex = 0;

        // Set the command to be invoked when escape is pressed
        msg.cancelCommandIndex = 0;

        // Show the message dialog
        msg.showAsync();
    }

    function truncate(s, n) {
        var cut = s.indexOf(' ', n);
        if (cut == -1) return s;
        return s.substring(0, cut) + "...";
    }

    //Get parameter from the string separated by "&"
    function getStringParameter(sString, sParam) {
        var sPageURL = sString;
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }