$(document).ready(function() {
  var searchBar = $("#search");
  var searchForm = $("#searchForm");
  var selectEl = $("select");

  var displaySearchPage = function(searchInput) {
    if (selectEl.val() === "Any") {
      var searchResultsURL = "./search-results.html?s=" + searchInput;
    } else {
      var searchResultsURL = "./search-results.html?s=" + searchInput + "&type=" + selectEl.val();
    }

    location.assign(searchResultsURL);
  }

  searchForm.on("submit", function(event) {
    event.preventDefault();
    displaySearchPage(searchBar.val());
  });
});