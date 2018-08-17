"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

//The IP address it is using here (MONGODB_URI) is that of the localhost. This means that our Mongo server can run on another server and we would put in that machine's IP address into the connection string. Of course, normally Mongo is running on a different machine.
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`failed to connect: ${MONGODB_URI}`);
    throw err;      
  }

  // ==> We have a connection to the "test-tweets" db, starting here
  console.log(`connected to mongodb: ${MONGODB_URI}`);

  function getTweets(callback) {
    //get all the tweets (in Mongo-speak, 'find' them) and put them in an array
    db.collection("tweets").find().toArray(callback);
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });   
});

//At this point we have interfaced a Node.js script with our local Mongo server. The script is the client, behaving much like the shell and requesting information from Mongo which plays the role of the server.