(function () {
    function loadLatestFood() {
        $.ajax({
            type: "GET",
            url: "http://lugagi.com/script/smartPhoneAPI/landing/loadLatestFood.php",
            dataType: "json",
            data: "Nothing",
            async: true,
            cache: false,
            success: function (data) {
                var source = data.LatestFood;
                var numOfFood = source.length;
                for (var i = 0; i < numOfFood; i++) {
                    var currentSource = source[i];
                    var newFood = $("#content").clone();

                    var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/" + currentSource.ContentImageURL + "&w=300&h=200";
                    var newFoodImg = newFood.find(".foodImg");
                    newFood.find(".foodName").text(currentSource.ContentName);
                    newFoodImg.attr("src", fullImgURL);
                    newFood.find(".contentView").text(currentSource.ContentViewCount);
                    newFood.find(".contentLike").text(currentSource.ContentLikeCount);
                    newFood.attr("ContentID", currentSource.ContentID);
                    newFood.show();
                    $("#foodContent").append(newFood);
                    if (i == numOfFood - 1) {
                        newFoodImg.on("load", function () {
                            $("progress").hide();
                        });
                    }
                };
                wrapTwoLines();
            }
        });
    }

    $(document).ready(function () {
        $("body").on("click", ".foodItem", function () {
            var currentID = $(this).attr("ContentID");
            WinJS.Navigation.navigate("/pages/food/foodDetails.html", currentID);
        })
    })

    WinJS.UI.Pages.define("/pages/index/categories/latestFood.html", {
        ready: function () {
            loadLatestFood();
        }
    });
})();