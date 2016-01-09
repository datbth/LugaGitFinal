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
                    wrapTwoLines();
                }
            }
        });
    };

    $('body').on("click", ".ingredientContentItem", function () {
        var currentID = $(this).attr("data-food-ID");
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", currentID);
    })

    WinJS.UI.Pages.define("/pages/recommendation/ingredientBasedSuggestionContent.html", {
        ready: function (element, options) {
            currentInput = options;
            initialIngredientHTML = $("#suggestionContent").html();
            $("body").find("#userSuggestionInput").text("Dishes suggestion for: " + options)
            loadIngredientSuggestion();
        }
    });
})();