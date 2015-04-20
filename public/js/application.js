$(document).ready(function() {

  // open full-menu and collapse to hidden-menu
  $(".hidden-menu").on("click", function(){
    // debugger
    var displayTabs = $(this).siblings(".tabs");
    displayTabs.toggle("hide");
  })

  // open individual bookmarks
  $(".tabs a").on("click", function(event){
    event.preventDefault();

    var keyTag = $(this).attr("id")
    var pageContainer = $(this).closest(".page-container");
    var matchingSection = pageContainer.find("div.bookmarks-content." + keyTag)
    matchingSection.removeClass("hide")
    matchingSection.siblings().addClass("hide")
  })


});

