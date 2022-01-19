$(document).ready(() => {
  $("#tweet-text").on("input", () => {
    const tweetElement = $("#tweet-text");
    const tweetText = tweetElement.val();

    if (tweetText.length > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }

    $(".counter").val(140 - tweetText.length);
  });
});
