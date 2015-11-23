//Get parameter from the string separated by "&"
function getStringParameter(sString, sParam) {
    var sPageURL = sString;
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

//Get parameter from the URL
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
    
//Finds y value of given object
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop + 10;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

//Function to goBack one page
function goBack() {
    window.history.back();
}

//Function to find string between a custom tag
function getTextBetweenTags(str, tagname) {
    var rex = new RegExp("\{" + tagname + "}([\\w\\W]*?){\/"+ tagname + "}", "g");
    var finalArray = new Array();
    var result = "";
    
    while(result=rex.exec(str)){
        finalArray.push(result[1]);
    }
    
    return finalArray;
}

//Function to display a preview image to a img element
function displayFileInputToImg(input, imgElement) {
    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(imgElement).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }else{
         $(imgElement).attr('src', '/assets/no_preview.png');
    }
}

//Resize with pica
function resizeWithPica(srcCanvasID, destCanvasID, fileInputID, width, callback) {
		      
    var canvas = document.getElementById(srcCanvasID);
    var context = canvas.getContext("2d");
    
    var src = document.getElementById(srcCanvasID);
    var dst = document.getElementById(destCanvasID);
    var fileInput = document.getElementById(fileInputID);
    
    var resultImageStrings = [];
    
    if ( fileInput.files && fileInput.files[0] ) {
        
        for (var i = 0, f; f = fileInput.files[i]; i++) {
            var FR = new FileReader();
            FR.onload = function(e) {
                var img = new Image();
                img.onload = function() {
            
                    //Clear the canvas first for redrawing
                    context.clearRect(0, 0, 100, 100);
                
                    //Set the new width and height for the destination canvas
                    src.width = img.width;
                    src.height = img.height;
                
                    //Draw image to original canvas
                    context.drawImage(img, 0, 0);
                
                    //Resize with pica
                    dst.width = width;
                    dst.height = img.height * width / img.width;
                    window.pica.resizeCanvas(src, dst, {
                        quality: 3,
                        unsharpAmount: 0,
                        unsharpThreshold: 10,
                        transferable: true
                    //This is where a callback function comes in
                    }, function (err) {
                        //Return the Base64 result image string
                        resultImageStrings.push(dst.toDataURL());
                        //Then run the callback function();
                        if (callback && typeof(callback) === "function") {
                            callback();
                        }
                        alert(resultImageStrings.length);
                        return resultImageStrings;
                    });
                    
                };
                img.src = e.target.result;
            }; 
            FR.readAsDataURL( fileInput.files[i] );
        }
        
    }
    else {
        alert("Cannot find file input");
    }
}

//Check for follow function
function checkForFollow(followingID) {
    $.ajax({
        type: "POST",
        url: "/script/userdata/checkForFollow.php",
        data: "FollowingID=" + followingID,
        success: function(data) {
            $('.followButton').each(function(i, obj) {
                if ($(this).data("followingid") == followingID) {
                    if (data == "followed") {
                        $(this).text("Bỏ theo dõi");
                    }
                    else {
                        $(this).text("Theo dõi");
                    }
                }
            });
        }
	});
	return false;
}

//Code for follow button
function followUser(followingUserID) {
    var followButton = $("#followUserButton_" + followingUserID);
    var followingID = followButton.data("followingid");
    $.ajax({
        type: "POST",
        url: "/script/userdata/follow.php",
        data: "FollowingID=" + followingID,
        async: false,
        success: function(data) {
          console.log("Follow status: " + data);
          if (data == "follow") {
            followButton.text("Bỏ theo dõi");
          }
          else if (data == "unfollow") {
            followButton.text("Theo dõi");
          }
        }
    });
}

function checkForLikeCollection(userCollectionID) {
    $.ajax({
        type: "POST",
        url: "/script/userdata/checkForLikeCollection.php",
        data: "UserCollectionID=" + userCollectionID,
        success: function(data) {
            if (data == "Y") {
                $('.like-collection-button').each(function(i, obj) {
                    if ($(this).attr("id") == "like_" + userCollectionID) {
                        $(this).addClass("mdl-button--accent");
                    }
                });
            }
            else {
                $('.like-collection-button').each(function(i, obj) {
                    if ($(this).attr("id") == "like_" + userCollectionID) {
                        $(this).removeClass("mdl-button--accent");
                    }
                });
            }
        }
	});
	return false;
}

//Slug URL
function slugurl(sString) {
    var title, slug;
 
    //Lấy text từ parameter
    title = sString;
 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();
 
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra
    return slug;
}

//Touch event for the opening of drawer
$(document).ready(function(){
    $("body").on("swiperight",function( event ){
       // take 15% of screen good for diffrent screen size
       var window_width_15p = $( window ).width() * 0.15;
       // check if the swipe right is from 15% of screen (coords[0] means X)
       if ( event.swipestart.coords[0] < window_width_15p) {
           $(".mdl-layout__drawer-button").click();     
       }
    });
});

//Check for empty javascript object
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

//Promote content to home page
$(document).ready(function(){
    $("body").on("click", ".promoteButton", function(){
        var contentID = $(this).data("contentid");
        var contentType = $(this).data("contenttype");
        var promoteButton = $(this);
        $.ajax({
            type: "POST",
            url: "/script/system/homepage/promoteContent.php",
            data: "ContentID=" + contentID + "&ContentType=" + contentType,
            success: function(data) {
                if (data == "insert") {
                    promoteButton.text("BỎ ĐỀ CỬ");
                    promoteButton.removeClass("btn-success");
                    promoteButton.addClass("btn-danger");
                }
                else if (data == "delete") {
                    promoteButton.text("ĐỀ CỬ");
                    promoteButton.removeClass("btn-danger");
                    promoteButton.addClass("btn-success");
                }
            }
    	});
    });
});

//Check for promotion content
function checkForPromotionContent() {
    $.ajax({
        type: "POST",
        url: "/script/system/homepage/checkForPromotionContent.php",
        data: "XXX",
        dataType: "json",
        success: function(data) {
            for (var i in data.PromotionContents) {
                var contentid = data.PromotionContents[i].ContentID;
                var contentType = data.PromotionContents[i].ContentType;
                //Loop through the whole page and change the button text accordingly
                $('.promoteButton').each(function(j, obj) {
                    if ($(this).data("contentid") == contentid && $(this).data("contenttype") == contentType) {
                        $(this).text("BỎ ĐỀ CỬ");
                        $(this).removeClass("btn-success");
                        $(this).addClass("btn-danger");
                    }
                });
                
            }
        }
    });
    return false;
}