
args.setPromise(WinJS.UI.processAll().done(function () {
    $("#goToIngredient").click(function () {
        $('#test').text('123')
        WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
        WinJS.Navigation.addEventListener("navigated", navigate);
    })

    $("#goToWeek").click(function () {
        WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestion.html"); // navigate to ingredientBasedSuggestion page
        WinJS.Navigation.addEventListener("navigated", navigate);
    })
}))
       