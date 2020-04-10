$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and author select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  
  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }

  // Getting the authors, and their posts
  getAuthors();

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body, title, or author
      if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newPost = {
        title: titleInput
          .val()
          .trim(),
        body: bodyInput
          .val()
          .trim(),
        AuthorId: authorSelect.val()
      };
      submitPost(newPost);
    }
  
    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
      $.post("/api/posts", post, function() {
        window.location.href = "/storybook";
      });
    }

    // A function to get Authors and then render our list of Authors
  function getAuthors() {
    $.get("/api/authors", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/authors";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }
//*
  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }
  
  });
  