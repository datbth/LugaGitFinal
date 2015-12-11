var collectionID;
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
            $("#collectionName").text(source.CollectionName);
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
            }
        }
    });
};

// event
$(document).ready(function () {
    $("body").on("click", ".collectionItem", function () {
        var currentItem = $(this);
        var currentID = currentItem.attr("ContentID");
        WinJS.Navigation.navigate("/pages/food/foodDetails.html", currentID);        
    });
})

WinJS.UI.Pages.define("/pages/collection/collection.html", {
    ready: function (element, options) {
        collectionID = options;
        loadCollection();
    }
});