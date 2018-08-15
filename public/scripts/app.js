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
    var $tweet = $("<article>").addClass("tweet");
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

  $( 'form#tweet-form' ).on('submit', function(e) {
    e.preventDefault();
    console.log( $( this ).serialize() );
    $( 'textarea#tweet-textbox' ).val('');
  });
});