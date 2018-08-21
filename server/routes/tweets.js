"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  //this get route will receive tweets
  //this route handler calls DataHelpers.getTweets()
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  //this get route will create new tweets
  //this route handler calls DataHelpers.saveTweet()
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    //This is the connection b/w backend and frontend. The existing tweet data ends its existence in the server here. From here on, the data is available to the front end code.  
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.delete("/:id", function(req, res) {
    var collectionID = req.url.slice(1);
    DataHelpers.deleteTweet(collectionID, () => {
      res.status(200).send();
    });
  });

  return tweetsRoutes;
}
