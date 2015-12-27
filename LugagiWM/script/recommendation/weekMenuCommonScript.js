var nutritionChoices;

// load default menu (no filter)
function loadDefaultMenu() {
    $.ajax({
        url: "http://lugagi.com/script/smartPhoneAPI/suggestion/weekMenuSuggestion/runMenuSuggestion.php",
        data: "nothing",
        dataType: 'json',
        cache: false,
        async: true,
        success: function (data) {
            WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestionContent.html", [data, nutritionChoices]);
            WinJS.Navigation.addEventListener("navigated", navigate);
        }
    });
}

// load filtered menu
function loadFilteredMenu(currentChoices) {
    $.ajax({
        type: "POST",
        url: "http://lugagi.com/script/smartPhoneAPI/suggestion/weekMenuSuggestion/runMenuSuggestion.php",
        data: { CheDoDinhDuong: currentChoices },
        dataType: 'json',
        cache: false,
        async: true,
        success: function (data) {
            WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestionContent.html", [data, nutritionChoices]);
        }
    });
}

// get the week menu from server and load the menu
function loadWeekMenu(choices) {
    if (choices[0]) {
        loadDefaultMenu();
    } else {
        var currentChoices = [];
        for (var n = 1; n < 6; n++) {
            var choice = choices[n];
            if (choice) {
                currentChoices.push(choice);
            }
        }
        loadFilteredMenu(currentChoices);
    }
}