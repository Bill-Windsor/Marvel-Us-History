// Javascript for Top 10 Marvel Movie drop-down click event

// Define variables

// High Resolution Movie Poster image array
var image = ["Hi Res Movie Posters/iron-man1.jpg", "Hi Res Movie Posters/Thor-Ragnarok.jpg", 
"Hi Res Movie Posters/Avengers1.jpg", "Hi Res Movie Posters/spiderman homecoming.jpg",
 "Hi Res Movie Posters/Guardians-of-the-Galaxy1.jpg", "Hi Res Movie Posters/captain_america_civil_war.jpg", 
 "Hi Res Movie Posters/doctor strange.jpg","Hi Res Movie Posters/captain america winter soldier.jpg",
 "Hi Res Movie Posters/guardians of the galaxy 2.jpg","Hi Res Movie Posters/ant-man1.jpg"];


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
      $('#video').html("<iframe width='825' height='532' src='https://www.youtube.com/embed/" + vidId + "' frameborder='0' allowfullscreen>");

      // Capture value of movie poster images in the image array 
      var hiRes = image[moviePoster];
      console.log(hiRes);

      // Dynamically create image attribute with repective movie poster in slide #1 of carousel
      $("#poster").html("<image src='" + hiRes + "' width='350px'>");
      
      // dynamically move movie poster image in carousel #1 30% to the left to center it
      $("#poster").css("margin-left", "30%");
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
      $("#plot").html("<p></p><br><p></p><br><p></p>");

      // Dynamically fill <p> and <br> elements  with synopsis and movie review in from our variables
      $("#plot p:nth-child(1)").html("<h3>Synopsis:</h3> " + synopsis + "");
      $("#plot p:nth-child(3)").html("<h3>Reviews:</h3> " + "<h5>" + critic0 + ":</h5>" + "<h5>" + ratings0 + 
        "</h5><br>" + "<h5>" + critic1 + ":</h5>" + "<h5>" + ratings1 + 
        "</h5><br>" + "<h5>" + critic2 + ":</h5>" + "<h5>" + ratings2 + "</h5>");

      // Increase the margin on the left and right of the <p> and <br> elements by 5%
      $("#plot").css("margin-left", "5%");
      $("#plot").css("margin-right", "5%");
      
      
    });
  // 
})