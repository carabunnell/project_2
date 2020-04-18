$(document).ready(function () {

    // var divHeader = $(".header-post");
    var imgHeader = $(".imagefluid-header");
    var postTitle = $(".post-title");
    var postAuthor = $(".post-author");

    var postTextONE = $(".post-body-one");
    var postImgONE = $(".imagefluid-one");

    var postTextTWO = $(".post-body-two");
    var postImgTWO = $(".imagefluid-two");

    // var postTextThree = $(".post-body-three");

    // var postId;
    var url = window.location.search;
    var idSearch;
    if (url.indexOf("?post_id=") !== -1) {
        idSearch = url.split("=")[1];
        getPost(idSearch);
    }

    // iniitializeAppending();
    // function iniitializeAppending() {
    //     // var newPDiv = $("<p>");
    //     // newPDiv.text("hello, it's me");
    //     // postTitle.append(newPDiv);
    //     console.log("this worked");
    //     imgHeader.attr("src", "https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg");
    //     postTitle.text("My Adventure");
    //     postAuthor.text("By carabunnell@gmail.com");
    //     postTextTWO.text("Once upon a time in a far away land there lived a very cool person named Rahajsha");
    //     console.log("this worked");
    // }

    // $.get("/api/viewposts/:title", function(data) {
    //     console.log("Stories", data);
    //     console.log(data);
    function getPost(id) {
        // postId = "/?post_id=" + id;

        console.log("id: " + id);
        $.get("/api/posts", id, function (data) {
            console.log("Stories", data);
            var idInt = parseInt(id);
            // iniitializeAppending(data, id);

            // console.log("dataInt: " + (data[0].id + 9));

            for (var i = 0; i < data.length; i++) { 
                console.log("i: " + i, "idInt: " + idInt, "data[" + i + "].id: " + data[i].id);

                // 0 < 10. i=0 data[0]. i= 0,1,2, 3,4,5,6, data[i].id=9, 10, 13, 65 idInt=65
                if (idInt === data[i].id) {
                    console.log("made it here");
                    storypost = data[i];
                    console.log("storypost title 1: " + storypost.title);
                    iniitializeAppending(storypost);
                }
                else {
                    console.log("no story to show");
                }
                // console.log("storypost title 2: " + storypost.title);

                // iniitializeAppending(storypost);
            }
                
            
        })
    }

    function iniitializeAppending(posts) {
        console.log("posts: " + posts.title + ", id: " + posts.id);
        
        imgHeader.attr("src", posts.imgHeader);
        postTitle.text(posts.title);
        postAuthor.text("By " + posts.User.email);
        
        postTextONE.text(posts.bodyONE);
        postImgONE.attr("src", posts.imgBodyONE)

        postTextTWO.text(posts.bodyTWO);
        postImgTWO.attr("src", posts.imgBodyTWO)
    }
});