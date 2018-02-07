$(document).ready(function() {
console.log("document loaded");
 ///////////////////////////////////////////////////////////////////////////////   
    //Firebase login configuration
    //var mykey = config.MY_KEY;
    // var config = {
    // //add this to config file
    // apiKey: "AIzaSyAhZfs5SlwDWodFF3u5Y39BOHEb893u6Ts",
    // authDomain: "first-project-d4b8b.firebaseapp.com",
    // databaseURL: "https://first-project-d4b8b.firebaseio.com",
    // projectId: "first-project-d4b8b",
    // storageBucket: "first-project-d4b8b.appspot.com",
    // //add this to config file
    // messagingSenderId: "1099035937686"
    // };

    //Initialize the db instance
    // firebase.initializeApp(config);

    //Variable use to reference the database.
    // var database = firebase.database();

    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    // var connectionsRef = database.ref("characterCount");

    // var dummyData = {
    //     name: "Spiderman",
    //     count: 0
    // };

    // connectionsRef.push(dummyData);

    // '.info/connected' is a special location provided by Firebase that is updated every time
    // the client's connection state changes.
    // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
    // var connectedRef = database.ref(".info/connected");
    
    // function pushTo(charName) {
    //     firebase.database().ref().push({
    //     name: charName,
    //     count: characterCount++
    //   });
    // };

///////////////////////////////////////////////////////////////////////////////
    function modal() {
        $('#myModal').modal('show');
    }

    

    //Clicking on the submit button triggers the following... 
    $(document).on("click", "#inputButton", function() {
        
        //Prevents the document from reloading
        event.preventDefault();

        //Grab the API key from config
        var mykey = config.MY_KEY;
        //Store the user's string into comicName
        var comicName = $("#characterInput").val().trim();
        $("#characterInput").val("");
        // pushTo(charName);

        $("#characterInput").text("");

        var queryURL = "https://comicvine.gamespot.com/api/characters/?api_key=" + mykey + "&filter=name:" + comicName + "&limit=100&format=json";
            console.log(queryURL);

        var proxy = 'https://cors-anywhere.herokuapp.com/';
            
        //Boolean variable for character matching
        var charFound = false;

        //Boolean variable for publisher matching
        var isMarvel = false;

        //AJAX API call to ComicVine    
        $.ajax({
          url: proxy + queryURL,
          method: 'GET'
        }).done(function(response) {

            for (var i = 0; i < response.results.length; i++) {
                
                var character = response.results[i];
                console.log(response.results[i]);
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
                console.log(lcComicName);
                
                //Assigns the response id value to originId
                var originId = response.results[i].id;

                if (lcCharacterName === lcComicName) {     
                    charFound = true;
                    break;
                }
            }
            
            if (charFound) {
                 if (publisherName === "Marvel") {
                    isMarvel = true;
                }
                 else {
                   modal();
                }
            }
            // console.log(characterImage);
            if (isMarvel) {
                $("#character_bio").html("<h5>Character Name: " + characterName + "</h5>" + 
                    "<h5>Character Real Name: " + character.real_name + "</h5><h5>Birth Date: " + character.birth + 
                    "</h5>" + "<h5>Character Bio and Synopsis:</h5>" + "<p>" + character.description + "</p>");
                $(".slide1").html("<img src=" + characterImage + " height=" + 500 + " width=" + 806.25 + "></img>");
            }
        });
    });
});

$(document).on("click", ".character", function() {
   // In this case, the "this" keyword refers to the character that was clicked
    //Grab the API key from config
    var mykey2 = config.MY_KEY;
    var proxy2 = 'https://cors-anywhere.herokuapp.com/';
    var characterVal = $(this).attr("data-name");
    console.log($(this).attr("data-name"));
    var queryURL2 = "https://comicvine.gamespot.com/api/characters/?api_key=" + mykey2 + "&filter=name:" + characterVal + "&limit=100&format=json";
    console.log(queryURL2);
$.ajax({
          url: proxy2 + queryURL2,
          method: 'GET'
        }).done(function(response) {
            console.log(response);
            // for (var i = 0; i < response.results.length; i++) {
                // var comicName2 = "";

                // var charFound2 = false;
                var character2 = response.results[0];
                // console.log(response.results[0]);
                //Targets character key
                var characterName2 = character2.name; 
                
                //Once a character is matched with the database, grab the
                var characterImage2 = character2.image.original_url;
                
                //Lower cases the returned string 
                // var lcCharacterName2 = characterName2.toLowerCase();
                
                //Lower cases the user input string
                // var lcComicName2 = comicName2.toLowerCase();
                // console.log(lcComicName2);

                // if (lcCharacterName2 === lcComicName2) {     
                //     charFound2 = true;
                //     break;
                // }
            // }

            // if (charFound2) {
                $("#character_bio").html("<h5>Character Name: " + characterName2 + "</h5>" + 
                "<h5>Character Real Name: " + character2.real_name + "</h5><h5>Birth Date: " + character2.birth + 
                "</h5>" + "<h5>Character Bio and Synopsis:</h5>" + "<p>" + character2.description + "</p>");
                $(".slide1").html("<img src=" + characterImage2 + " height=" + 500 + " width=" + 806.25 + "></img>");
            // }  
        });      
    });//Closing brace and parenthasis
// }
//ALTERNATIVE ALIAS CODE
// console.log(lcComicName);
            // var characterAlias = response.results[i].aliases;    

            // var lcCharacterAlias = characterAlias.toLowerCase();

            // var enter = '\n';

            // var arrayOfAlias = lcCharacterAlias.split(enter);
            
            // var index = arrayOfAlias.indexOf(comicName);