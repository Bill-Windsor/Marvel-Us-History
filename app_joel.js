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
            }

            //Once character is confirmed to be a Marvel character, display name, real name, description and image to DOC
            if (isMarvel) {
                $("#character_bio").html("<h5>Character Name: " + characterName + "</h5>" + 
                    "<h5>Character Real Name: " + character.real_name + 
                    "</h5>" + "<h5>Character Bio and Synopsis:</h5>" + "<p>" + character.description + "</p>");
                $(".slide1").html("<img src=" + characterImage + " height=" + 500 + " width=" + 806.25 + "></img>");
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
                
                //Assign the first target in the array to character2       
                var character2 = response.results[0];
        
                //Targets character key
                var characterName2 = character2.name; 
                
                //Once a character is matched with the database, grab the
                var characterImage2 = character2.image.original_url;
                
                //Display name, real name, description and image to DOC
                $("#character_bio").html("<h5>Character Name: " + characterName2 + "</h5>" + 
                "<h5>Character Real Name: " + character2.real_name +
                "</h5>" + "<h5>Character Bio and Synopsis:</h5>" + "<p>" + character2.description + "</p>");
                $(".slide1").html("<img src=" + characterImage2 + " height=" + 500 + " width=" + 806.25 + "></img>"); 
        });//Closing promise      
    });//Closing brace and parenthasis
});//Closing document ready