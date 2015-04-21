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



  function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
      // Update the app to reflect a signed in user
      // Hide the sign-in button now that the user is authorized, for example:
      document.getElementById('signinButton').setAttribute('style', 'display: none');
    } else {
      // Update the app to reflect a signed out user
      // Possible error values:
      //   "user_signed_out" - User is signed-out
      //   "access_denied" - User denied access to your app
      //   "immediate_failed" - Could not automatically log in the user
      console.log('Sign-in state: ' + authResult['error']);
    }
  }

});