function loadFeaturedCollections() {
    $.ajax({
        type: "GET",
        url: "http://lugagi.com/script/smartPhoneAPI/landing/loadMostLikeCollection.php",
        dataType: "json",
        data: "Nothing",
        async: true,
        cache: false,
        success: function (data) {
            var source = data.MostLikeCollection;
            var length = source.length
            for (var i = 0; i < length; i++) {
                var currentSource = source[i];
                var newCollection = $("#content").clone();
                var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/" + currentSource.ContentImageURL + "&w=300&h=200";
                newCollection.find(".collectionName").text(currentSource.ContentName);
                newCollection.find(".collectionImg").attr("src", fullImgURL);
                newCollection.find(".contentView").text(currentSource.ContentViewCount);
                newCollection.find(".contentLike").text(currentSource.ContentLikeCount);
                newCollection.attr("ContentID", currentSource.ContentID);
                newCollection.show();
                $("#collectionContent").append(newCollection);
                $("progress").hide();
            }
        }
    });
}

$(document).ready(function () {
    $("body").on("click", ".featuredItem", function () {
        var currentID = $(this).attr("ContentID");
        WinJS.Navigation.navigate("/pages/collection/collection.html", currentID);
    })
})

WinJS.UI.Pages.define("/pages/index/categories/featuredCollection.html", {
    ready: function () {
        loadFeaturedCollections();
    }
});
