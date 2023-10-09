$(document).ready(function() {
  var omdbAPIKey = "9610d141";
  var searchBar = $("#search");
  var searchForm = $("#searchForm");

  var populateSearchResults = function(data) {
    $("#searchResults").removeClass("is-hidden");
    for (var i = 0; i < data.Search.length; i++) {
      $("div[data-index]").each(function() {
        if (Number($(this).attr("data-index")) === i) {
          $(this).children("a.resultTitle").text(data.Search[i].Title);
          $(this).children("p.resultYear").text(data.Search[i].Year);
          $(this).children("p.resultType").text(data.Search[i].Type);
          if (data.Search[i].Poster !== "N/A") {
            $(this).children("img").attr("src", data.Search[i].Poster);
          }
          $(this).attr("data-imdb-id", data.Search[i].imdbID);
        }
      })
    }
  }

  var searchAPI = function(searchInput) {
    var searchURL = "https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + searchInput

    fetch(searchURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        populateSearchResults(data);
      })
  }

  var showEntryDetails = function() {

  }

  searchForm.on("submit", function(event) {
    event.preventDefault();
    searchAPI(searchBar.val());
    searchBar.val("");
  })

})