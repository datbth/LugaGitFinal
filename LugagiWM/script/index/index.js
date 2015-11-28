// page variables
var urlList =
    ["http://lugagi.com/script/smartPhoneAPI/landing/loadEditorPickedContent.php",
    "http://lugagi.com/script/smartPhoneAPI/landing/loadLatestFood.php",
    "http://lugagi.com/script/smartPhoneAPI/landing/loadMostLikeCollection.php"]
var itemList = [".editorPickedItem", ".latestFoodItem", ".mostLikeCollectionItem"];
var containerList = ["#editorPickedContainer", "#latestFoodContainer", "#mostLikeCollectionContainer"];
var iconList = ["/images/editor-01.svg", "/images/monan-01.svg", "/images/bstuathich.svg"];
var titleList = ["Editor's Picks", "Latest Dishes", "Most Liked Collections"]
// startIndex and endIndex of each section
var startIndexList = [0,0,0];
var endIndexList = [0, 0, 0];


// load random dish
function randDish() {
    // show progress ring
    $("#randBreak").hide();
    $("#changeRand").hide();
    $("#randContainer").find("progress").show();
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
            $("#randContainer").find(".contentID").text(data.Foods[0].MonAnID);
            // hide progress ring
            $("#randContainer").find("progress").hide();
            $("#changeRand").show();
            $("#randBreak").show();
        }
    });
}

// load the content received from ajax into elements of item
function loadContent(itemElem, source) {
    var fullImgURL = "http://lugagi.com/script/timthumb.php?src=/" + source.ContentImageURL + "&w=300&h=200";
    itemElem.find(".contentImg").attr("src", fullImgURL);
    itemElem.find(".contentName").text(source.ContentName);
    itemElem.find(".contentView").text(source.ContentViewCount + " ");
    itemElem.find(".contentLike").text(source.ContentLikeCount);
    itemElem.find(".contentID").text(source.ContentID);
    itemElem.find(".contentType").text(source.ContentType);
    return "http://lugagi.com" + source.ContentLink;
};

// calculate the endIndex
function calculateEndIndex(source, lastIndex) {
    if (lastIndex % 2 == 0) {
        var endIndex = lastIndex - 2;
    } else {
        var endIndex = lastIndex - 1;
    };
    return endIndex;
}

// load previous contents of a section (the indexes of the items decreases by 2)
function sectionPrevious(numb) {
    if (startIndexList[numb] > 0) {
        startIndexList[numb] -= 2;
    }
        // to go previous when the startIndex is 0
    else {
        startIndexList[numb] = endIndexList[numb];
    }
    loadSection(numb);
}

// load next contents of a section (the indexes of the items increases by 2)
function sectionNext(numb) {
    if (startIndexList[numb] != endIndexList[numb]) {
        startIndexList[numb] += 2;
    }
        // reset startIndex if it hits the end of json
    else {
        startIndexList[numb] = 0;
    }
    loadSection(numb);
}


// run the ajax and get content from server, then load it to the page
function loadSection(numb) {
    // show the progress bar
    var containerID = $(".sectionContainer:eq(" + numb + ")");
    containerID.find(".pBar").html('<p><br /></p><progress></progress>');
    $.ajax({
        url: urlList[numb],
        dataType: "json",
        data: "Nothing",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            var sourceList = [data.EditorPickContents, data.LatestFood, data.MostLikeCollection];
            var source = sourceList[numb];
            
            // calculate the indexes so that the startIndex can be reset at the end of json
            var lastIndex = source.length;
            endIndexList[numb] = calculateEndIndex(source, lastIndex);
            var i = startIndexList[numb];
            var j = 0;

            // load 6 new items
            for (j; j < 6; j++) {

                // prevent the index from getting out of json range when the nextButton is clicked too fast
                try {
                    var test = source[i].ContentName;
                }
                catch (err) {
                    startIndexList[numb] = 0;
                    break;
                }
                // load new content to item
                var itemElem = containerID.find(".contentItem:eq(" + j + ")");
                loadContent(itemElem, source[i]);
                i++;

                // reset the index if it hits the end of json
                if (i == lastIndex) {
                    i = 0;
                };
            };
            // hide the progress bar
            containerID.find(".pBar").html('<p><br /><br /></p>');
        }
    })
}

// page events
$(document).ready(function () {

    // header section events
    $('body').on("click", "#goToIngredient", function () {
        WinJS.Navigation.navigate("/pages/recommendation/ingredientBasedSuggestion.html"); // navigate to ingredientBasedSuggestion page
    });

    $('body').on("click", "#goToWeek", function () {
        WinJS.Navigation.navigate("/pages/recommendation/weekMenuSuggestionFilter.html"); // navigate to weekMenuSuggestion page
    });
    
    // random button event
    $('body').on("click", "#changeRand", function () {
        randDish();
    });

    // previous and next events of all sections
    $('body').on("click", ".previousButton", function () {
        var numb = $('.previousButton').index(this);
        sectionPrevious(numb);
    });

    $('body').on("click", ".nextButton", function () {
        var numb = $('.nextButton').index(this);
        sectionNext(numb);
    });

    $('body').on("click", ".contentItem", function () {
        var contentType = $(this).find(".contentType").text();
        if (contentType == "food") {
            var contentID = $(this).find(".contentID").text();            
            WinJS.Navigation.navigate("/pages/food/foodDetails.html", contentID);
        }
        
    });
});


// do when the page is ready
WinJS.UI.Pages.define("/pages/index/index.html", {
    ready: function (element, options) {
        // generate random dish
        randDish();

        // generate random startIndex
        var startIndex = Math.round(Math.random() * 19) * 2;
        startIndexList[0] = startIndex;

        // load all the sections
        var noOfSections = urlList.length;
        var section = 0;
        var sectionHTML = $("#sectionTemplate").html();
        for (section; section < noOfSections; section++) {
            var sectionID = $(".section:eq(" + section + ")");
            sectionID.html(sectionHTML);
            sectionID.find(".sectionIcon").attr("src", iconList[section]);
            sectionID.find(".sectionTitle").text(titleList[section])
            loadSection(section);
        }
    }
});