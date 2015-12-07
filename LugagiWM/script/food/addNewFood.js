function loadAddNewFoodContent() {
    //Load all the food types
    $.ajax({
        type: "POST",
        url: "http://lugagi.com/script/food/getFoodType.php",
        data: "Nothing",
        dataType: "json",
        async: true,
        success: function (data) {
            for (var i in data.FoodTypes) {
                var foodTypeID = data.FoodTypes[i].LoaiMonAnID;
                var foodTypeDescription = data.FoodTypes[i].LoaiMonAnDescription;
                var newFoodTypeOption = "<option class='loaiMonAnOption value='" + foodTypeID + "'>" + foodTypeDescription + "</option>";
                $("#LoaiMonAn").append(newFoodTypeOption);
            }
        }
    });
    //Hide the additional information panel
    $("#food-additional-info").css("display", "none");
}

WinJS.UI.Pages.define("/pages/food/addNewFood.html", {
    // . . .
    ready: function (element, options) {
        loadAddNewFoodContent();
    },
    // . . .
});


//Function to show or hide information panel when clicking on the link trigger
$("body").on("click", "#show-more-info", function () {
    if ($("#food-additional-info").css("display") == "none") {
        $("#food-additional-info").slideDown();
    }
    else {
        $("#food-additional-info").slideUp();
    }
});

$("body").on("change", "#fileToUpload", function (e) {
    //Display image loading spinner
    $("#imageLoadingSpinner").show();
    var selectImageButton = $(this);
    selectImageButton.prop("disabled", true);

    var canvas = document.getElementById("sourceimagecanvas");
    var context = canvas.getContext("2d");
    var ctx = canvas.getContext("2d");

    var src = $("#sourceimagecanvas")[0];
    var dst = $("#destimagecanvas")[0];

    if (this.files && this.files[0]) {
        console.debug("Starting resizing image");
        for (var i = 0, f; f = this.files[i]; i++) {
            var FR = new FileReader();
            FR.onload = function (e) {
                var img = new Image();
                img.onload = function () {

                    targetWidth = 960;
                    canvas.width = targetWidth;
                    canvas.height = targetWidth / (img.width / img.height);

                    /// step 1
                    var oc = document.createElement('canvas'),
                        octx = oc.getContext('2d');
                    oc.width = img.width * 0.5;
                    oc.height = img.height * 0.5;
                    octx.drawImage(img, 0, 0, oc.width, oc.height);

                    /// step 2
                    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

                    ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
                                     0, 0, canvas.width, canvas.height);

                    console.debug("Image resize complete");
                    //Convert the image in the dest canvas to a img html tag
                    var imgSourceString = canvas.toDataURL();
                    selectImageButton.parent().parent().find("#food-image-preview").attr("src", imgSourceString);
                    selectImageButton.parent().parent().find("#food-image-preview").css("display", "block");
                    console.debug("Display result image to IMG tag");
                    //Set the image string into a hidden input
                    $("#foodImageString").val(imgSourceString);
                    console.debug("Insert image string to the hidden input");
                    //Hide image spinner
                    $("#imageLoadingSpinner").hide();
                    selectImageButton.prop("disabled", false);
                };
                img.src = e.target.result;
            };
            FR.readAsDataURL(this.files[i]);
        }
    }

});
//*************** End of functions to resize images ********************

//Common function to add new food to the database
function addFood(action) {

    var tenMonAn = $("#TenMon").val();
    if (tenMonAn) {
        var foodData = $("#foodInfoForm").serialize();
        foodData = foodData + "&CurrentUserID=" + WinJS.Application.sessionState.currentUserID;
        console.log(foodData);
        $.ajax({
            url: "http://lugagi.com/script/smartPhoneAPI/food/themmonan.php",
            type: "POST",
            data: foodData,
            dataType: "json",
            async: false,
            beforeSend: function () {
                $("#waitingSpinner").css("display", "block");
                $("#addNewFoodButton").attr("disabled", true);
            },
            success: function (data) {
                //Get data from the database
                console.log(data);
                for (var i in data.InsertNewFoodResult) {
                    
                    var status = data.InsertNewFoodResult[i].Status;
                    var monAnID = data.InsertNewFoodResult[i].MonAnID;
                    var monAnName = data.InsertNewFoodResult[i].MonAnName;
                    var errorMessage = data.InsertNewFoodResult[i].ErrorMessage;
                }

                //Redirect the user to the page
                if (status == "success") {
                    if (action == "add-only") {
                        WinJS.Navigation.navigate("/pages/food/foodDetails.html", monAnID);
                    }
                    else if (action == "add-then-recipe") {

                    }
                }
                else {
                    alertBox("Đã xảy ra lỗi: " + errorMessage + ". Vui lòng thử lại");
                }
                $("#waitingSpinner").css("display", "none");
                $("#addNewFoodButton").attr("disabled", false);
            },
            error: function (xhr, status, error) {
                console.debug("AJAX request fail " + status + " " + error);
                var err = xhr.responseText;
                alertBox(err + error);
                $("#waitingSpinner").css("display", "none");
                $("#addNewFoodButton").attr("disabled", false);
            }
        });
    }
    else {
        alertBox("Bạn không được để trống tên món ăn!")
    }
}

//Function to submit the form
$("body").on("click", "#addNewFoodButton", function (e) {
    addFood("add-only");
});

//Function to submit the form and then move to the edit recipe screen
$("body").on("click", "#addNewFoodAndRecipe", function (e) {
    addFood("add-then-recipe");
});