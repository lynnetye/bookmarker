$(document).ready(function() {

  // open full-menu and collapse to hidden-menu
  $(".hidden-menu").on("click", function(){
    var displayTabs = $(this).siblings(".tabs");
    displayTabs.toggle("hide");
  })

  // open bookmark content sections
  $(".tabs a").on("click", function(event){
    // event.preventDefault();

    var keyTag = $(this).attr("id")
    var pageContainer = $(this).closest(".page-container");
    var matchingSection = pageContainer.find("div.page-content." + keyTag)
    var sectionContent = pageContainer.find("section.content");

    // debugger
    // matchingSection.removeClass("hide")
    // matchingSection.siblings().addClass("hide")
    // sectionContent.removeClass("hide")
    // $("#x").removeClass("hide")

    // closing the contents box
    // $("#x").on("click", function(){
    //   sectionContent.addClass("hide")
    // })
  })

});