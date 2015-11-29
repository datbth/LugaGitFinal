var nutritionChoices = [true];
var checkBoxesElem;


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
            currentChoices.push(choices[n])
        }
        loadFilteredMenu(currentChoices);
    }
}

// check if the checkboxes are checked
$('body').on("change", ".checkbox", function () {
    var checkedStatus = $(this).find("input").prop("checked");
    var checkBoxIndex = checkBoxesElem.index(this);
})

// add the chosen choices by counting the checked boxes
$('body').on("click", "#weekSuggestion", function () {
    var noOfCheckBox = checkBoxesElem.length;
    nutritionChoices = [true];
    var i = 0;
    for (i; i < noOfCheckBox; i++) {
        var currentCheckBox = checkBoxesElem.eq(i).find("input");
        if (currentCheckBox.prop("checked")) {
            nutritionChoices[0] = false;
            nutritionChoices.push(i + 1);            
        }
    }
    loadWeekMenu(nutritionChoices);
})

// uncheck all boxes
$('body').on("click", "#clearBoxes", function(){
    checkBoxesElem.find("input").prop("checked", false);
    nutritionChoices[0] = true;
})


WinJS.UI.Pages.define("/pages/recommendation/weekMenuSuggestionFilter.html", {
    ready: function (element, options) {
        checkBoxesElem = $(".checkbox");
    }
});