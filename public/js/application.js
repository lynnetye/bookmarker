$(document).ready(function() {

  // open full-menu and collapse to hidden-menu
  $(".hidden-menu").on("click", function(){
    var displayTabs = $(this).siblings(".tabs");
    displayTabs.toggle("hide");
  })

  // open individual bookmarks
  $(".tabs a").on("click", function(event){
    event.preventDefault();

    var keyTag = $(this).attr("id")
    var pageContainer = $(this).closest(".page-container");
    var matchingSection = pageContainer.find("div.bookmarks-content." + keyTag)
    var sectionContent = pageContainer.find("section.content");

    matchingSection.removeClass("hide")
    matchingSection.siblings().addClass("hide")
    sectionContent.removeClass("hide")
    $("#x").removeClass("hide")

    // closing the contents box
    $("#x").on("click", function(){
      sectionContent.addClass("hide")
    })
  })

  // submit forms to create new bookmarks
  $("form.add-bookmark").on("submit", function(event){
    event.preventDefault();

    var request = $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      data: $("form").serialize(),
      dataType: "json"
    })

    request.done(function(response){
      var name = response.name
      var url = response.url
      $(".your-bookmarks").append("<p><a href=" + url + ">" + name + "</a></p>");
    })
  })

});

