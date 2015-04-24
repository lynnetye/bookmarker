$(document).ready(function () {
  var $editBookmarkActions = $('.bookmark-action-edit'),
      $bookmarkNameInputs = $('.bookmark-name-input'),
      originalBookmarkNames = {};

  // when edit action is clicked, display input
  $editBookmarkActions.on('click', function () {
    var $parentBookmark = $(this).closest('.bookmark');
        $bookmarkNameInput = $(this).siblings('.bookmark-name-input'),
        bookmarkID = $(this).closest('[data-bookmark-id]').attr('data-bookmark-id'),
        bookmarkName = $(this).siblings('.bookmark-name-link').text(),
        $bookmarkEditLink = $(this);

    originalBookmarkNames[bookmarkID] = bookmarkName;
    $parentBookmark.addClass('editting');
    $bookmarkNameInput.select();
  });

  // hide input when escape is pressed
  // hide and submit when enter is pressed
  $bookmarkNameInputs.on('keydown', function (event) {
    var $parentBookmark = $(this).closest('.bookmark'),
        $bookmarkNameLink = $(this).siblings('.bookmark-name-link'),
        bookmarkID = $(this).closest('[data-bookmark-id]').attr('data-bookmark-id'),
        $this = $(this),
        request;

    if (event.keyCode === 27) {
      $this.val(originalBookmarkNames[bookmarkID]);
      $parentBookmark.removeClass('editting');
    } else if (event.keyCode === 13) {
      request = $.ajax({
        url: '/bookmarks/' + bookmarkID,
        type: 'PUT',
        data: { name: $(this).val() },
        dataType: 'json'
      });

      request.done(function (response) {
        var bookmark = response.bookmark;

        $bookmarkNameLink.text(bookmark.name);
        $parentBookmark.removeClass('editting');
      });
    };
  });
});