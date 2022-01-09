const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  console.log(tweet.created_at);
  const created_at = timeago.format(tweet.created_at);
  const $tweetElement = `
  <article class="tweet">
  <div class="tweet-header">
    <div class="profile">
      <img src=${tweet.user.avatars}>
      <p>${tweet.user.name}</p>
    </div>

    <div>
      <p class="tweet-handle">${tweet.user.handle}</p>

    </div>
  </div>

  <div class="tweet-body">
    <p>${escape(tweet.content.text)}</p>
    <div class="tweet-body-border">

    </div>
  </div>
  <div class="tweet-footer">
    <div>${created_at}</div>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>

  </div>
</article>`;

  return $tweetElement;
};

const renderTweets = function (tweets) {
  console.log("Tweets", tweets);
  tweets.forEach((element) => {
    $(".tweet-container").append(createTweetElement(element));
  });
};

$(document).ready(() => {
  loadTweets();

  $("form").submit((event) => {
    console.log($("form").serialize());
    event.preventDefault();
    console.log($("#tweet-text").val().length);
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $(".err-msg").slideDown();
      $(".err-msg").html("<span>** No Text Provided! **</span>");
    }
    if ($("#tweet-text").val().length > 140) {
      $(".err-msg").slideDown();
      $(".err-msg").html("<span>Sorry! Characters Exceed 140");
      return false;
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $("form").serialize(),
      success: function (response) {
        $("#tweet-text").val("");
        console.log("It Tweeted!");
        $(".tweet-container").empty();
        loadTweets();
      },
    });
  });

  function loadTweets() {
    $.get("/tweets", function (data, status) {
      console.log("LoadTweetData", data);
      renderTweets(data.reverse());
    });
  }
});
