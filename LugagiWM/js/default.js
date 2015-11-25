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
			            splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.inline
			            splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.inline
			        }
			    };

		        //function to navigate between pages
			    function navigate(eventObject) {
			        if (windowSize == 'small') {
			            splitView.closePane()
			        }
			        var url = eventObject.detail.location,
                            host = $("#content-host")[0];
			        // unload content
			        host.winControl && host.winControl.unload && host.winControl.unload();
			        WinJS.Utilities.empty(host);
			        // load new content
			        eventObject.detail.setPromise(
                        WinJS.UI.Pages.render(url, host, eventObject.detail.state).then(function () {
                            WinJS.Application.sessionState.lastUrl = url;
                            WinJS.UI.Animation.enterPage(host);
                            WinJS.UI.processAll()
                        }))
			    };
                // resize the pane based on window size
			    WinJS.UI.processAll().then(function () {
			        navResize();
			        $(window).resize(navResize);
			    });
                

                // load index page when app initiates
			    $('document').ready(function () {
			        WinJS.Navigation.navigate("/pages/index/index.html"); // navigate to Home page
			        WinJS.Navigation.addEventListener("navigated", navigate);
			        WinJS.Navigation.navigate("/pages/index/index.html"); 
			    })

                // bind events to navigation menu
			    $('#nav-goHome').click(function () {
			        WinJS.Navigation.navigate("/pages/index/index.html"); // navigate to Home page
			        WinJS.Navigation.addEventListener("navigated", navigate);
			    })
			    $('#nav-addNewFood').click(function () {
			        WinJS.Navigation.navigate("/pages/food/addNewFood.html"); // navigate to addNewFood page
			        WinJS.Navigation.addEventListener("navigated", navigate);
			    });
			    $('#nav-recommendation-ingredient').click(function () {
			        WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
			        WinJS.Navigation.addEventListener("navigated", navigate);
			    });
			    $('#nav-recommendation-week-menu').click(function () {
			        WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestion.html"); // navigate to weekMenuSuggestion page
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