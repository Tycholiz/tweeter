$(function() {
  $.delete = function(url, data, callback, type){
    if ( $.isFunction(data) ){
      type = type || callback,
          callback = data,
          data = {}
    }
    return $.ajax({
      url: url,
      type: 'DELETE',
      success: callback,
      data: data,
      contentType: type
    });
  }
  function timeSinceTweet(unixTime) { 
    var secondsElapsed = (Date.now() - unixTime) / 1000;
    var minutes = 0;
    var hours = 0;
    var days = 0;
    if (secondsElapsed > 86400) {
      days = Math.floor(secondsElapsed / 86400); 
      secondsElapsed -= (days * 86400)
    }
    if (secondsElapsed > 3600) {
      hours = Math.floor(secondsElapsed / 3600); 
      secondsElapsed -= (hours * 3600)
    }
    if (secondsElapsed => 60) {
      minutes = Math.floor(secondsElapsed / 60); 
      secondsElapsed -= (minutes * 60); 
    } 
    if (secondsElapsed < 5) {
      return "Just now";
    }
    if (secondsElapsed < 60) {
      secondsElapsed = Math.floor(secondsElapsed);
    }
    return `${days} days, ${hours} hours, ${minutes} minutes, ${secondsElapsed} seconds ago`;
  };

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  

  //this ajax infused function loadTweets() takes the JSON provided through the middleware (bottom of index.js), parses it, and performs a fn on all tweets
  var $tweets = $('#tweets')
  function loadTweets() {
    $.getJSON('/tweets', function( tweets ) { //getJSON goes to '/tweets' and creates a cb that executes when that data retrieval is successful.
      tweets.forEach(function(tweet) {
        $tweets.prepend(createTweetElement(tweet)); //this is where the magic happens, and each tweet is prepended onto the data stack in reverse order of its storage.
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

    $tweet.append($tweetBody);
    $tweetBody.append( $( "<span class='tweet-text'>" + escape(tweet.content.text) + "</span>" ));

    $tweet.append($tweetFooter);
    $tweetFooter.append( $( "<span class='time-elapsed'>" + timeSinceTweet(tweet.created_at) + "</span>" ));
    $tweetFooter.append( $( "<i class='fas fa-trash-alt delete-tweet' data-id='" + tweet._id + "'></i>" ));
    console.log("adding delete btn");
    var $tweetIcons = $('<div class="tweet-icons">');

    $tweetFooter.append($tweetIcons);
    $tweetIcons.append( $( "<i class='fas fa-flag share-icon'></i>" ));
    $tweetIcons.append( $( "<i class='fas fa-retweet share-icon'></i>" ));
    $tweetIcons.append( $( "<i class='fas fa-heart share-icon'></i>" ));
    return $tweet;
  }

  //Form submit handler
  $( '#tweet-form' ).on('submit', function(e) {
    e.preventDefault();
    var $appendPt = $( "#tweet-form" )  //this is what the error span attaches to
    var $textFieldLength = $( "#tweet-textbox" ).val().length;
    var serializedData = $(this).serialize();
    var removeErrorMsg = $( '.error-msg' ).remove();

    //this ajax request is the way that the front end is able to send info to the backend
    if ($textFieldLength > 0 && $textFieldLength <= 140) {
      $.post( "/tweets", serializedData, function( data ) {
        $( '#tweets' ).empty();
        loadTweets();
        $( '#tweet-textbox' ).val('');
        removeErrorMsg;
        $( '.counter' ).html('140').css( 'color', 'green' );  //why doesn't this work?!
      });

    } else if ($textFieldLength < 1) {
      removeErrorMsg;
      $appendPt.append( $( "<span class='error-msg'>You must enter some text</span>" ));
    } else if ($textFieldLength > 140) {
      removeErrorMsg;
      $appendPt.append( $( "<span class='error-msg'>Your tweet exceeds the maximum allowed length</span>" ));
    } else {
      removeErrorMsg;
      $appendPt.append( $( "<span class='error-msg'>You must enter some text</span>"));
    }
  });

  $( 'section#tweets' ).on('click', '.delete-tweet', function(e) { //why doesnt this work? b/c I am targeting multiple tweets with class="delete-tweet"?
    const $target = $(e.target);
    //var jsonData = JSON.stringify(tweetData);
     
    // http request in form of ajax quest**(?)
    // trying to pass in the string that is attached to the tweet box, where it will be used as a key to locate that user in the db. From there, the document will be deleted.
    $.ajax({
       url: "/tweets/" + $target.data('id'), //this sends a delete reqest to /tweets/:id (ie. the key attached to each tweet)
       type: "DELETE",
       success: function(callback) {
         $target.closest('.tweet').remove();
       }
    });
  });

  $( '#compose-btn' ).on( 'click', function(e) {
    $( '#tweet-textbox' ).blur();
    $( '.compose-tweet' ).slideToggle( "400" );
    if ($( '.compose-tweet' ).is(":visible") ) {
      $( '#tweet-textbox' ).focus();
    }
  });
});