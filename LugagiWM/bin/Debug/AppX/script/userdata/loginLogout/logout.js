$("body").on("click", "#logoutButton", function (e) {
    var msg = new Windows.UI.Popups.MessageDialog("Bạn có chắc chắn là sẽ đăng xuất ra khỏi Lugagi?", "Đang xuất");

    // Add commands and set their command handlers
    msg.commands.append(new Windows.UI.Popups.UICommand("Đăng xuất", logOutHandler));
    msg.commands.append(new Windows.UI.Popups.UICommand("Hủy bỏ", logOutHandler));

    // Set the command that will be invoked by default
    msg.defaultCommandIndex = 0;

    // Set the command to be invoked when escape is pressed
    msg.cancelCommandIndex = 0;

    // Show the message dialog
    msg.showAsync();

});

function logOutHandler(command) {
    if (command.label = "Đăng xuất") {
        removeUser();

        alertBox("Đã đăng xuất thành công!");

        WinJS.Navigation.navigate("/pages/index/index.html");
        WinJS.Navigation.addEventListener("navigated", navigate);
    }
}