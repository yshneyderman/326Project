# 326 Project
The Buffaloos
Team 24 Project

TuneRater

A website where aspiring musicians can upload their music and other users can provide ratings, critiques, and suggestions for how they can improve. It features an improved feedback system to have more relevant feedback than YouTube and Spotify.

This is much needed in a world where many artists upload their work to YouTube or Spotify and can't receive any helpful feedback short of internet harassment, likes, or simply getting ignored. On Spotify only celebrity and popular artists get likes and traction and cant get comments. On YouTube it is similar, but comments are often not relevant and the audience is meant mostly for entertainment. This will provide a platform for serious artists to get useful critiques of their music so that they may improve their skills and learn from others and create a community of such work.

Our project uses Data Storage (to store music files, info, and account info) on MongoDB, a Node.js server to interact with (rating, commenting, and sending this info to the database), and very basic user accounts (no encryption so please don't use real passwords).

# The Team

[Yefim Shneyderman](/team/Yefim.md) [GitHub](https://github.com/yshneyderman)

[Bruce Waters](/team/Bruce.md) [GitHub](https://github.com/watersbruce)

[Marco Hernandez-Muniz](/team/Marco.md) [GitHub](https://github.com/marcohmuniz)

[Ryan West](/team/Ryan.md) [GitHub](https://github.com/rdwestinator)

# Setup Instructions

Navigate to the folder where the GitHub repository is stored locally. Copy the path.
![FS](fs.png)

Open command prompt and change directory to the copied path:
    *cd C:\Users\Yefim\Desktop\Github Repository\326Project*

You will need to have Node.js and npm installed. Download it [here](https://nodejs.org/en/download/).
Next in the command prompt you will need to npm install all of the required modules: express, mustache, fs, multer, etc.

Then type the following:
    *npm start*

This will setup the server on port 3000-3004 and print "Running" if all is well.
![cmd](cmd.png)

Then open the browser and navigate to: http://localhost:3003/ (anything 3000-3004 works since they redirect to login). Let's make good music!

To end the program type Ctrl+c into the command prompt twice.
