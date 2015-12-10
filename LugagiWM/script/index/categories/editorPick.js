function loadEditorPickedContent() {
    $.ajax({
        type: "GET",
        url: "http://lugagi.com/script/smartPhoneAPI/landing/loadEditorPickedContent.php",
        dataType: "json",
        data: "Nothing",
        async: true,
        cache: false,
        success: function (data) {
            var source = data.EditorPickContents;
            var length = source.length
            console.log(length)
            
            for (var i = 0; i < length; i++) {
                var currentSource = source[i];
                var newPick = $("#content").clone();

                var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/" + currentSource.ContentImageURL + "&w=300&h=200";
                newPick.find(".pickName").text(currentSource.ContentName);
                newPick.find(".pickImg").attr("src", fullImgURL)
                newPick.find("#viewCount").text(currentSource.ContentViewCount)
                newPick.find("#likeCount").text(currentSource.ContentLikeCount)
                newPick.attr("ContentID", currentSource.ContentID)
                newPick.show();
                $("#pickContent").append(newPick);
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

WinJS.UI.Pages.define("/pages/index/categories/editorPick.html", {
    ready: function () {
        loadEditorPickedContent();
    }
});
