function loadCollection() {
    $.ajax({
        type: "GET",
        url: "http://lugagi.com/script/smartPhoneAPI/landing/loadEditorPickedContent.php",
        data: "Nothing",
        dataType: 'json',
        cache: false,
        async: true,
        success: function (receivedData) {
            var source = receivedData.EditorPickContents
            for (var i = 0; i < source.length; i++) {
                var newFood = $("#editorsPickedItem").clone()
                var currentSource = source[i]
                var fullImgUrl = "http://lugagi.com/script/timthumb.php?src=" + currentSource.ContentImageURL + "&w=500&h=200";
                newFood.find(".editorsPickedItemImg").attr("src", fullImgUrl);
                newFood.find(".editorsPickedItemName").text(currentSource.ContentName);
                newFood.find(".contentView").text(currentSource.ContentViewCount);
                newFood.find(".contentLike").text(currentSource.ContentLikeCount);
                newFood.attr("ContentID", currentSource.ContentID);
                newFood.attr("ContentType", currentSource.ContentType)
                newFood.show();
                $("#editorsPickedContent").append(newFood)
                
            }
        }
    })
}

// page events
$(document).ready(function () {
    $('body').on("click", ".editorsPickedItem", function () {
        var currentItem = $(this);
        var contentType = currentItem.attr("ContentType")
        if (contentType == "food") {
            var contentID = currentItem.attr("ContentID");
            WinJS.Navigation.navigate("/pages/food/foodDetails.html", contentID);
        } else if (contentType = "collection") {
            var contentID = currentItem.attr("ContentID");
            WinJS.Navigation.navigate("/pages/collection/collection.html", contentID);
        }

    });

});

WinJS.UI.Pages.define("/pages/index/categories/editor'sPicked.html", {
    ready: function () {
        loadCollection();
    }
});