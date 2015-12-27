(function () {
    var currentInput = "";
    var initialIngredientHTML;

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
                    for (var i = 0; i < noOfFood; i++) {
                        var currentSource = source[i]
                        var newFood = $("#sampleIngredientContentItem").clone();
                        newFood.find(".ingredientContentName").text(currentSource.MonAnName);
                        var fullImageURL = "http://lugagi.com/script/timthumb.php?src=/foodimages/" + currentSource.ImageURL + "&w=300&h=200";
                        newFood.find(".ingredientContentImg").attr("src", fullImageURL);
                        newFood.attr("data-food-ID", currentSource.MonAnID);
                        //newFood.find(".contentView").text(currentSource.ContentViewCount + " ");
                        //newFood.find(".contentLike").text(currentSource.ContentLikeCount);
                        newFood.css("display", "block");
                        $("#suggestionContent").append(newFood);
                        $("progress").hide();
                    }
                }
            }
        });
    };

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
            $("progress").show();
            loadIngredientSuggestion();
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

    $('body').on("click", ".ingredientContentItem", function () {
        var currentID = $(this).attr("data-food-ID");
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", currentID);
    })


    WinJS.UI.Pages.define("/pages/recommendation/ingredientBasedSuggestion.html", {
        ready: function (element, options) {
            initialIngredientHTML = $("#suggestionContent").html();
        }
    });
})();