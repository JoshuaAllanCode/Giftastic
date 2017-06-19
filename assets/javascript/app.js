(function() {
 var movies = ["Fender Stratocaster", "Rolling Stones", "Red Rocks", "Elvis"];
      function displayMovieInfo() {
        var movie = $(this).attr("data-name");
        //Check API key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=5&offset=0";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#movies-view").empty()
          var movieDiv = $("<div class='gif-container'>");
          response.data.forEach(function(gifDatum) {
            var imageNode = $("<img class='pic'>");
            var stillUrl = gifDatum.images.fixed_height_still.url
            var animatedUrl = gifDatum.images.fixed_height.url
            imageNode.attr("src", stillUrl);
            imageNode.attr("data-still", stillUrl);
            imageNode.attr("data-animated", animatedUrl);
            movieDiv.append(imageNode);
          });
          $("#movies-view").prepend(movieDiv);
        });
      }
      function toggleGif() {
        var currentSource = $(this).attr('src');
        var stillSource = $(this).attr('data-still');
        var animatedSource = $(this).attr('data-animated');
        if ( stillSource === currentSource ) {
          $(this).attr('src', animatedSource);
        }
        else {
          $(this).attr('src', stillSource);
        }
      }
      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < movies.length; i++) {
          var a = $("<button>");
          a.addClass("movie");
          a.attr("data-name", movies[i]);
          a.text(movies[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        $("#movie-input").val('');
        movies.push(movie);
        renderButtons();
      });

      $(document).on("click", ".movie", displayMovieInfo);

      $(document).on('click', '.pic', toggleGif)

      renderButtons();
})();
