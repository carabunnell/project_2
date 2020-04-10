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
  });

  //does a post to the submit route. if succesful, we are redirected to the members page // otherwise we log any errors
  function newbook(title, description) {
    $.post("/api/newbook", {
        name: title,
        description: description
      }).then(console.log("yay we're done")
      );
  }
});