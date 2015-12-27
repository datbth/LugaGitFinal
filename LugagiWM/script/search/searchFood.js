(function () {
    var searchName;

    //Function to load index content
    function loadFoodSearchResult() {


        //= WinJS.Application.sessionState.searchKeyword;
        // $("#displaySearchKeyword").text(WinJS.Application.sessionState.searchKeyword);

        //Load random food
        $.ajax({
            type: "GET",
            url: "http://lugagi.com/script/smartPhoneAPI/search/search.php",
            data: "searchName=" + searchName,
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i in data.FoodSearchReults) {
                    var foodID = data.FoodSearchReults[i].MonAnID;
                    var foodName = data.FoodSearchReults[i].MonAnName;
                    var imageURL = data.FoodSearchReults[i].ImageURL;
                    var fullImageURL = "http://lugagi.com/script/timthumb.php?src=" + imageURL + "&w=300&h=200";

                    var newResultRow = $("#searchResultSampleRow").clone();
                    newResultRow.attr("id", "");
                    newResultRow.css("display", "block");
                    newResultRow.find(".foodName").text(foodName);
                    newResultRow.find(".foodImage").attr("src", fullImageURL);
                    //newResultRow.find(".content-link").attr("href", "/pages/food/foodDetails.html");
                    newResultRow.find(".content-link").attr("data-ID", foodID);
                    //"MonAnID=" + 
                    $("#searchResultDisplay").append(newResultRow);
                }
            }
        });
    }

    $('body').on("click", ".resultRow", function () {
        var currentItem = $(this);
        var contentID = currentItem.find(".content-link").attr("data-ID");
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", contentID);

    });


    //On document load
    WinJS.UI.Pages.define("/pages/search/searchResult.html", {
        ready: function (element, options) {
            searchName = options;
            $("#displaySearchKeyword").text(searchName);
            loadFoodSearchResult();
        },
    });
})();