// models/track.js
var db = require("../db");

var Track = db.model("Track", {
    title:      String,
    artist:     String,
    mp3:        Buffer,
    duration:   String,
    upvotes:    Number,
    comments:   [String],
    accolades:  [String]
});

module.exports = Track;