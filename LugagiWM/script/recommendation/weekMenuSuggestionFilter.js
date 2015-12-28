(function () {
    var checkBoxesElem;

    // check if the checkboxes are checked
    $('body').on("change", ".checkbox", function () {
        var checkedStatus = $(this).find("input").prop("checked");
        var checkBoxIndex = checkBoxesElem.index(this);
    })

    // add the chosen choices by counting the checked boxes
    $('body').on("click", "#weekSuggestion", function () {
        $("progress").show();
        var noOfCheckBox = checkBoxesElem.length;
        weekMenuScript.nutritionChoices = [true];
        var i = 0;
        for (i; i < noOfCheckBox; i++) {
            var currentCheckBox = checkBoxesElem.eq(i);
            if (currentCheckBox.prop("checked")) {
                weekMenuScript.nutritionChoices[0] = false;
                weekMenuScript.nutritionChoices.push(i + 1);
            }
        }
        weekMenuScript.loadWeekMenu(weekMenuScript.nutritionChoices);
    })

    // uncheck all boxes
    $('body').on("click", "#clearBoxes", function () {
        checkBoxesElem.prop("checked", false);
        weekMenuScript.nutritionChoices[0] = true;
    })


    WinJS.UI.Pages.define("/pages/recommendation/weekMenuSuggestionFilter.html", {
        ready: function (element, options) {
            // $.getScript("/script/recommendation/weekMenuCommonScript.js");
            weekMenuScript.nutritionChoices = [true];
            checkBoxesElem = $('body').find(".filter-checkbox");
        }
    });
})();