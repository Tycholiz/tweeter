/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
  var $tweets = $('#tweets')

  function loadTweets() {
    $.getJSON('/tweets', function( tweets ) {
      $tweets.append(tweets.map(createTweetElement));
    });
  }
  loadTweets();

  function createTweetElement(tweet) {
    var $tweet = $( "<article>" ).addClass("tweet");
    var $tweetHeader = $( "<header>" ).addClass("tweet-header");
    var $tweetBody = $( "<div>" ).addClass("tweet-body");
    var $tweetFooter = $( "<footer>" ).addClass("tweet-footer");
    
    $tweet.append($tweetHeader);
    $tweetHeader.append( $( "<img class='twitter-pic' src=" + tweet.user.avatars.small + "></img>" ));
    $tweetHeader.append( $( "<h2 class='tweeter-name auto'>" + tweet.user.name + "</h2>" ));
    $tweetHeader.append( $( "<span class='tweeter-handle'>" + tweet.user.handle + "</span>" ));

    $tweet.append($tweetBody);
    $tweetBody.append( $( "<span class='tweet-text'>" + tweet.content.text + "</span>" ));

    $tweet.append($tweetFooter);
    $tweetFooter.append( $( "<span class='time-elapsed'>" + tweet.created_at + "</span>" ));
    
    var $tweetIcons = $('<div class="tweet-icons">');

    $tweetFooter.append($tweetIcons);
    $tweetIcons.append( $( "<i class='fas fa-flag'></i>" ));
    $tweetIcons.append( $( "<i class='fas fa-retweet'></i>" ));
    $tweetIcons.append( $( "<i class='fas fa-heart'></i>" ));
    return $tweet;
  }

  //Form submit handler
  $( 'form#tweet-form' ).on('submit', function(e) {
    var $appendPt = $( "#tweet-form" )  //this is what the error span attaches to
    var $textFieldLength = $( "#tweet-textbox" ).val().length;
    e.preventDefault();
    var serializedData = $(this).serialize();
    if ($textFieldLength > 0) {
      $( 'textarea#tweet-textbox' ).val('');
      $( '.error-msg' ).remove();
      $( '.counter' ).html('140');
    } else if ($textFieldLength < 1 && $('.error-msg').length === 0) {
      $appendPt.append( $( "<span class='error-msg'>You must enter some text</span>" ));
    } else {
      $( '.error-msg' ).remove();
      $appendPt.append( $( "<span class='error-msg'>You must enter some text</span>"))
    }
  });
});