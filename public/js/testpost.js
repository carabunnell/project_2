$(document).ready(function() {

    // var divHeader = $(".header-post");
    var imgHeader = $("imagefluid-header");
    
    var postTitle = $("post-title");
    var postAuthor = $("post-author");
    
    var postTextONE = $("post-body-one");
    var postImgONE = $("imagefluid-one");
    
    var postTextTWO = $("post-body-two");
    var postImgTWO = $("imagefluid-two");
    
    var postTextThree = $("post-body-three");

        $.get("/api/viewposts/:title" + storytitle, function(data) {
            console.log("Stories", data);
            console.log(data);
            iniitializeAppending(data);
        });

        function iniitializeAppending(fullpost) {
            // var newHeader
        }
    });