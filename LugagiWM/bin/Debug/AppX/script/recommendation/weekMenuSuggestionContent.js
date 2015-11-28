var dayMenuHTML;
var mealSectionList = [".breakfastSection", ".lunchSection", ".dinnerSection"];
var contentItemHTML = '<div class="contentItem col-xs-6 col-sm-4 col-md-3 col-lg-2">' +
                           '<img class="contentImg img-responsive" src="" />' +
                           '<h6 class="contentName"></h6>' +
                           '<small>' +
                               //'<span class="glyphicon glyphicon-eye-open contentView"></span>' +
                               //'<span class="glyphicon glyphicon-heart contentLike"></span>' +
                               '<span class="contentID" style="display:none"></span>' +
                               '<span class="contentType" style="display:none">food</span>' +
                           '</small>' +
                       '</div>';



// reload the contents
function reloadContent() {
    var i = 0;
    for (i; i < 7; i++) {
        var dayID = ".tab-pane:eq(" + i + ")";
        $(dayID).html(dayMenuHTML);
    }
}

// load a food item content
function loadContent(mealSectionElem, source, index) {
    var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/foodimages/" + source.ImageURL + "&w=300&h=200";
    mealSectionElem.find(".contentImg").eq(index).attr("src", fullImgURL);
    mealSectionElem.find(".contentName").eq(index).text(source.MonAnName);
    mealSectionElem.find(".contentID").eq(index).text(source.MonAnID);
}

// load the week menu page
function loadWeekMenuContent(data) {
    var i = 0;
    for (i; i < 7; i++) {
        var daySource = data[i].Meal;
        var dayID = ".tab-pane:eq(" + i + ")";
        var j = 0;
        for (j; j < 3; j++) {
            var mealSource = daySource[j];
            var mealSectionElem = $(dayID).find(mealSectionList[j]);
            var k = 0;
            for (k; k >= 0; k++) {
                var dishSource = mealSource[k];
                if (dishSource) {
                    mealSectionElem.append(contentItemHTML);
                    loadContent(mealSectionElem, dishSource, k);
                } else {
                    break;
                }
            }
        }
    }
}



WinJS.UI.Pages.define("/pages/recommendation/weekMenuSuggestionContent.html", {
    ready: function (element, options) {
        dayMenuHTML = $("#monday").html();
        reloadContent();
        loadWeekMenuContent(options);
    }
});