$(document).ready(function (){
  var $targetDiv = $('.network');

  $targetDiv.on('click', 'a.add-to-network', function (event){
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
          $removeLink = $(".page-content.network > section a.remove-from-network[user=" + user.id + "]"),
          $addLink = $(".page-content.network > section a.add-to-network[user=" + user.id + "]");

      $removeLink.removeClass('hide');
      $addLink.addClass('hide');
      $('.network-list').append("<li class=" + user.id + "><img src=" + image + "><p>" + name + "</p></li>");
    });
  });

  $targetDiv.on('click', 'a.remove-from-network', function (event){
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
          $removeLink = $(".page-content.network > section a.remove-from-network[user=" + user.id + "]"),
          $addLink = $(".page-content.network > section a.add-to-network[user=" + user.id + "]");

      $removeLink.addClass('hide');
      $addLink.removeClass('hide');
      $matchingLiElement.fadeOut();
    });
  });
});

function findFriends() {
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      FB.api('me/friends?fields=name,picture,birthday', function (response) {
        var allFacebookFriends = response.data;

        for (var i = 0; i < allFacebookFriends.length; i++ ){
          console.log(allFacebookFriends[i].picture.data.url);
          var request = $.ajax({
            url: '/update-facebook-friend',
            type: 'GET',
            data: { name: allFacebookFriends[i].name,
                    picture: allFacebookFriends[i].picture.data.url },
            dataTye: 'json'
          });

          request.done(function(response){
            var $fbSection = $('.facebook-friends'),
                $otherUsersSection = $('.find-other-users'),
                $articleClone = $('.network article.user-story').first().clone(),
                $userNameLink = $articleClone.find('a.user-name'),
                $removeButton = $articleClone.find('a.remove-from-network'),
                $addButton =  $articleClone.find('a.add-to-network'),
                userID = response.friend.id,
                status = response.already_in_network;

            $fbSection.removeClass('hide');
            $otherUsersSection.addClass('hide');
            $articleClone.find('img').attr('src', response.friend.image );
            $userNameLink.text(response.friend.name);
            $userNameLink.attr('href', "/network/" + userID);
            $removeButton.attr('href', '/network/remove/' + userID);
            $removeButton.attr('user', userID);
            $removeButton.addClass('hide');
            $addButton.attr('href', '/network/add/' + userID);
            $addButton.attr('user', userID);
            $addButton.addClass('hide');

            if ( status ) {
              $removeButton.removeClass('hide');
            } else {
              $addButton.removeClass('hide');
            }

            $articleClone.removeClass('hide');
            $articleClone.appendTo($fbSection);
          })
        }
      });
    }
  }, true);
};

function findOtherUsers() {
  var $otherUsersSection = $('div.find-other-users');

  $otherUsersSection.removeClass('hide');
  $otherUsersSection.siblings().addClass('hide');
};