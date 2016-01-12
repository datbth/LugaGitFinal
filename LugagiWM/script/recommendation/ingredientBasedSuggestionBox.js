(function () {
    var currentInput = "";
    //var initialIngredientHTML;

    function loadIngredientSuggestion() {
        $.ajax({
            type: "GET",
            url: "http://lugagi.com/script/ingredientRecommendation/generateFoodSuggestion.php",
            data: { ingredientname: [currentInput] },
            dataType: 'json',
            cache: false,
            async: true,
            success: function (receivedData) {
                var source = receivedData.Foods;
                var noOfFood = source.length;
                if (noOfFood < 1) {
                    $("progress").hide();
                    $("#no-dish-mess").show();
                } else {
                    WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestionContent.html", { currentInput: currentInput, data: source });
                }
            }
        });
    };

    function generateSuggestion() {
        currentInput = "";
        //$("#suggestionContent").html(initialIngredientHTML);

        var numberOfInput = $(".ingredientInput").length;
        for (var i = 0; i < numberOfInput; i++) {
            var inputName = $(".ingredientInput:eq(" + i + ")").find("input").val();
            currentInput += inputName + " ";
        };
        var testCurrentInput = currentInput.replace(" ", "")
        if (testCurrentInput != "") {
            $("progress").show();
            $("#no-input-mess").hide();
            $("#no-dish-mess").hide();
            loadIngredientSuggestion()
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
    })
    
    $('body').on("keyup", ".ingredientInput input", function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
            generateSuggestion();
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
            //initialIngredientHTML = $("#suggestionContent").html();
            WinJS.Promise.timeout(400).then(function () {
                $('.ingredientInput:eq(0)').find("input").focus();
            });
        }
    });
})();