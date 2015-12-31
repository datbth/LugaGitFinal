(function () {
    // For an introduction to the Blank template, see the following documentation:
    // http://go.microsoft.com/fwlink/?LinkId=232509

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            var url = app.sessionState.lastUrl || "/pages/index/index.html";
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize your application here.
                getCurrentUser();
                var url = app.sessionState.lastUrl;
                WinJS.Navigation.addEventListener("navigated", navigate);

            } else {
                // TODO: This application was suspended and then terminated.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
                WinJS.Navigation.navigate(url, app.sessionState.lastState);
            }
            args.setPromise(WinJS.UI.processAll().done(function () {
                if (!url) {
                    // app variables
                    /* added by Dat - 18-11-2015 */
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
                            splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.overlay;
                            splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.none;
                            windowSize = 'small';
                        } else {
                            splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.overlay;
                            splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.inline;
                        }
                    };

                    //function to navigate between pages
                    function navigateDefault(e) {
                        $(".win-splitview-content").scrollTop(0);
                        if (windowSize == 'small') {
                            splitView.closePane();
                        }
                        //e.stopImmediatePropagation();
                    };

                    // resize the pane based on window size
                    navResize();
                    $(window).resize(navResize);


                    // bind events to navigation menu
                    $('#nav-goHome').click(function (e) {
                        WinJS.Navigation.navigate("/pages/index/index.html"); // navigate to Home page
                        navigateDefault(e);
                    });
                    $('#nav-addNewFood').click(function (e) {
                        if (!WinJS.Application.sessionState.currentUserID) {
                            app.sessionState.goingToNewFood = true;
                            WinJS.Navigation.navigate("/pages/userdata/loginform.html");
                            alertBox("Please Log In before adding a new food");
                        }
                        else {
                            WinJS.Navigation.navigate("/pages/food/addNewFood.html"); // navigate to addNewFood page
                        }
                        navigateDefault(e);
                    });
                    $('#nav-recommendation-ingredient').click(function (e) {
                        WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
                        navigateDefault(e);
                    });
                    $('#nav-recommendation-week-menu').click(function (e) {
                        WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestionFilter.html"); // navigate to weekMenuSuggestion page
                        navigateDefault(e);
                    });
                    $('#nav-login').click(function (e) {
                        app.sessionState.goingToNewFood = false;
                        if (WinJS.Application.sessionState.currentUserID) {
                            WinJS.Navigation.navigate("/pages/userdata/profile.html");
                        } else {
                            WinJS.Navigation.navigate("/pages/userdata/loginform.html");
                        }
                        navigateDefault(e);
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
                    $("body").on("keyup", "#searchTextbox", function (e) {
                        e.stopImmediatePropagation();
                        if ((e.keyCode == 10 || e.keyCode == 13)) {
                            e.preventDefault();
                            var searchKeyWord = $("#searchTextbox").val();
                            WinJS.Navigation.navigate("/pages/search/searchResult.html", searchKeyWord);
                        }
                    });

                    $('#addNewFoodToolbarCommand').click(function (e) {
                        WinJS.Navigation.navigate("/pages/food/addNewFood.html");
                        //e.stopImmediatePropagation();
                    });
                };
                if (!url || url == "pages/index/index.html") {
                    WinJS.Navigation.navigate("/pages/index/index.html");
                }
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
})();