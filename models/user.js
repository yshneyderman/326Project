// models/user.js
var db = require("../db");

var User = db.model("User", {
    username:      String,
    password:      String,
    uploads:       [String]
});

module.exports = User;