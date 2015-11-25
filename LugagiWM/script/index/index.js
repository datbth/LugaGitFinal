$('body').on("click", "#goToIngredient", function () {
    WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page

});

$('body').on("click", "#goToWeek", function () {
    WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestion.html"); // navigate to weekMenuSuggestion page
});

WinJS.UI.Pages.define("/pages/index.html", {
    ready: function (element, options) {
        var viewWidth = window.innerWidth;
    }
});