$('body').on("click", "#goToIngredient", function () {
    WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
});

$('body').on("click", "#goToWeek", function () {
    WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestion.html"); // navigate to weekMenuSuggestion page
});

$('body').on("click", "#changeRand", function () {
    randDish();
});

$('body').on("click", "#editorPickedPrevious", function () {
    if (startIndex > 0) {
        startIndex -= 2;
    } else {
        startIndex = 38;
    }
    editorPickedDish();
});

$('body').on("click", "#editorPickedNext", function () {
    console.log(startIndex);
    startIndex += 2;
    editorPickedDish();
});

$('body').on("click", ".editorPickedItem", function () {
    var itemID = $('.editorPickedItem').index(this);
    WinJS.Navigation.navigate(editorPickedList[itemID]);
});


// get random dish
function randDish() {
    $.ajax({
        url: "http://lugagi.com/script/food/generateRandomFood.php",
        data: "Nothing",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/foodimages/" + data.Foods[0].ImageURL + "&w=500&h=200";
            $("#randImg").attr("src", fullImgURL);
            $("#randName").text(data.Foods[0].MonAnName);
            
        }
    });
}


function editorPickedDish() {
    $.ajax({
        url: "http://lugagi.com/script/smartPhoneAPI/landing/loadEditorPickedContent.php",
        dataType: "json",
        data: "Nothing",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            editorPickedList = [];
            var i = startIndex;
            console.log(i);
            var j = 0;
            for (j; j < 6; j++) {
                var fullContentURL = "http://lugagi.com" + data.EditorPickContents[i].ContentLink;
                editorPickedList[j] = fullContentURL;
                var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/" + data.EditorPickContents[i].ContentImageURL + "&w=300&h=200";
                var imgID = ".editorPickedImg:eq(" + j + ")";
                var nameID = ".editorPickedName:eq(" + j + ")";
                var viewCountID = ".editorPickedView:eq(" + j + ")";
                var likeCountID = ".editorPickedLike:eq(" + j + ")";
                $(imgID).attr("src", fullImgURL);
                $(nameID).text(data.EditorPickContents[i].ContentName);
                $(viewCountID).text(data.EditorPickContents[i].ContentViewCount + " ");
                $(likeCountID).text(data.EditorPickContents[i].ContentLikeCount);
                i++;
                if (i == 40) {
                    i = 0;
                    if (startIndex == 38) {
                        startIndex = 0;
                    }
                }
            };
        }
    })
}

// do when the page is ready
WinJS.UI.Pages.define("/pages/index/index.html", {
    ready: function (element, options) {
        randDish();
        startIndex = Math.round(Math.random() * 20) * 2;
        editorPickedDish();
    }
});