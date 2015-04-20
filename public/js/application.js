$(document).ready(function() {

  $(".tabs > a").on("click", function(event){
    event.preventDefault();
    var keyTag = $(this).attr("id")
    var matchingSection = $(this).closest("section.container").find("div.bookmarks-content." + keyTag)
    matchingSection.removeClass("hide")
    matchingSection.siblings().addClass("hide")
  })


});

cp ~/Downloads/gplaypattern/. ~/projects/mini-apps/bookmarker/