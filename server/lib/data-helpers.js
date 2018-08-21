"use strict";
const ObjectId = require('mongodb').ObjectID;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db` (C)
    saveTweet: function(newTweet, callback) {
      db.collection("tweeter").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first (R)
    getTweets: function(callback) {
      db.collection("tweeter").find().toArray(callback);
    },

    //Delete single tweet from `db` (D)
    deleteTweet: function(id, callback) {
      console.log("datahelpers", id);
      db.collection("tweeter").deleteOne({"_id": ObjectId(id)}, callback);
    }
  }
};
