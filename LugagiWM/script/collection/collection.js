var collectionID;
var foodIdList = [];
var collectionName;
function loadCollection() {
    $.ajax({
        type: "GET",
        url: "http://lugagi.com/script/collection/getCollectionContent.php?UserCollectionID=100",
        data: { UserCollectionID: collectionID },
        dataType: 'json',
        cache: false,
        async: true,
        success: function (receivedData) {
            var source = receivedData.Collection
            collectionName = source.CollectionName;
            $("#collectionName").text(collectionName);
            $("#ViewCount").text(source.ViewCount);
            $("#LikeCount").text(source.LikeCount);
            $("#CollectionDescription").text(source.CollectionDescription);
            $("#CollectionCreatedDate").text(source.CollectionCreatedDate);

            var contentSource = source.Content
            for (var i = 0; i < contentSource.length; i++) {
                var currentSource = contentSource[i];
                var newFood = $("#collectionItem").clone();
                var contentImg = currentSource.ContentImageURL;
                if (contentImg) {
                    var fullImgURL = currentSource.ContentImageURL.replace("com/", "com/script/timthumb.php?src=/") + "&w=300&h=200";
                }
                else {
                    var fullImgURL = '';
                }
                newFood.find(".collectionItemName").text(currentSource.ContentName);
                newFood.find(".collectionItemImg").attr("src", fullImgURL);
                newFood.attr("ContentID", currentSource.ContentID);
                newFood.show();
                $("#collectionContent").append(newFood);
                // append food ID to a list.
                foodIdList.push(currentSource.ContentID);
                // create index atrribute
                foodCurrentIndex = newFood.attr("currentIndex", i);

            }
        }
    });
    console.log(foodIdList);
};

// event
$(document).ready(function () {
    $("body").on("click", ".collectionItem", function () {
        var currentItem = $(this);
        var currentID = currentItem.attr("ContentID");
        // WinJS.Navigation.navigate("/pages/food/foodDetails.html", foodIdList[currentItem.attr("currentIndex")]);
        var listAndIndex = {
            0: parseInt(currentItem.attr("currentIndex")),
            1: foodIdList,
            2: collectionName,
        };
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", listAndIndex);
    });
})

WinJS.UI.Pages.define("/pages/collection/collection.html", {
    ready: function (element, options) {
        collectionID = options;
        loadCollection();
    }
});