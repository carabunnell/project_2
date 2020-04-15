$(document).ready(function () {

    // var divHeader = $(".header-post");
    var imgHeader = $("imagefluid-header");

    var postTitle = $("post-title");
    var postAuthor = $("post-author");

    var postTextONE = $("post-body-one");
    var postImgONE = $("imagefluid-one");

    var postTextTWO = $("post-body-two");
    var postImgTWO = $("imagefluid-two");

    var postTextThree = $("post-body-three");

   var newDiv = $("<h2>");
   newDiv.text("hello!");
   postTitle.append(newDiv);
    // postTitle.text("hello!");
    
    postTextONE.text("boombaby");


    var postId;
    var url = window.location.search;
    var idSearch;
    if (url.indexOf("?post_id=") !== -1) {
        idSearch = url.split("=")[1];
        console.log(idSearch);
        getPost(idSearch);
    }

    // $.get("/api/viewposts/:title", function(data) {
    //     console.log("Stories", data);
    //     console.log(data);
    function getPost(id) {
        postId = "/?post_id=" + id;
        console.log("made it here: " + postId);


        $.get("/api/posts" + postId, function (data) {
            console.log("Stories", data);
            // posts = data;
            for (var i = 0; i < postId; i++) {
                if (i = data[i].id) {
                    storypost = data[i];
                    return storypost;
                }
                console.log(storypost);
                iniitializeAppending(storypost);
            }
                
            
        })
    }

    function iniitializeAppending(fullpost) {
        console.log(fullpost);
        // imgHeader.text(fullpost.title)
        postTitle.text("hello!")
        postTextONE.text("boombaby");
    }
});