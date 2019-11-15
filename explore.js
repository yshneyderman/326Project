//get this from MongoDB
var songs = {
    "listID": 1,
    "songList": {
      1 : {"name": "Kalinka", "id": 1, "Artist": "Morandi", "length": "3:46"},
      2 : {"name": "Tekoon Bede", "id": 2, "Artist": "Arash", "length": "2:40"},
      3 : {"name": "Billionaire", "id": 3, "Artist": "Bruno Mars", "length": "3:34"},
      4 : {"name": "Paint It, Black", "id": 4, "Artist": "Ciara", "length": "3:57"},
      5 : {"name": "Gyurza", "id": 5, "Artist": "Liranov", "length": "3:37"},
      6 : {"name": "Zacepila", "id": 6, "Artist": "Artur Pirozhov", "length": "3:39"},
      7 : {"name": "Tymani", "id": 7, "Artist": "Max Barckih", "length": "3:27"},
      8 : {"name": "Toy", "id": 8, "Artist": "Netta", "length": "3:01"},
    }
  };


document.getElementById("songs").style.display = "block";
document.getElementById("songs").innerHTML = "<ul></ul>";

for(s in songs.songList){
    var node = document.createElement("div");
    node.innerHTML = "<div class='container' id = '"+ "d" + songs.songList[s].id +"'style='color:#ffffff;padding:3px;margin-top:4px;background-color:#353535;border: 1px solid#131313;'><audio id='"+ songs.songList[s].id +"'><source src='https://resources.zybooks.com/WebProgramming/tyops_vivaldi-meets-hip-hop.mp3'></audio><div class='fixed' id='"+ "b" + songs.songList[s].id +"' style='padding:6px; margin-top:10px'><i class='fa fa-play' aria-hidden='true' onclick='playAudio(\""+ "b" + songs.songList[s].id +"\",\""+ songs.songList[s].id +"\")'></i></div><div class='flex-item' style='padding:6px'><div id='" + "nb" + songs.songList[s].id + "'>"+ songs.songList[s].name +"</div><div style='color:rgb(173, 173, 173)'>"+ songs.songList[s].Artist +"</div></div><div class='flex-item' style='padding:15px' align='right'>"+ songs.songList[s].length +"</div></div>";
    
    document.getElementById("songs").appendChild(node);
}

let x;
let y;
let savedb;
let saveds;
let z;

function playAudio(b, s) {
  if(x != null){
      x.pause();
      y.innerHTML = "<i class='fa fa-play' aria-hidden='true' style='color: #ffffff' onclick='playAudio(\"" + savedb + "\",\""+ saveds +"\")'></i>";
      z.style.setProperty("color", "#ffffff");
  }
  savedb = b;
  saveds = s;
  x = document.getElementById(s); 
  x.play();
  y = document.getElementById(b);
  y.innerHTML = "<i class='fa fa-pause' aria-hidden='true' style='color: #00bcd4' onclick='pauseAudio(\"" +b + "\",\""+s+"\")'></i>";
  z = document.getElementById("n"+b); 
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
