$(document).ready(function() {
  var omdbAPIKey = "9610d141";
  var searchBar = $("#search");
  var searchForm = $("#searchForm");
  var selectEl = $("select");

  var populateSearchResults = function(data) {
    $("#searchResults").removeClass("is-hidden");
    for (var i = 0; i < data.Search.length; i++) {
      $("div[data-index]").each(function() {
        if (Number($(this).attr("data-index")) === i) {
          $(this).removeClass("is-hidden");
          $(this).children("p.resultTitle").text(data.Search[i].Title);
          $(this).children("p.resultYear").text(data.Search[i].Year);
          $(this).children("p.resultType").text(data.Search[i].Type);
          if (data.Search[i].Poster !== "N/A") {
            $(this).children("img").attr("src", data.Search[i].Poster);
          } else {
            $(this).children("img").attr("src", "");
          };
          $(this).attr("data-imdb-id", data.Search[i].imdbID);
        };
      });
    };
  };

  var populateDetails = function(data) {
    $("#searchResults").addClass("is-hidden");
    $("#itemDetails").removeClass("is-hidden");
    $("#detailsTitle").text(data.Title);
    $("#detailsRated").text(data.Rated);
    $("#detailsReleaseDate").text(data.Released);
    $("#detailsRuntime").text(data.Runtime);
    $("#detailsGenre").text(data.Genre);
    $("#detailsDirector").text(data.Director);
    $("#detailsWriter").text(data.Writer);
    $("#detailsActors").text(data.Actors);
    $("#detailsPlot").text(data.Plot);
    $("#detailsAwards").text(data.Awards);
    $("#detailsBoxOffice").text(data.BoxOffice);
    if (data.Poster !== "N/A") {
      $("#detailsPoster").attr("src", data.Poster);
    }
  };

  var searchAPI = function(searchInput) {
    if (selectEl.val() === "Any") {
      var searchURL = "https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + searchInput;
    } else {
      var searchURL = "https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + searchInput + "&type=" + selectEl.val();
    }

    fetch(searchURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        populateSearchResults(data);
      })
  };

  var fetchDetails = function(id) {
    var titleURL = "https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&plot=full&i=" + id;

    fetch(titleURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        populateDetails(data);
      })
  };

  searchForm.on("submit", function(event) {
    event.preventDefault();
    searchAPI(searchBar.val());
    searchBar.val("");
    $("#searchResults").addClass("is-hidden");
    $("#itemDetails").addClass("is-hidden");
    $("div[data-index").addClass("is-hidden");
  });

  $(".result").on("click", function(event) {
    event.preventDefault();
    fetchDetails($(this).attr("data-imdb-id"))
  });

});