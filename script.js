//this is the javascript connected to index.html. This is not code that you run in node.js

//I NEED TO GET THE VARIABLE "query" from the username text box!
//const query = document.querySelector('input') like this but this wont work.

const queryForm = document.querySelector('form')
const query = document.querySelector('input')

//validates that data was entered...then it calls function(s) to either add
//a username to the database, or say "choose a different username!"
function validate()
{
    var uLength = document.getElementsByName("username")[0].value.length;
    var pLength = document.getElementsByName("password")[0].value.length;
    if (uLength == 0 || pLength == 0)
      alert("Please fill in all fields!");
    else {
    //basically, should call 2 functions I believe.
    //1) old user error message "please choose a different username!"
    //2) newUser...add a new user to the database
    queryForm.addEventListener('submit', e => {
      e.preventDefault();
      oldUser();
    })
  }
}
//treats input like an old username...if it isn't, then it calls the newUser function
async function oldUser() {
  const oldUsername = query.value;
  const response = await fetch('/q?username=' + username);
  console.log(response);

  const result = await response.json();

  if (oldUsername == result.username) {
    alert("That username is taken, please enter a new username");
  } else {
    newUser();
  }
}


//writing to the database ...something here is wrong I bet.
async function newUser() {
  const newUsername = query.value;

  const usernameJson = { // not sure about this
    username: newUsername
  }

  const fetchOptions = {
    method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(usernameJson)
   };

   await fetch('submit/' + newUsername, fetchOptions);
  }



//----------------------IMAGE CODE--------------------//
numImage = 0;
previousWord = "image";
function getImage(default_image, retry) {
  if(default_image) word = "image";
  else if(retry) word = "retry";
  else word = document.form.image.value;

  if(previousWord == word) numImage = numImage + 1;
  else numImage = 0;

  previousWord = word;

  request = new XMLHttpRequest();
  request.open("GET", "https://pixabay.com/api/?key=15909759-b4111d3c13a2b72bb3717136f&q=" + word, true);

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      result = request.responseText;
      // alert(result);
      imageData = JSON.parse(result);
      if(imageData["totalHits"] == 0) {
        alert("There are no results for this search");
        getImage(false, true);
        return 0;
      }
      if(numImage == imageData["totalHits"]) {
        alert("You have gone through all images with this word. Starting image results over.");
        numImage = 0;
      }
      document.getElementById("picture").innerHTML ="<img class='picture' src='" + imageData["hits"][numImage]["webformatURL"] + "'>";
      var image_name = imageData["hits"][numImage]["webformatURL"];
      document.getElementById("image").innerHTML = image_name;
    }
    else if (request.readyState == 4 && request.status != 200) {
      document.getElementById("picture").innerHTML = "Something is wrong!  Check the logs to see where this went off the rails";
    }
    else if (request.readyState == 3) {
      document.getElementById("picture").innerHTML = "Too soon!  Try again";
    }
  }
  request.send();
}
