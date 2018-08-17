/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  var $tweets = $('#tweets')

  function loadTweets() {
    $.getJSON('/tweets', function( tweets ) {
      // $tweets.append(tweets.map(createTweetElement));
      tweets.forEach(function(tweet) {
        $tweets.prepend(createTweetElement(tweet));
      });
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
    console.log(tweet.content.text);
    console.log(escape(tweet.content.text));
    $tweet.append($tweetBody);
    $tweetBody.append( $( "<span class='tweet-text'>" + escape(tweet.content.text) + "</span>" ));

    $tweet.append($tweetFooter);
    $tweetFooter.append( $( "<span class='time-elapsed'>" + tweet.created_at + "</span>" ));
    
    var $tweetIcons = $('<div class="tweet-icons">');

    $tweetFooter.append($tweetIcons);
    $tweetIcons.append( $( "<i class='fas fa-flag share-icon'></i>" ));
    $tweetIcons.append( $( "<i class='fas fa-retweet share-icon'></i>" ));
    $tweetIcons.append( $( "<i class='fas fa-heart share-icon'></i>" ));
    return $tweet;
  }

  //Form submit handler
  $( 'form#tweet-form' ).on('submit', function(e) {
    e.preventDefault();
    var $appendPt = $( "#tweet-form" )  //this is what the error span attaches to
    var $textFieldLength = $( "#tweet-textbox" ).val().length;
    var serializedData = $(this).serialize();

    if ($textFieldLength > 0 && $textFieldLength <= 140) {
      $.post( "/tweets", serializedData, function( data ) {
        $( '#tweets' ).empty();
        loadTweets();
      });

      $( 'textarea#tweet-textbox' ).val('');
      $( '.error-msg' ).remove();
      $( '.counter' ).html('140').css( 'color', 'black' );  //why doesn't this work?!
    } else if ($textFieldLength < 1 && $('.error-msg').length === 0) {
      $appendPt.append( $( "<span class='error-msg'>You must enter some text</span>" ));
    } else if ($textFieldLength > 140 && $('.error-msg').length === 0) {
      $appendPt.append( $( "<span class='error-msg'>Your tweet exceeds the maximum allowed length</span>" ));
    } else {
      $( '.error-msg' ).remove();
      $appendPt.append( $( "<span class='error-msg'>You must enter some text</span>"));
    }
  });

  $( '#compose-btn' ).on( 'click', function(e) {
    $( '.compose-tweet' ).slideToggle( "slow" );
    if ($( '.compose-tweet' ).is(":visible") ) {
      $( '#tweet-textbox' ).focus();
    }
  });
});