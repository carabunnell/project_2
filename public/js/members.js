$(document).ready(function () {
  // This api just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var authorOf = 0;
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    authorOf = data.id;
    console.log("authorOf" + authorOf);
  //getting references to our form and input
  var submitbook = $(".submit");
  var bookTitle = $("#new-book-title");
  var bookDescribe = $("#new-book-describe");
    //div to hold storybooks
  var storybookDiv = $(".storybooks-list-div");
  //variable to hold our storybooks
  var storybooksHold;
    // pass in user id to function to populate the user's storbooks
  getStorybooks(authorOf);

  //looks for the user id, and the storybooks associated with them.
  function getStorybooks() {
    $.get("api/storybooks", function(data) {
      console.log("Storybooks", data)
      storybooksHold = data;
      initilizeBooks(storybooksHold);
    })
  }
  
  // function getStorybooks(userId) {
  //   console.log(`user id: ${userId}`)
  //   userId = "/?user_id=" + userId;
  //   $.get("api/storybooks" + userId, function(data) {
  //     console.log("Storybooks", data);
  //     storybooksHold = data;
  //     if (!storybooksHold || !storybooksHold.length) {
  //       console.log("no stories to display");
  //     }
  //     else {
  //       initilizeBooks(data);
  //     }
  //   });
  // }
  //when the submit button is clicked, we validate the sections are not blank
  submitbook.on("click", function(event) {
    event.preventDefault();
    console.log("made it to book submit");
    var bookData = {
      name: bookTitle.val().trim(),
      description: bookDescribe.val().trim(),
      UserId: authorOf
    };
    if (!bookData.name || !authorOf) {
      return;
    }
    //if we have a title and description, we run the new book function
    newbook(bookData.name, bookData.description, bookData.UserId);
    
    $(".modal-success-div").empty();
    var newDiv = $("<div>");
    newDiv.text(`Your new Storybook, ${bookTitle.val()} has been succuessfully created!`);
    $(".modal-success-div").append(newDiv);
    //appending storybook
    var newBtn = $("<a>");
    newBtn.text(`${bookTitle.val()}`);
    newBtn.attr("href", "/storybook");
    $(".navbar-header").append(newBtn);
    newBtn.addClass("users-storybook btn btn-primary");
  });
  
  function createNewCard(book) {
    console.log("book inside", book);
    console.log("book.name", book.name);
    var bookTitle = $("<a>");
    bookTitle.text(book.name);
    bookTitle.attr("href", "/storybook");
    var newPostBtn = $("<a>");
    newPostBtn.text("New Post");
    // newPostBtn.attr("href", "")
    newPostBtn.addClass("new-post-btn")
    var bookHeaderDiv = $("<div>");
    bookHeaderDiv.addClass("card-header");
    var bookDescribe = $("<div>");
    bookDescribe.text(book.description);
    bookDescribe.addClass("card-body");
    var fullBookCard = $("<div>");
    fullBookCard.addClass("card");
    // appending the title to the header
    bookHeaderDiv.append(bookTitle);
    //append new post to header
    bookHeaderDiv.append(newPostBtn);
    //appending the header to the card
    fullBookCard.append(bookHeaderDiv);
    //appending the body to the card
    fullBookCard.append(bookDescribe);
    return fullBookCard;
  }

  function initilizeBooks(booksArray) {
    console.log("books", booksArray);
    storybookDiv.empty();
    var booksAdd = [];
    var bookObject;
    for (var i = 0; i < booksArray.length; i++) {
      bookObject = booksArray[i];
      console.log("book object", bookObject);
      // createNewCard(bookObject);
      // console.log(booksArray[i]);
      booksAdd.push(createNewCard(bookObject));
    }
    console.log("booksAdd", booksAdd);
    storybookDiv.append(booksAdd);
  }

//   $(".users-storybook").on("click", function() {

//   });
// //btn to create the user's story. This button will be moved once
//   $(".create-story-temp-btn").on("click", function() {

//   });
  //does a post to the submit route. if succesful, we are redirected to the members page // otherwise we log any errors
  function newbook(title, description, authorId) {
    $.post("/api/newbook", {
        name: title,
        description: description,
        UserId: authorId
      }).then(function()   {
        window.location.href = "/members";
      });
      //close modal
      //this function will then create a button that has the title of the storyboard they can click. and then 
  }
});
});