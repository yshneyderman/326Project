let express = require("express");
let bodyParser = require("body-parser");
let mustacheExpress = require('mustache-express');
let Track = require("./models/track");

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
  Track.find((err, tracks) => {
    let view = { tracks , errormsg : error};
    res.render('track', view);
    error = '';
  });
});

app.post("/search", (req, res) => {
  let title = req.body.title;  

  Track.find({ title : title }, (err, tracks) => {
    let view = { tracks , errormsg : error};
    res.render('track', view);
    error = '';
  });
});

app.listen(3000, () => {
  console.log('Explore Page Running.');
  console.log('Visit http://localhost:3000 in your favorite browser.');
});


let app2 = express();

// This will allow the router to parse both json and form data.
router.use(bodyParser.json());

// This will use the static middleware
router.use(express.static('public'));

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
  Track.find((err, tracks) => {
    let view = { tracks , errormsg : error2};
    res.render('home', view);
    error = '';
  });
});


app2.listen(3001, () => {
  console.log('Home Page Running.');
  console.log('Visit http://localhost:3001 in your favorite browser.');
});


let app3 = express();

// This will allow the router to parse both json and form data.
router.use(bodyParser.json());

// This will use the static middleware
router.use(express.static('public'));

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

app3.post("/create", (req, res) => {
  // Create a track from the submitted form data
  tra = new Track({
      title: req.body.title,
      artist: req.body.artist,
      mp3: req.body.mp3,
      duration: req.body.duration
  });

  tra.save((err, tra) => {
      if (err) {
          res.status(400).send(err);
      } else {            
          res.redirect('/');
      }
  });
});

app3.get("/", (req, res) => {
  Track.find((err, tracks) => {
    let view = { tracks , errormsg : error3};
    res.render('add', view);
    error = '';
  });
});

app3.post("/search", (req, res) => {
  let title = req.body.title;  

  Track.find({ title : title }, (err, tracks) => {
    let view = { tracks , errormsg : error};
    res.render('track', view);
    error = '';
  });
});

app3.get('/remove', (req, res) => {
  Track.remove({}, (err) => {
    if (err) {
      error = err.errormsg;      
    }
    res.redirect('/');
  });
});

app3.listen(3002, () => {
  console.log('Add Page Running.');
  console.log('Visit http://localhost:3002 in your favorite browser.');
});


