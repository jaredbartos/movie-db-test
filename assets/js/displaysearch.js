$(document).ready(function() {
  var omdbAPIKey = "9610d141";
  var searchBar = $("#search");
  var searchForm = $("#searchForm");
  var selectEl = $("select");

  var paramArray = location.search.split("&");

  if (paramArray.length === 1) {
    var title = paramArray[0].split("=").pop();
  } else if (paramArray.length === 2) {
    var title = paramArray[0].split("=").pop();
    var type = paramArray[1].split("=").pop();
  }



  var searchAPI = function() {
    if (!type) {
      var URL = "https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + title;
    } else {
      var URL = "https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + title + "&type=" + type;
    }

    fetch(URL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        populateSearchResults(data);
      })
  };

  var populateSearchResults = function(data) {
    $("#searchResults").removeClass("is-hidden");
    $("#searchHeader").text('Top results for "' + title.replaceAll("%20", " ") + '"');
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

  var displaySearchPage = function(searchInput) {
    if (selectEl.val() === "Any") {
      var searchResultsURL = "./search-results.html?s=" + searchInput;
    } else {
      var searchResultsURL = "./search-results.html?s=" + searchInput + "&type=" + selectEl.val();
    }

    location.assign(searchResultsURL);
  }

  searchAPI();

  var displayDetailsPage = function(id) {
    location.assign("./details.html?id=" + id)
  }


  
  $(".result").on("click", function(event) {
    event.preventDefault();
    displayDetailsPage($(this).attr("data-imdb-id"));
  });

  searchForm.on("submit", function(event) {
    event.preventDefault();
    displaySearchPage(searchBar.val());
  });
})