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
        nutritionChoices = [true];
        var i = 0;
        for (i; i < noOfCheckBox; i++) {
            var currentCheckBox = checkBoxesElem.eq(i);
            if (currentCheckBox.prop("checked")) {
                nutritionChoices[0] = false;
                nutritionChoices.push(i + 1);
            }
        }
        loadWeekMenu(nutritionChoices);
    })

    // uncheck all boxes
    $('body').on("click", "#clearBoxes", function () {
        checkBoxesElem.prop("checked", false);
        nutritionChoices[0] = true;
    })


    WinJS.UI.Pages.define("/pages/recommendation/weekMenuSuggestionFilter.html", {
        ready: function (element, options) {
            $.getScript("/script/recommendation/weekMenuCommonScript.js");
            nutritionChoices = [true];
            checkBoxesElem = $('body').find(".filter-checkbox");
        }
    });
})();