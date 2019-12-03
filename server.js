let express = require("express");
let bodyParser = require("body-parser");
let mustacheExpress = require('mustache-express');
let Track = require("./models/track");

let trackRoute = express.Router();
let multer = require('multer');

let mongodb = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

let app1 = express();

const router = express.Router();


/**
 * https://stackoverflow.com/questions/28788872/multer-module-wont-start
 * https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0 - some of new code
 * https://stackoverflow.com/questions/48058565/cannot-read-property-collection-of-undefined-mongodb
 * https://codeforgeek.com/mongodb-atlas-node-js/
 * https://medium.com/@richard534/uploading-streaming-audio-using-nodejs-express-mongodb-gridfs-b031a0bcb20f - most of new code
 * might need to manually npm i multer if it doesn't install itself
 * 
 * 
 * 
 * 
 */
/**
 * NPM Module dependencies.
 */
//const express = require('express');


/**
 * NodeJS Module dependencies.
 */
const { Readable } = require('stream');

/**
 * Create Express server && Express Router configuration.
 */
//const app1 = express();
app1.use('/TRtest', trackRoute);

/**
 * Connect Mongo Driver to MongoDB.
 */
let dbc;
const uri = "mongodb+srv://rdwest:teamtwentyfour@cluster0-slik4.mongodb.net/TRtest?retryWrites=true&w=majority"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   dbc = client.db("TRtest");
});

/**
 * GET /tracks
 */

trackRoute.get('/:trackID', (req, res) => {
  try {
    var trackID = new ObjectID(req.params.trackID);
  } catch(err) {
    return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
  }
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(dbc, {
    bucketName: 'TRtest'
  },"w");

  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});

/**
 * POST /tracks
 */
trackRoute.post('/', (req, res) => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
  upload.single('track')(req, res, (err) => {
    /**if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }**/
    
    let trackName = req.body.name;
    
    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(dbc, {
      bucketName: 'TRtest'
    }, "w");

    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    });
  });
});

app1.listen(3005, () => {
  console.log("App1 listening on port 3005!");
});






let app = express();

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

app.post("/upvote", (req, res) => {
  let title = req.body.title;
  Track.findOne({ title : title }, async function(err, tracks){
    tracks.upvotes += 1;
    tracks.markModified('upvotes');
    await tracks.save();
    error = '';
  });
  Track.find((err, tracks) => {
    console.log(tracks);
    let view = { tracks , errormsg : error};
    res.render('track', view);
    error = '';
  });
});

app.post("/search", (req, res) => {
  let title = req.body.title;  
  if(title === ""){
    Track.find((err, tracks) => {
      let view = { tracks , errormsg : error};
      res.render('track', view);
      error = '';
    });
  }
  else{
    Track.find({ title : title }, (err, tracks) => {
      let view = { tracks , errormsg : error};
      res.render('track', view);
      error = '';
    });
  }
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
      duration: req.body.duration,
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

app3.get("/", (req, res) => {
  Track.find((err, tracks) => {
    let view = { tracks , errormsg : error3};
    res.render('add', view);
    error = '';
  });
});

app3.post("/search", (req, res) => {
  let title = req.body.title;  
  if(title === ""){
    Track.find((err, tracks) => {
      let view = { tracks , errormsg : error3};
      res.render('add', view);
      error = '';
    });
  }
  else{
    Track.find({ title : title }, (err, tracks) => {
      let view = { tracks , errormsg : error};
      res.render('track', view);
      error = '';
    });
  }
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


