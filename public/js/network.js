$(document).ready(function (){
  $('.add-to-network').on('click', function (event){
    event.preventDefault();
    var path = $(this).attr('href'),
        request = $.ajax({
          url: path,
          type: 'GET'
        });


    request.done(function (response){
      var user = response.user,
          id = user.id.toString(),
          image = user.image,
          name = user.name,
          $removeLink = $(".page-content.network > p > a.remove-from-network[user=" + user.id + "]"),
          $addLink = $(".page-content.network > p > a.add-to-network[user=" + user.id + "]");

      $removeLink.removeClass('hide');
      $addLink.addClass('hide');
      $('.network-list').append("<li class=" + user.id + "><img src=" + image + "><p>" + name + "</p></li>");
    });
  });

  $('.remove-from-network').on('click', function (event){
    event.preventDefault();
    var path = $(this).attr('href'),
        request = $.ajax({
          url: path,
          type: 'GET'
        });

    request.done(function(response){
      var user = response.user,
          id = user.id.toString(),
          $matchingLiElement = $(".network-list > li." + id),
          $removeLink = $(".page-content.network > p > a.remove-from-network[user=" + user.id + "]"),
          $addLink = $(".page-content.network > p > a.add-to-network[user=" + user.id + "]");

      $removeLink.addClass('hide');
      $addLink.removeClass('hide');
      $matchingLiElement.fadeOut();
    });
  });
});

function findFriends() {
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      FB.api('/me/friends', function (response) {
        debugger;
      });
    }
  }, true);
};

  // 100521266484588