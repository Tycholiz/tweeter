/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
    function createTweetElement(tweet) {
        var $tweet = $("<article>").addClass("tweet");
        var $tweetHeader = $( "<header>" ).addClass("tweet-header");
        var $tweetBody = $( "<div>" ).addClass("tweet-body");
        var $tweetFooter = $( "<footer>" ).addClass("tweet-footer");

        $( "main.container" ).append($tweet).addClass("tweet");

        $( "article.tweet" ).append($tweetHeader);
        $( "header.tweet-header" ).append( $( "<img class='twitter-pic' src=" + tweet.user.avatars.small + "></img>" ));
        $( "header.tweet-header" ).append( $( "<h2 class='tweeter-name'>" + tweet.user.name + "</h2>" ));
        $( "header.tweet-header" ).append( $( "<span class='tweeter-handle'>" + tweet.user.handle + "</span>" ));

        $( "article.tweet" ).append($tweetBody);
        $( "div.tweet-body" ).append( $( "<span class='tweet-text'>" + tweet.content.text + "</span>" ));

        $( "article.tweet" ).append($tweetFooter);
        $( "footer.tweet-footer" ).append( $( "<span class='time-elapsed'>" + tweet.created_at + "</span>" ));
        $( "footer.tweet-footer" ).append( $( "<div class='tweet-icons'></div>" ));
        $( ".tweet-icons" ).append( $( "<i class='fas fa-flag'></i>" ));
        $( ".tweet-icons" ).append( $( "<i class='fas fa-retweet'></i>" ));
        $( ".tweet-icons" ).append( $( "<i class='fas fa-heart'></i>" ));

    }
    const tweetData = {
        "user": {
          "name": "Newton",
          "avatars": {
            "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
          },
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      }
      
      var $tweet = createTweetElement(tweetData);
      console.log($tweet);
});