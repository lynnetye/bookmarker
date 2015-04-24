$(document).ready(function () {
  var $editBookmarkActions = $('.bookmark-action-edit'),
      $bookmarkNameInputs = $('.bookmark-name-input'),
      originalBookmarkNames = {};

  // when edit action is clicked, display input
  $editBookmarkActions.on('click', function () {
    var $bookmarkNameInput = $(this).siblings('.bookmark-name-input'),
        $bookmarkNameLink = $(this).siblings('.bookmark-name-link'),
        $bookmarkEditLink = $(this),
        bookmarkID = $(this).closest('[data-bookmark-id]').attr('data-bookmark-id'),
        bookmarkName = $(this).siblings(".bookmark-name-link").text();

    originalBookmarkNames[bookmarkID] = bookmarkName;

    $bookmarkNameInput.css({'display': 'inline-block'}).select();
    $bookmarkNameLink.css({'display': 'none'});
    $bookmarkEditLink.css({'display': 'none'});
  });

  // hide input when escape is pressed
  // hide and submit when enter is pressed
  $bookmarkNameInputs.on('keydown', function (event) {
    var $bookmarkNameInput = $(this).siblings('.bookmark-name-input'),
        $bookmarkNameLink = $(this).siblings('.bookmark-name-link'),
        $bookmarkEditLink = $(this).siblings('.bookmark-action-edit'),
        bookmarkID = $(this).closest('[data-bookmark-id]').attr('data-bookmark-id'),
        $this = $(this),
        request;

    if (event.keyCode === 27) {
      $this.val(originalBookmarkNames[bookmarkID]);
      $this.css({'display': 'none'});
      $bookmarkNameLink.css({'display': 'inline-block'});
      $bookmarkEditLink.css({'display': 'inline-block'});
    } else if (event.keyCode === 13) {
      request = $.ajax({
        url: '/bookmarks/' + bookmarkID,
        type: "PUT",
        data: { name: $(this).val() },
        dataType: 'json'
      });

      request.done(function (response) {
        var bookmark = response.bookmark;

        $bookmarkNameLink.text(bookmark.name);
        $this.css({'display': 'none'});
        $bookmarkNameLink.css({'display': 'inline-block'});
        $bookmarkEditLink.css({'display': 'inline-block'});
      });
    };
  });
});