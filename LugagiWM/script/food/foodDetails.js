var currentContentID;

// load the ingredients of the food
function loadIngredient(ingredientsSource) {
    var ingredientList = $("#foodIngredients").find("ul");
    //ingredientList.html("");
    if (ingredientsSource) {
        var i = 0;
        for (i; i < ingredientsSource.length; i++) {
            var ingredientName = ingredientsSource[i].IngredientName;
            var ingredientQuantity = ingredientsSource[i].Amount + " " + ingredientsSource[i].IngredientUnit;            
            ingredientList.append("<li>" + ingredientName + ": " + ingredientQuantity + "</li>");
        }
    } else {
        ingredientList.append("<p>not available<p>")
    };
}

// load the food cooking steps
function loadSteps(stepsSource) {
    var foodStepsList = $("#foodSteps");
    //foodStepsList.html("");
    if (stepsSource) {
        var i = 0;
        for (i; i < stepsSource.length; i++) {
            var stepText = stepsSource[i].TextContent;
            var stepImgURL = stepsSource[i].ImageURL;
            foodStepsList.append("<li>" + stepText + "</li>");
            if (stepImgURL) {
                foodStepsList.append('<img src="http://lugagi.com/script/timthumb.php?src=/postimages/' + stepImgURL + '&w=300&h=200" class="img-responsive center-block" />');
            }
        }
    } else { $("#foodSteps").append("<p>not available<p>") };
}

function loadFoodRecipe() {
    $.ajax({
        type: "POST",
        url: "http://lugagi.com/script/smartPhoneAPI/post/loadFoodPost.php",
        data: { MonAnID: currentContentID },
        dataType: 'json',
        cache: false,
        async: true,
        success: function (receivedData) {
            var postSource = receivedData.FoodPosts[0];
            if (postSource) {
                var postContent = postSource.PostContent;
                var ingredientsSource = postContent.Ingredient;
                loadIngredient(ingredientsSource);
                var stepsSource = postContent.CookingSteps;
                loadSteps(stepsSource);
            }
            else {
                $("#foodContent").html("<h1>There is no recipe for this food</h1>");
            }
        }
    })
};

// load food information summary
function loadFoodInfo(source) {
    var nutrionCategory = "";
    var length = source.CheDoMonAn.length;
    if (length == 0) {
        nutrionCategory = "Chung"
    } else {
        for (var i = 0; i < length; i++){
            nutrionCategory += source.CheDoMonAn[i].CheDoDescription + ", ";
        }
    }
    //$("#foodInfo").html("");
    $("#foodInfo").append(
        "<li class='list-group-item'>Dish category: " + source.LoaiMonAn[0].LoaiMonAnDescription + "</li>" +
        "<li class='list-group-item'>Nutrion category: " + nutrionCategory + "</li>" +
        "<li class='list-group-item'>Difficulty level: " + + "</li>" +
        "<li class='list-group-item'>Energy rating: " + + "</li>" +
        "<li class='list-group-item'>Eat without paired dish(es): " + + "</li>" +
        "<li class='list-group-item'>Created by: " + source.AddedByUsername + "</li>" +
        "<li class='list-group-item'>Approved: " + source.ApproveStatus + "</li>"
        )
}

// load the food into page
function loadFoodContent() {
    $("body").find("progress").show();
    $.ajax({
        type: "POST",
        url: "http://lugagi.com/script/smartPhoneAPI/food/getFoodInfo.php",
        data: { MonAnID: currentContentID },
        dataType: 'json',
        cache: false,
        async: true,
        success: function (receivedData) {
            var source = receivedData.FoodInfo[0];
            var fullImgUrl = "http://lugagi.com/script/timthumb.php?src=/" + source.ImageURL + "&w=1311&h=400";
            $("#foodHeader").css("background-image", "url(" + fullImgUrl + ")");
            $("#foodName").text(source.MonAnName);
            $(".foodDescription").text(source.MonAnDescription);
            $("#authorInfo").text(source.AddedByUsername + "  " + source.CreatedDate);
            loadFoodInfo(source);
            loadFoodRecipe();
        }
    });
    $("body").find("progress").hide();
}

// generate a new random food
function newFood() {
    $.ajax({
        url: "http://lugagi.com/script/food/generateRandomFood.php",
        data: "Nothing",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            var contentID = data.Foods[0].MonAnID;
            WinJS.Navigation.navigate("/pages/food/foodDetails.html", contentID);     
        },
    });
    
}

//$("body").on("click", "#refreshButton", function () {
//    $("#foodPage").html(foodPageHTML);
//    loadFoodContent();
//    // WinJS.Navigation.navigate("/pages/food/foodDetails.html");
//})

$("body").on("click", "#newFood", function () {
    newFood();
})


WinJS.UI.Pages.define("/pages/food/foodDetails.html", {
    ready: function (element, options) {        
        // get the ID of the food
        currentContentID = options;
        
        // load new food
        loadFoodContent();
    }
});