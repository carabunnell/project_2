$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our posts
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our posts
    var posts;

    // The code below handles the case where we want to get blog posts for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
    console.log(userId);
  }
  // If there's no userId we just get all posts as usual
  else {
    getPosts();
  }

    // This function grabs posts from the database and updates the view
    function getPosts(user) {
        userId = user || "";
        console.log(userId);
    if (userId) {
      userId = "/?user_id=" + userId;
    }
      $.get("/api/posts" + userId, function(data) {
        console.log("Stories", data);
        posts = data;
        if (!posts || !posts.length) {
          displayEmpty(user);
        }
        else {
          initializeRows();
        }
      });
    }

    // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }
  
    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    // var formattedDate = new Date(post.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //starts the post div
    var bootstrapColumnDiv = $("<div>");
    bootstrapColumnDiv.addClass("col-md-3");
    var newPostCard = $("<div>");
    //adds a class
    newPostCard.addClass("storylist-div");
    //adding image to div body
    var newPostBodyLink = $("<a>");
    newPostBodyLink.attr("href", "/viewpost?post_id=" + post.id + "");

    var newPostBody = $("<img>");
    
    newPostBody.attr("src", post.imgHeader);
    // newPostBody.attr("href", "/viewpost?post_id=" + post.id + "");
    newPostBody.addClass("image-post imagefluid");
    //starts div adds class
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("storylist-text-div");
    //starts buttons, adds text and class
    var buttonDiv = $("<div>");
    buttonDiv.addClass("storylist-buttons")
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger storylist-delete-btn");
    // var editBtn = $("<button>");
    // editBtn.text("EDIT");
    // editBtn.addClass("edit btn btn-info");
    //starts title and adds classes etc
    var newPostTitle = $("<a>");
    newPostTitle.text(post.title);
    newPostTitle.addClass("storylist-headers");
    newPostTitle.css({
      "font-size": "20px"
    });
    // newPostTitle.css({

    // });
    newPostTitle.attr("href", "/viewpost?post_id=" + post.id + "");
    //starts user
    // var newPostDate = $("<small>");
    var authorDiv = $("<div>");
    authorDiv.addClass("storylist-authors");
    var newPostUser = $("<h5>");
    //adds text to user and css
    newPostUser.text("By: " + post.User.email);
    newPostUser.css({
      float: "right",
      color: "white",
      "margin-top":
      "-10px"
    });
    //adds card body and class
    // var newPostCardBody = $("<div>");
    // newPostCardBody.addClass("card-body");
    //adds image in body with
   
    // newPostDate.text(formattedDate);
    // newPostTitle.append(newPostDate);
    buttonDiv.append(deleteBtn);
    // buttonDiv.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    authorDiv.append(newPostUser);
    
    newPostBodyLink.append(newPostBody);
    // newPostCardBody.append(newPostBody);
    newPostBodyLink.append(newPostCardHeading);
    newPostBodyLink.append(buttonDiv);
    newPostBodyLink.append(authorDiv);
    newPostCard.append(newPostBodyLink);
    bootstrapColumnDiv.append(newPostCard);
    // newPostCard.append(newPostCardBody);
    bootstrapColumnDiv.data("post", post);
    return bootstrapColumnDiv;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }
  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }
    // This function displays a message when there are no posts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for User #" + id;
      }
      blogContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
      "'>here</a> in order to get started.");
      blogContainer.append(messageH2);
    }
  
  });
  