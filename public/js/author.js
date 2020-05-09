$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  // var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  // $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  // $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getAuthors();

  // Function for retrieving authors and getting them ready to be rendered to the page
  // function getAuthors() {
  //   $.get("/api/authors", function(data) {
  //     var rowsToAdd = [];
  //     for (var i = 0; i < data.length; i++) {
  //       rowsToAdd.push(createAuthorRow(data[i]));
  //     }
  //     renderAuthorList(rowsToAdd);
  //     nameInput.val("");
  //   });
  // }
  function getAuthors() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      renderUserList(rowsToAdd);
      nameInput.val("");
    });
  }

  //api call for searching for a user. this will be $.get("api/users/:email"). they will search by an email. then the author api will be app.get("api/users:email, function db.User.findOne({where: { id: req.params.id}, include db.Stories. then function(dbUser res.json dbUser"). now it will take that info, and push it to the database. it will take the id of the user and using db.User.update({ it will, push to already exising array in the user file. }). once that happends,, need to adjust the functions to first query 

  // Function for creating a new list row for users
  function createUserRow(userData) {
    // console.log("userdata: " + userData.dataValues);
    var newTr = $("<tr>");
    newTr.data("User", userData.email);
    newTr.append("<td>" + userData.email + "</td>");
    if (userData.Stories) {
      newTr.append("<td> " + userData.Stories.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/storybook?user_id=" + userData.id + "'>Go to Posts</a></td>");
    // newTr.append("<td><a href='/cms?user_id=" + userData.id + "'>Create a Post</a></td>");
    // newTr.append("<td><a style='cursor:pointer;color:red' class='delete-user'>Delete User</a></td>");
    return newTr;
  }

  
  // A function for rendering the list of authors to the page
  function renderUserList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      console.log("no user");
      // renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  // function renderEmpty() {
  //   var alertDiv = $("<div>");
  //   alertDiv.addClass("alert alert-danger");
  //   alertDiv.text("You must create an Author before you can create a Post.");
  //   authorContainer.append(alertDiv);
  // }

  // Function for handling what happens when the delete button is pressed
  // function handleDeleteButtonPress() {
  //   var listItemData = $(this).parent("td").parent("tr").data("author");
  //   var id = listItemData.id;
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/authors/" + id
  //   })
  //     .then(getAuthors);
  // }

  // // A function to handle what happens when the form is submitted to create a new Author
  // function handleAuthorFormSubmit(event) {
  //   event.preventDefault();
  // //   // Don't do anything if the name fields hasn't been filled out
  //   if (!nameInput.val().trim().trim()) {
  //     return;
  //   }
  //   // Calling the upsertAuthor function and passing in the value of the name input
  //   findUser({
  //     name: nameInput
  //       .val()
  //       .trim()
  //   });
  // }

  // A function for creating an author. Calls getAuthors upon completion
  // function findUser(authorData) {
  //   $.post("/api/authors", authorData)
  //     .then(getAuthors);
  // }
});
