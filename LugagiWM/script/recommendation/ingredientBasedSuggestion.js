var currentName = "";
var initialIngredientHTML;

function ingredientTest() {
    console.log("123");
    $.ajax({
        type: "GET",
        url: "http://lugagi.com/script/ingredientRecommendation/generateFoodSuggestion.php",
        data: { ingredientname: [currentName] },
        dataType: 'json',
        cache: false,
        async: true,
        success: function (receivedData) {
            console.log("yes");
            console.log(receivedData);

            var source = receivedData.Foods
            var noOfFood = source.length;
            for (var i = 0; i < noOfFood; i++) {
                var currentSource = source[i]
                var newFood = $("#sampleIngredientContentItem").clone();
                newFood.find(".ingredientContentName").text(currentSource.MonAnName);
                var fullImageURL = "http://lugagi.com/script/timthumb.php?src=/foodimages/" + currentSource.ImageURL + "&w=300&h=200";
                newFood.find(".ingredientContentImg").attr("src", fullImageURL);
                newFood.attr("data-food-ID", currentSource.MonAnID);
                newFood.css("display", "block");
                $("#suggestionContent").append(newFood);
            }
           
        }
    });
    $("progress").hide();
}

$('body').on("click", "#submitUserInput", function () {
    currentName = "";
    $("#suggestionContent").html(initialIngredientHTML);
    $("progress").show();
    var numberOfInput = $(".ingredientInput").length;
    console.log(numberOfInput);
    for (var i = 0; i < numberOfInput; i++) {
        var inputName = $(".ingredientInput:eq(" + i + ")").find("input").val();
        console.log(inputName);
        currentName += inputName + " ";
    };
    console.log(currentName);
    ingredientTest();
    
})

$('body').on("click", "#addInput", function () {
    var newIngredientInput = $("#sampleIngredient").clone();
    newIngredientInput.attr("id", "");
    newIngredientInput.find("input").val("");
    newIngredientInput.find(".removeInput").show();
    $("#userInput").append(newIngredientInput);
})

$('body').on("click", ".removeInput", function () {
    var currentIndex = $(".removeInput").index(this);
    $(".ingredientInput:eq(" + currentIndex + ")").remove();
})

$('body').on("click", ".ingredientContentItem", function(){
    var currentID = $(this).attr("data-food-ID");
    WinJS.Navigation.navigate("/pages/food/foodDetails.html", currentID);
})


WinJS.UI.Pages.define("/pages/recommendation/ingredientBasedSuggestion.html", {
    ready: function (element, options) {
        initialIngredientHTML = $("#suggestionContent").html();
    }
});