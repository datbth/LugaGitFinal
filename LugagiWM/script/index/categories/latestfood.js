function loadFood() {
    $.ajax({
        type:"GET",
        url: "http://lugagi.com/script/smartPhoneAPI/landing/loadLatestFood.php",
        dataType: "json",
        data: "Nothing",
        async: true,
        cache: false,
        success: function (data) {
            var source = data.LatestFood;
            var length = source.length
            console.log(length)
            $("#shit").text("shit")
            for (var i = 0; i < length; i++) {
                var currentSource = source[i];
                var newFood = $("#content").clone();

                var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/" + currentSource.ContentImageURL + "&w=300&h=200";
                newFood.find(".foodName").text(currentSource.ContentName);
                newFood.find(".foodImg").attr("src", fullImgURL)
                newFood.find("#viewCount").text(currentSource.ContentViewCount)
                newFood.find("#likeCount").text(currentSource.ContentLikeCount)
                newFood.attr("ContentID", currentSource.ContentID)
                newFood.show();
                $("#foodContent").append(newFood);
            }
        }
    })
}

$(document).ready(function () {
    $("body").on("click", ".foodItem", function () {
        var currentID = $(this).attr("ContentID");
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", currentID);
    })
})

WinJS.UI.Pages.define("/pages/index/categories/latestFood.html", {
    ready: function () {
        loadFood();
    }
});
