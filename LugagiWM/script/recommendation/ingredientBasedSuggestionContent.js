(function () {
    function loadSuggestionContents(source) {
        var noOfFood = source.length;
        for (var i = 0; i < noOfFood; i++) {
            var currentSource = source[i]
            var newFood = $("#sampleIngredientContentItem").clone();
            newFood.find(".ingredientContentName").text(currentSource.MonAnName);
            var fullImageURL = "http://lugagi.com/script/timthumb.php?src=/foodimages/" + currentSource.ImageURL + "&w=300&h=200";
            var newImg = newFood.find(".ingredientContentImg");
            newImg.attr("src", fullImageURL);
            newFood.attr("data-food-ID", currentSource.MonAnID);
            //newFood.find(".contentView").text(currentSource.ContentViewCount + " ");
            //newFood.find(".contentLike").text(currentSource.ContentLikeCount);
            newFood.show();
            $("#suggestionContent").append(newFood);
            if (i == noOfFood - 1) {
                newImg.on("load", function () {
                    $("progress").hide();
                })
            }
        }
        wrapTwoLines();
    }

    $('body').on("click", ".ingredientContentItem", function () {
        var currentID = $(this).attr("data-food-ID");
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", currentID);
    })

    WinJS.UI.Pages.define("/pages/recommendation/ingredientBasedSuggestionContent.html", {
        ready: function (element, options) {
            var currentInput = options.currentInput.trim().replace(/,/g, "").replace(/ +(?= )/g, '').replace(/ /g, ", ");
            $("#userSuggestionInput").html("<span>Suggestions for the ingredient(s): </span>" + "<span style='color:rgb(0, 150, 136); font-size:30px'>" + currentInput + "</span>");
            loadSuggestionContents(options.data);
        }
    });
})();