$(document).ready(function() {

    function modal() {
        $('#myModal').modal('show');
    }

    //API key
    var mykey = "feec332cd3344e9226a7105dd29cc5dae84c154d";

    var proxy = 'https://cors-anywhere.herokuapp.com/';

    //Clicking on the submit button triggers the following... 
    $(document).on("click", "#inputButton", function() {
        
        //Prevents the document from reloading
        event.preventDefault();
        
        //Store the user's string into comicName
        var comicName = $("#characterInput").val().trim();
        
        //Delete the string the user entered
        $("#characterInput").val("");

        //The URL to be entered into the AJAX call
        var queryURL = "https://comicvine.gamespot.com/api/characters/?api_key=" + mykey + "&filter=name:" + comicName + "&limit=100&format=json";
            
        //Boolean variable for character matching
        var charFound = false;

        //Boolean variable for publisher matching
        var isMarvel = false;

        //AJAX API call to ComicVine    
        $.ajax({
          url: proxy + queryURL,
          method: 'GET'
        }).done(function(response) {

            //This For loop goes through the array returned, targets the object property, name and checks if it matches with the user input string  
            for (var i = 0; i < response.results.length; i++) {
                
                var character = response.results[i];
            
                //Targets character key
                var characterName = character.name; 
                
                //Targets publisher key
                var characterPublisher = character.publisher;
                
                //Once a character is matched with the database, grab the
                var characterImage = character.image.original_url;
                
                //Targets publisher name key
                var publisherName = characterPublisher.name;   
                
                //Lower cases the returned string 
                var lcCharacterName = characterName.toLowerCase();
                
                //Lower cases the user input string
                var lcComicName = comicName.toLowerCase();
                
                //Assigns the response id value to originId
                var originId = response.results[i].id;

                //Checks current index name string matches with the user input string
                if (lcCharacterName === lcComicName) {     
                    //If they match, set charFound to true and break the loop
                    charFound = true;
                    break;
                }
            }
            
            //User input validation: if the user entry is not Marvel, display modal
            if (charFound) {
                 if (publisherName === "Marvel") {
                    isMarvel = true;
                }
                 else {
                   modal();
                }
                  // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCLHaKI6syAWKpwHmDPl9I5Ab-fQdjC1zY",
//     authDomain: "marveluserinterestlog.firebaseapp.com",
//     databaseURL: "https://marveluserinterestlog.firebaseio.com",
//     projectId: "marveluserinterestlog",
//     storageBucket: "",
//     messagingSenderId: "534432662754"
//   };

//   firebase.initializeApp(config);

//       var dataRef = firebase.database();
//     // Initial Values
//     var character = "";
//     var characterArray = [];
//     var arrayIndex = 0;

// // Capture Button Click
// // Code in the logic for storing and retrieving the most recent character.

//     $("#inputButton").on("click", function(event) {
//       event.preventDefault();
//       character = $("#characterInput").val().trim();
//       characterArray.push(character);
//       console.log("The character requested is:  " + character);
//       console.log("The characterArray is:  " + characterArray);

//       // Code for the push
//       dataRef.ref().push({
//         Character: character,
//       });

// // clear text-boxes
//       $("#characterInput").val("");
//     });

// // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
//     dataRef.ref().on("child_added", function(childSnapshot) {
//       // Log everything that's coming out of snapshot
//       console.log(childSnapshot.val().Character);

// // full list of trains to the well
//       $("#character-display").append(
//         "<div class='well'><span id='characterInput'> " + childSnapshot.val().Character + " </span></div>");

//     dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

// // Change the HTML to reflect
//   for (var i = 0; i < 9;  i++) {
//     document.getElementById("character-display").innerHTML = characterArray[i];
//     }
//         $("#character-display").text(snapshot.val().Character);
//     });

// // Prevents page from refreshing
//        return false;
//    });

            }

            //Once character is confirmed to be a Marvel character, display name, real name, description and image to DOC
            if (isMarvel) {
                $("#character_bio").html("<h5>Character Name: " + characterName + "</h5>" + 
                    "<h5>Character Real Name: " + character.real_name + 
                    "</h5>" + "<h5>Character Bio and Synopsis:</h5>" + "<p>" + character.description + "</p>");

                $(".slide1").html("<img class='img-responsive' src=" + characterImage + " width=400" + "></img>");
                $(".slide1").css("margin-left", "25%"); 
                $(".slide1").css("background-image", "url('../images/space_background_image_2.jpg");
                $(".slide2").html("<img class='img-responsive' src=" + characterImage + " width=400" + "></img>");
                $(".slide2").css("margin-left", "25%"); 
                $(".slide2").css("background-image", "url('../images/space_background_image_2.jpg");
                $(".slide3").html("<img class='img-responsive' src=" + characterImage + " width=400" + "></img>");
                $(".slide3").css("margin-left", "25%"); 
                $(".slide3").css("background-image", "url('../images/space_background_image_2.jpg");

            }//Closing if loop
        });//Closing promise
    });//Closing on click button function

//When the element is clicked, display name, real name, description and image to DOC
$(document).on("click", ".character", function() {
    
    //Take the value of the element clicked and assign it to characterVal
    var characterVal = $(this).attr("data-name");
    
    //Insert the API key and element value(characterVal) in to the Comic Vine API URL
    var queryURL2 = "https://comicvine.gamespot.com/api/characters/?api_key=" + mykey + "&filter=name:" + characterVal + "&limit=100&format=json";

//Initiate AJAX call
$.ajax({  //CORS 
          url: proxy + queryURL2,
          method: 'GET'
        }).done(function(response) {
                
                for (var i = 0; i < response.results.length; i++) {

                //Assign the first target in the array to character2       
                var character2 = response.results[i];
        
                //Assigns name property to variable
                var characterName2 = character2.name; 

                //Lower cases the characterName2
                var lcCharacterName2 = characterName2.toLowerCase();

                //Lower cases the value of the element  
                var lcComicName2 = characterVal.toLowerCase();
                
                //Once a character is matched with the database, grab the
                var characterImage2 = character2.image;

                //Some character objects do not have images. To avoid a null error, we assign characterImage a blank string  
                if (characterImage2 != null) {
                    var characterImage2 = characterImage2.original_url;
                }
                else {
                    var characterImage2 = "";
                }

                if (lcCharacterName2 === lcComicName2) {     
                    //If they match, set charFound to true and break the loop
                    charFound = true;
                    break;
                }
            }//Closing loop brace
                
                //Display name, real name, description and image to DOC
                $("#character_bio").html("<h5>Character Name: " + characterName2 + "</h5>" + 
                "<h5>Character Real Name: " + character2.real_name +
                "</h5>" + "<h5>Character Bio and Synopsis:</h5>" + "<p><h5>" + character2.description + "</h5></p>");
                
                $(".slide1").html("<img class='img-responsive' src=" + characterImage2 + " width=400" + "></img>");
                $(".slide1").css("margin-left", "25%"); 
                $(".slide1").css("background-image", "url('../images/space_background_image_2.jpg");
                $(".slide2").html("<img class='img-responsive' src=" + characterImage2 + " width=400" + "></img>");
                $(".slide2").css("margin-left", "25%"); 
                $(".slide2").css("background-image", "url('../images/space_background_image_2.jpg");
                $(".slide3").html("<img class='img-responsive' src=" + characterImage2 + " width=400" + "></img>");
                $(".slide3").css("margin-left", "25%"); 
                $(".slide3").css("background-image", "url('../images/space_background_image_2.jpg");
                // $("#video").empty();
                // $("#plot").empty();
       }

      );//Closing promise      
    });//Closing brace and parenthasis

// Javascript for Top 10 Marvel Movie drop-down click event

// Define variables

// High Resolution Movie Poster image array
var image = ["Hi Res Movie Posters/iron-man1.jpg", "Hi Res Movie Posters/Thor-Ragnarok.jpg", 
"Hi Res Movie Posters/Avengers1.jpg", "Hi Res Movie Posters/spiderman homecoming.jpg",
 "Hi Res Movie Posters/Guardians-of-the-Galaxy1.jpg", "Hi Res Movie Posters/captain_america_civil_war.jpg", 
 "Hi Res Movie Posters/doctor strange.jpg","Hi Res Movie Posters/captain america winter soldier.jpg",
 "Hi Res Movie Posters/guardians of the galaxy 2.jpg","Hi Res Movie Posters/ant-man1.jpg", "Hi Res Movie Posters/iron-man-3.jpg"];


// Event listener for all button elements
$(document).on("click", ".movies", function() {
    // In this case, the "this" keyword refers to the movie that was clicked
    var movieName = $(this).attr("data-movie");
    console.log(this);
    var movieYear = $(this).attr("data-year");
    console.log(this);
    var moviePoster = $(this).attr("data-index");
    console.log(this);
    var movieReview = $(this).attr("value");
    console.log(this);

    // Plug movieName and movieYear values into queryURL variable
    queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=marvel%2Bentertainment%2B" + movieName + "%2B" + movieYear + "%2Btrailer&key=AIzaSyB4rtuN_4efJMjoyz9Zm9ydFBijgFocjV4";


    // Plug queryURL into ajax call into YouTube API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Console log response object and console log videoId value
      console.log(response);
      console.log(response.items[0].id.videoId);

      // Capture value of videoId in variable
      var vidId = response.items[0].id.videoId;

      // Plug vidId into embed video source code and then write to inner html in video player div
      $('#video').html("<iframe class='embed-responsive-item'  src='https://www.youtube.com/embed/" + vidId + "' frameborder='0' allowfullscreen>");

      // Capture value of movie poster images in the image array 
      var hiRes = image[moviePoster];
      console.log(hiRes);

      // Dynamically create image attribute with repective movie poster in slide #1 of carousel
      $("#poster").html("<image class='img-responsive' src='" + hiRes + "' width='400px'>");
      
      // dynamically move movie poster image in carousel #1 25% to the left to center it
      $("#poster").css("margin-left", "25%");
      $("#poster").css("background-image", "url('../images/space_background_image_2.jpg");
      $("#video").css("background-image", "url('../images/space_background_image_2.jpg");
      // $("#character_bio").css("background-image", "url('../images/steel.jpg");
      });



    // Plug movieReview value into queryURL2 variable
    queryURL2 = "https://www.omdbapi.com/?t=" + movieReview + "&y=&plot=short&apikey=40e9cece";

    // Plug queryURL2 into ajax call to OMDB API
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).done(function(response) {

      // Console log response object and console log Plot value
      console.log(response);
      console.log(response.Plot);

      // Console log response values for movie critics and movie critic reviews from Ratings array
      console.log(response.Ratings[0].Source);
      console.log(response.Ratings[0].Value);

      // Capture value of plot, movie critics, and movie critic reviews into variables
      var synopsis = response.Plot;
      var critic0 = response.Ratings[0].Source;
      var critic1 = response.Ratings[1].Source;
      var critic2 = response.Ratings[2].Source;
      var ratings0 = response.Ratings[0].Value;
      var ratings1 = response.Ratings[1].Value;
      var ratings2 = response.Ratings[2].Value;

      // Dynamically create <p> and <br> elements to inner HTML in slide #3 of carousel
      $("#plot").html("<p class='text-warning'></p><br><p class='text-warning'></p><br><p></p>");

      // Dynamically fill <p> and <br> elements  with synopsis and movie review in from our variables
      $("#plot p:nth-child(1)").html("<h3 class='summary'>Synopsis:</h3> " + "<h5 class='summary'>" + synopsis + "</h5>");
      $("#plot p:nth-child(3)").html("<h3 class='summary'>Reviews:</h3> " + "<h5 class='summary'>" + critic0 + ":</h5>" + "<h5 class='summary'>" + ratings0 + 
        "</h5><br>" + "<h5 class='summary'>" + critic1 + ":</h5>" + "<h5 class='summary'>" + ratings1 + 
        "</h5><br>" + "<h5 class='summary'>" + critic2 + ":</h5>" + "<h5 class='summary'>" + ratings2 + "</h5>");

      // Increase the margin on the left and right of the <p> and <br> elements by 5%
      $("#plot").css("margin-left", "5%");
      $("#plot").css("margin-right", "5%");
      $("#plot").css("background-image", "url('../images/space_background_image_2.jpg");
      // $("aside").css("background-image", "url('../images/marvelwallpaper.jpg");
      $("aside").empty();
      $("aside").html("<h4 id='characterName'><p>Marvel started in 1939 as Timely Publications, and by the early 1950s, had generally become known as Atlas Comics. The Marvel branding began 1961, the year that the company launched The Fantastic Four and other superhero titles created by Stan Lee, Jack Kirby, Steve Ditko, and many others.</p><p>Marvel counts among its characters such well-known superheroes as Spider-Man, Wolverine, the Hulk, Thor, Iron Man, Captain America, Daredevil, and Iron Fist, including such teams as the Avengers, the X-Men, the Guardians of the Galaxy, and the Fantastic Four, and antagonists such as Venom, Doctor Doom, the Red Skull, the Green Goblin, Thanos, Ultron, Doctor Octopus, Magneto, Kang the Conqueror, Mystique, and Loki. Most of Marvel's fictional characters operate in a single reality known as the Marvel Universe, with most locations mirroring real-life places; many major characters are based in New York City.</p></h4>");

      
    });
  // 
})
});//Closing document ready