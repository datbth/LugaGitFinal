$('body').on("click", "#goToIngredient", function () {
    WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
    
})
$('body').on("click", "#goToWeek", function () {
    WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestion.html"); // navigate to weekMenuSuggestion page
    WinJS.Navigation.addEventListener("navigated", navigate);
})
