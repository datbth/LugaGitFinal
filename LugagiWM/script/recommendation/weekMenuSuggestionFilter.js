var nutrionChoices = [true, false, false, false, false, false];
var checkBoxesElem;


// get the week menu from server and load the menu
function loadWeekMenu(choices) {
    if (choices[0]) {
        $.ajax({
            url: "http://lugagi.com/script/smartPhoneAPI/suggestion/weekMenuSuggestion/runMenuSuggestion.php",
            data: "nothing",
            dataType: 'json',
            cache: false,
            async: true,
            success: function (data) {
                WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestionContent.html", data);
            }
        });
    }

}

$('body').on("change", ".checkbox", function () {
    var checkedStatus = $(this).find("input").prop("checked");
    var checkBoxIndex = checkBoxesElem.index(this);
    nutrionChoices[checkBoxIndex + 1] = checkedStatus;
})

$('body').on("click", "#weekSuggestion", function () {
    var noOfCheckBox = checkBoxesElem.length;    
    var i = 0;
    for (i; i < noOfCheckBox; i++) {
        if (checkBoxesElem.eq(i).find("input").prop("checked")) {
            nutrionChoices[0] = false;
        }
    }
    loadWeekMenu(nutrionChoices);

})

$('body').on("click", "#clearBoxes", function(){
    checkBoxesElem.find("input").prop("checked", false);
    nutrionChoices[0] = true;
})

WinJS.UI.Pages.define("/pages/recommendation/weekMenuSuggestionFilter.html", {
    ready: function (element, options) {
        checkBoxesElem = $(".checkbox");
    }
});