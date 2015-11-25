$('body').on("click", "#goToIngredient", function () {
    WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
});

$('body').on("click", "#goToWeek", function () {
    WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestion.html"); // navigate to weekMenuSuggestion page
});

$('body').on("click", "#changeRand", function () {
    randDish();
});

// get random dish
function randDish() {
    $.ajax({
        url: "http://lugagi.com/script/food/generateRandomFood.php",
        data: "Nothing",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/foodimages/" + data.Foods[0].ImageURL + "&w=500&h=200";
            $("#randImg").attr("src", fullImgURL)
            $("#randName").text(data.Foods[0].MonAnName);
            
        }
    });
}

// do when the page is ready
WinJS.UI.Pages.define("/pages/index/index.html", {
    ready: function (element, options) {
        randDish();
    }
});