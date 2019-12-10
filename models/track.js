// models/track.js
var db = require("../db");

var Track = db.model("Track", {
    title:      String,
    artist:     String,
    duration:   String,
    mp364:      String,
    upvotes:    Number,
    comments:   [String],
    accolades:  [String],
    ratings:    [Number],
    score:      Number
});

module.exports = Track;