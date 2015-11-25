$('body').on("click", "#goToIngredient", function () {
    WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
});

$('body').on("click", "#goToWeek", function () {
    WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestion.html"); // navigate to weekMenuSuggestion page
});

// do when the page is ready
WinJS.UI.Pages.define("/pages/index/index.html", {
    ready: function (element, options) {
        // get random dish
        $.ajax({
            url: "http://lugagi.com/script/food/generateRandomFood.php",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#randName").text(data.Foods[0].MonAnName);
                var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/foodimages/" + data.Foods[0].ImageURL + "&w=500&h=200";
                console.log(fullImgURL);
                $("#randImg").attr("src", fullImgURL)
            }
        });
    }
});