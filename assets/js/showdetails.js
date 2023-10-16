$(document).ready(function() {
  var omdbAPIKey = "9610d141";
  var searchBar = $("#search");
  var searchForm = $("#searchForm");
  var selectEl = $("select");

  var id = location.search.split("=").pop();

  var displaySearchPage = function(searchInput) {
    if (selectEl.val() === "Any") {
      var searchResultsURL = "./search-results.html?s=" + searchInput;
    } else {
      var searchResultsURL = "./search-results.html?s=" + searchInput + "&type=" + selectEl.val();
    }

    location.assign(searchResultsURL);
  }

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

  var populateDetails = function(data) {
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

  fetchDetails(id);

  searchForm.on("submit", function(event) {
    event.preventDefault();
    displaySearchPage(searchBar.val());
  });
})
