﻿function loadMostLikeCollection() {
    $.ajax({
        type:"GET",
        url: "http://lugagi.com/script/smartPhoneAPI/landing/loadMostLikeCollection.php",
        dataType: "json",
        data: "Nothing",
        async: true,
        cache: false,
        success: function (data) {
            var source = data.MostLikeCollection;
            var length = source.length
            console.log(length)
            //$("#shit").text("shit")
            for (var i = 0; i < length; i++) {
                var currentSource = source[i];
                var newCollection = $("#content").clone();
                var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/" + currentSource.ContentImageURL + "&w=300&h=200";
                newCollection.find(".collectionName").text(currentSource.ContentName);
                newCollection.find(".collectionImg").attr("src", fullImgURL)
                newCollection.find("#viewCount").text(currentSource.ContentViewCount)
                newCollection.find("#likeCount").text(currentSource.ContentLikeCount)
                newCollection.attr("ContentID", currentSource.ContentID)
                newCollection.show();
                $("#collectionContent").append(newCollection);

            }
        }
    })
}

$(document).ready(function () {
    $("body").on("click", ".featuredItem", function () {
        var currentID = $(this).attr("ContentID");
        WinJS.Navigation.navigate("/pages/collection/collection.html", currentID);
    })
})

WinJS.UI.Pages.define("/pages/index/categories/featuredCollection.html", {
    ready: function () {
        loadMostLikeCollection();
    }
});