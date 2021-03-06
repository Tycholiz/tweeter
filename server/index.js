"use strict";
const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


MongoClient.connect(MONGODB_URI, (err, db) => { 
  if (err) {
    console.error(`failed to connect: ${MONGODB_URI}`);
    throw err;      
  }

  console.log(`connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db); 
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);  //this mounts a middleware fn on /tweets path(where tweets are passed in from the server. 
});

app.listen(PORT, () => {
  console.log("Teleporting to the server, on port " + PORT);
});