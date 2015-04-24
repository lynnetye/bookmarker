$(document).ready(function () {
  var $editBookmarkActions = $('.bookmark-action-edit'),
      $deleteBookmarkActions = $('.bookmark-action-delete'),
      $bookmarkNameAndUrlInputs = $('.bookmark-name-input, .bookmark-url-input'),
      originalBookmarkNames = {};
      originalBookmarkUrls = {};

  // when delete action is clicked, delete bookmark
  $deleteBookmarkActions.on('click', function () {
    var $bookmarkDeleteLink = $(this),
        $parentBookmark = $bookmarkDeleteLink.closest('.bookmark'),
        bookmarkID = $bookmarkDeleteLink.closest('[data-bookmark-id]').attr('data-bookmark-id'),
        request = $.ajax({
          url: '/bookmarks/' + bookmarkID,
          type: 'DELETE'
        });

    request.done(function (response) {
      var bookmarkID = response.id,
        bookmarkToDelete = $(".bookmark[data-bookmark-id=" + bookmarkID + "]");
        bookmarkToDelete.fadeOut();
    });

  });

  // when edit action is clicked, display input
  $editBookmarkActions.on('click', function () {
    var $bookmarkEditLink = $(this),
        $parentBookmark = $bookmarkEditLink.closest('.bookmark'),
        $bookmarkNameInput = $bookmarkEditLink.siblings('.bookmark-name-input'),
        bookmarkID = $bookmarkEditLink.closest('[data-bookmark-id]').attr('data-bookmark-id'),
        bookmarkUrl = $bookmarkEditLink.closest('[data-bookmark-url]').attr('data-bookmark-url'),
        bookmarkName = $bookmarkEditLink.siblings('.bookmark-name-link').text();

    originalBookmarkNames[bookmarkID] = bookmarkName;
    originalBookmarkUrls[bookmarkID] = bookmarkUrl;
    $parentBookmark.addClass('editing');
    $bookmarkNameInput.select();
  });

  // hide input when escape is pressed
  // hide and submit when enter is pressed
  $bookmarkNameAndUrlInputs.on('keydown', function (event) {
    var $bookmarkNameInput = $(this).closest(".bookmark").find(".bookmark-name-input"),
        $bookmarkUrlInput = $(this).closest(".bookmark").find(".bookmark-url-input"),
        $parentBookmark = $(this).closest('.bookmark'),
        name = $parentBookmark.find(".bookmark-name-input").val(),
        url = $parentBookmark.find(".bookmark-url-input").val(),
        $bookmarkNameLink = $parentBookmark.find('.bookmark-name-link'),
        $bookmarkUrlLink = $parentBookmark.find('.bookmark-url-link'),
        bookmarkID = $bookmarkNameInput.closest('[data-bookmark-id]').attr('data-bookmark-id'),
        request;

    if (event.keyCode === 27) {
      $bookmarkNameInput.val(originalBookmarkNames[bookmarkID]);
      $bookmarkUrlInput.val(originalBookmarkUrls[bookmarkID]);
      $parentBookmark.removeClass('editing');
    } else if (event.keyCode === 13) {
      request = $.ajax({
        url: '/bookmarks/' + bookmarkID,
        type: 'PUT',
        data: { name: name, url: url },
        dataType: 'json'
      });

      request.done(function (response) {
        var bookmark = response.bookmark;

        $bookmarkNameLink.text(bookmark.name);
        $bookmarkUrlLink.text(bookmark.url);
        $parentBookmark.removeClass('editing');
      });
    };
  });
});