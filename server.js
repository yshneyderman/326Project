let express = require("express");
let bodyParser = require("body-parser");
let mustacheExpress = require('mustache-express');
let Track = require("./models/track");
let User = require("./models/user");
let user = "Admin";

const mm = require('music-metadata');
const util = require('util');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const fs = require('fs');

let app = express();

const router = express.Router();

// This will allow the router to parse both json and form data.
router.use(bodyParser.json());

// This will use the static middleware
router.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Register '.mustache' extension with Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', 'views');

// Error message variable to be used to pass along 
// information to subsequent route if an error happens.
let error = '';

app.get("/", (req, res) => {
  if(user === "Admin"){
    res.redirect("http://localhost:3003");
  }
  else{
    Track.find((err, tracks) => {
      let view = { tracks , errormsg : error, user};
      res.render('track', view);
      error = '';
    }).sort({ "upvotes": "desc" });
  }
});

app.post("/upvote", (req, res) => {
  let title = req.body.title;
  Track.findOne({ title : title }, function(err, tracks){
    tracks.upvotes += 1;
    tracks.markModified('upvotes');
    tracks.save(function () {
      Track.find((err, tracks) => {
        let view = { tracks , errormsg : error, user};
        res.render('track', view);
        error = '';
      }).sort({ "upvotes": "desc" });
    });
    error = '';
  });
});

app.post("/search", (req, res) => {
  let title = req.body.title;  
  if(title === ""){
    Track.find((err, tracks) => {
      let view = { tracks , errormsg : error, user};
      res.render('track', view);
      error = '';
    }).sort({ "upvotes": "desc" });
  }
  else{
    Track.find({ title : title }, (err, tracks) => {
      let view = { tracks , errormsg : error, user};
      res.render('track', view);
      error = '';
    }).sort({ "upvotes": "desc" });
  }
});

app.listen(3000, () => {
  console.log('Explore Page Running.');
});


let app2 = express();

app2.use(bodyParser.urlencoded({ extended: false }));
app2.use(express.static("public"));

// Register '.mustache' extension with Mustache Express
app2.engine('mustache', mustacheExpress());
app2.set('view engine', 'mustache');
app2.set('views', 'views');

// Error message variable to be used to pass along 
// information to subsequent route if an error happ2ens.
let error2 = '';

app2.get("/", (req, res) => {
  if(user === "Admin"){
    res.redirect("http://localhost:3003");
  }
  else{
    Track.find((err, tracks) => {
      let view = { tracks , errormsg : error2, user};
      res.render('home', view);
      error = '';
    });
  }
});


app2.listen(3001, () => {
  console.log('Home Page Running.');
});

let app3 = express();

app3.use(bodyParser.urlencoded({ extended: false }));
app3.use(express.static("public"));

// Register '.mustache' extension with Mustache Express
app3.engine('mustache', mustacheExpress());
app3.set('view engine', 'mustache');
app3.set('views', 'views');

// Error message variable to be used to pass along 
// information to subsequent route if an error happ3ens.
let error3 = '';
let tra;

app3.post("/create", upload.single('mp3'), (req, res, next) => {
  // Create a track from the submitted form data
  let loc = 'uploads/' + req.file.filename;
  var filething = fs.readFileSync(loc);
  let dur = 0;
  let sixFour = filething.toString('base64');
  mm.parseBuffer(filething, 'audio/mp3')
  .then( metadata => {
    util.inspect(metadata, { showHidden: false, depth: null });
    dur = Math.floor(metadata.format.duration);
    let minutes = Math.floor(dur/60);
    let seconds = Math.floor(dur - (minutes*60));
    if(seconds < 10){
      dur = minutes.toString() + ":0" + seconds.toString();
    }
    else{
      dur = minutes.toString() + ":" + seconds.toString();
    }
    tra = new Track({
      title: req.body.title,
      artist: user,
      duration: dur,
      mp364: sixFour,
      upvotes: 0
  });

  tra.save((err, tra) => {
      if (err) {
          res.status(400).send(err);
      } else {            
          res.redirect('/');
      }
  });
   });
   try {
    fs.unlinkSync(loc);
    //file removed
  } catch(err) {
    console.error(err);
  }  
});

app3.get("/", (req, res) => {
  if(user === "Admin"){
    res.redirect("http://localhost:3003");
  }
  else{
    Track.find((err, tracks) => {
      let view = { tracks , errormsg : error3, user};
      res.render('add', view);
      error = '';
    });
  }
});

app3.listen(3002, () => {
  console.log('Add Page Running.');
});

let app4 = express();

app4.use(bodyParser.urlencoded({ extended: false }));
app4.use(express.static("public"));

// Register '.mustache' extension with Mustache Express
app4.engine('mustache', mustacheExpress());
app4.set('view engine', 'mustache');
app4.set('views', 'views');

// Error message variable to be used to pass along 
// information to subsequent route if an error happens.
let error4 = 'Invalid Login';
let error7 = 'Password Must Match';
let error8 = 'Username Already Exists';

app4.get("/", (req, res) => {
  Track.find((err, tracks) => {
    let view = { tracks};
    res.render('login', view);
    error = '';
  });
});

app4.post("/signup", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let confpassword = req.body.confpassword;

  User.findOne({ username : username }, (err, users) => {
    if(users !== null){
      let view = {errormsg : error8};
      res.render('login', view);  
    }
    if(confpassword !== password){
      let view = {errormsg : error7};
      res.render('login', view);  
    }
    else if(username === "" || password === ""){
      let view = {errormsg : error4};
      res.render('login', view);  
    }
    else
    {
      //success
      user = username;
      usr= new User({
        username: username,
        password: password
      });
  
      usr.save((err, usr) => {
        if (err) {
            res.status(400).send(err);
            res.render('login', view); 
        } else {            
            res.redirect("http://localhost:3001");
        }
      });
    }
  });

  
});

app4.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if(username === "" || password === ""){
    let view = {errormsg : error4};
    res.render('login', view);  
  }
  else{
    User.findOne({ username : username }, (err, users) => {
      if(users === null){
        let view = {errormsg : error4};
        res.render('login', view);  
      }
      else{
        if(users.password === password){
          user = username;
          res.redirect("http://localhost:3001");
        }
        else{
          let view = {errormsg : error4};
          res.render('login', view);  
        }
      }
    });
  }
});


app4.listen(3003, () => {
  console.log('Login Page Running.');
  console.log('Visit http://localhost:3003 in your favorite browser.');
});

let app5 = express();

app5.use(bodyParser.urlencoded({ extended: false }));
app5.use(express.static("public"));

// Register '.mustache' extension with Mustache Express
app5.engine('mustache', mustacheExpress());
app5.set('view engine', 'mustache');
app5.set('views', 'views');

// Error message variable to be used to pass along 
// information to subsequent route if an error happ3ens.
let error5 = '';

app5.get("/", (req, res) => {
  if(user === "Admin"){
    res.redirect("http://localhost:3003");
  }
  else{
    Track.find({ artist : user }, (err, tracks) => {
      let view = { tracks , errormsg : error5, user};
      res.render('account', view);
      error = '';
    });
  }
});

app5.post('/remove', (req, res) => {
  let t = req.body.title;  
  Track.remove({artist : user, title: t}, (err) => {
    if (err) {
      error = err.errormsg;      
    }
    res.redirect('/');
  });
});

app5.listen(3004, () => {
  console.log('Acct Page Running.');
});


