let x;
let div;
let savedSong;
let z;

function playAudio(song) {
  console.log("playAudio works");
  // if(x != null){
  //     x.pause();
  //     y.innerHTML = "<i class='fa fa-play' aria-hidden='true' style='color: #ffffff' onclick='playAudio(\"" + savedb + "\",\""+ saveds +"\")'></i>";
  //     z.style.setProperty("color", "#ffffff");
  // }
  savedSong = song;
  x = document.getElementById("audio_"+song); 
  x.play();
  div = document.getElementById("play_"+song);
  div.innerHTML = "<i class='fa fa-pause' aria-hidden='true' style='color: #00bcd4' onclick='pauseAudio(\"" +song+"\")'></i>";
  z = document.getElementById("title_"+song); 
  z.style.setProperty("color", "#00bcd4");
} 

function pauseAudio(b,s) { 
    let a = document.getElementById(s); 
    a.pause();
    let c = document.getElementById(b);
    c.innerHTML = "<i class='fa fa-play' aria-hidden='true' style='color: #ffffff' onclick='playAudio(\"" +b + "\",\""+s+"\")'></i>";
    d = document.getElementById("n" + b); 
    d.style.setProperty("color", "#ffffff");
} 
