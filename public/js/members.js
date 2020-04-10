$(document).ready(function () {
  // This api just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  //getting references to our form and input
  var submitbook = $(".submit");
  var bookTitle = $("#new-book-title")
  var bookDescribe = $("#new-book-describe")
  //when the submit button is clicked, we validate the sections are not blank
  submitbook.on("click", function(event) {
    event.preventDefault();
    var bookData = {
      name: bookTitle.val(),
      description: bookDescribe.val()
    };
    if (!bookData.name || !bookData.description) {
      return;
    }
    //if we have a title and description, we run the new book function
    newbook(bookData.name, bookData.description);
    var newDiv = $("<div>");
    newDiv.text(`Your new Storybook, ${bookTitle.val()} has been succuessfully created!`);
    $(".modal-footer").append(newDiv);
    var newBtn = $("<button>");
    newBtn.text(`${bookTitle.val()}`);
    $(".navbar-header").append(newBtn);
    newBtn.addClass("users-storybook btn btn-primary");
  });

  $(".users-storybook").on("click", function() {
    
  });
//btn to create the user's story. This button will be moved once
  $(".create-story-temp-btn").on("click", function() {

  });
  //does a post to the submit route. if succesful, we are redirected to the members page // otherwise we log any errors
  function newbook(title, description) {
    $.post("/api/newbook", {
        name: title,
        description: description
      }).then(console.log("yay we're done"));
      //close modal
      //this function will then create a button that has the title of the storyboard they can click. and then 
  }
});