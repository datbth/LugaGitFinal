(function () {
    var currentInput = "";
    var initialIngredientHTML;

    function generateSuggestion() {
        currentInput = "";
        $("#suggestionContent").html(initialIngredientHTML);

        var numberOfInput = $(".ingredientInput").length;
        for (var i = 0; i < numberOfInput; i++) {
            var inputName = $(".ingredientInput:eq(" + i + ")").find("input").val();
            currentInput += inputName + " ";
        };
        var testCurrentInput = currentInput.replace(" ", "")
        if (testCurrentInput != "") {
            $("#no-input-mess").hide();
            $("#no-dish-mess").hide();
        } else {
            $("#no-input-mess").show();
        }
    };

    function addInputRow() {
        var newIngredientInput = $("#sampleIngredient").clone();
        newIngredientInput.attr("id", "");
        newIngredientInput.find("input").val("");
        newIngredientInput.find(".removeInput").show();
        $("#userInput").append(newIngredientInput);
    }

    $('body').on("click", "#submitUserInput", function () {
        generateSuggestion();
        WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestionContent.html", currentInput);
    })
    
    $('body').on("keyup", ".ingredientInput input", function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
            generateSuggestion();
            WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestionContent.html", currentInput);
        } else {
            if (e.keyCode == 27) {
                $(this).val("");
            }
            else if (e.keyCode == 190) {
                $(this).val($(this).val().slice(0, -1));
                addInputRow();
                $(".ingredientInput").find("input").last().focus();
            }
            $("#no-input-mess").hide();
            $("#no-dish-mess").hide();
        }
    })

    $('body').on("click", "#addInput", function () {
        addInputRow();
    })

    $('body').on("click", ".removeInput", function () {
        var currentIndex = $(".removeInput").index(this);
        $(".ingredientInput:eq(" + currentIndex + ")").remove();
    })

    WinJS.UI.Pages.define("/pages/recommendation/ingredientBasedSuggestionBox.html", {
        ready: function (element, options) {
            initialIngredientHTML = $("#suggestionContent").html();
            $('.ingredientInput:eq(0)').find("input").focus();
        }
    });
})();