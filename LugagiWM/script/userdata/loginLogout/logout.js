(function () {

    function logOutHandler(command) {
        removeUser();

        alertBox("Logged out successfully!");
        WinJS.Navigation.navigate("/pages/index/index.html");
    };

    $("body").on("click", "#logoutButton", function (e) {
        var msg = new Windows.UI.Popups.MessageDialog("Are you sure to log out of Lugagi?");

        // Add commands and set their command handlers
        msg.commands.append(new Windows.UI.Popups.UICommand("Log Out", logOutHandler));
        msg.commands.append(new Windows.UI.Popups.UICommand("Cancel"));

        // Set the command that will be invoked by default
        msg.defaultCommandIndex = 0;

        // Set the command to be invoked when escape is pressed
        msg.cancelCommandIndex = 0;

        // Show the message dialog
        msg.showAsync();

    });
})();