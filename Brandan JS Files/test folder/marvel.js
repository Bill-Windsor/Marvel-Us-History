// Psuedo code for movie drop-down click event

// Define variables
var image = ["Hi Res Movie Posters/iron-man1.jpg", "Hi Res Movie Posters/Thor-Ragnarok.jpg", 
"Hi Res Movie Posters/Avengers1.jpg", "Hi Res Movie Posters/spiderman homecoming.jpg",
 "Hi Res Movie Posters/Guardians-of-the-Galaxy1.jpg", "Hi Res Movie Posters/captain_america_civil_war.jpg", 
 "Hi Res Movie Posters/doctor strange.jpg","Hi Res Movie Posters/captain america winter soldier.jpg",
 "Hi Res Movie Posters/guardians of the galaxy 2.jpg","Hi Res Movie Posters/ant-man1.jpg"];

// var movieOrder = ["movie1", "movie2", "movie3", "movie4", "movie5", "movie6", "movie7", "movie8", "movie9", "movie10"];

// Event listener for all button elements
$(document).on("click", ".movies", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var movieName = $(this).attr("data-movie");
    console.log(this);
    var movieYear = $(this).attr("data-year");
    console.log(this);
    var moviePoster = $(this).attr("data-index");
    console.log(this);

// // When movie link is clicked, initiate function
// $(".movies").on("click", function() {
	// Select movieName and movieYear values of element and save as variables
	// var movieName = $(".movies").data("movie");
 //  var movieYear = $(".movies").data("year");
 //  var moviePoster = $(".movies").data("index");
  


    // queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=marvel%2Bentertainment%2Bant-man%2B2015%2Btrailer&key=AIzaSyB4rtuN_4efJMjoyz9Zm9ydFBijgFocjV4";

    // Plug movieName and movieYear into queryUrl variable
    queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=marvel%2Bentertainment%2B" + movieName + "%2B" + movieYear + "%2Btrailer&key=AIzaSyB4rtuN_4efJMjoyz9Zm9ydFBijgFocjV4";


    // Plug queryURL into ajax call
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
      $('#video').html("<iframe width='900' height='580' src='https://www.youtube.com/embed/" + vidId + "' frameborder='0' allowfullscreen>");

      // 
      var hiRes = image[moviePoster];
      console.log(hiRes);

      // 
      $("#poster").html("<image src='" + hiRes + "' width='350px'>");
      $("#poster").css("margin", "0 auto");

      // Capture
      // var movieDiv = $('<div class="movieDiv">');

      // var image = $('<img>').attr("src", response.Poster);
      //           movieDiv.append(image);
    
    });
	// 
})