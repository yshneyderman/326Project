
var songs = {
    "listID": 1,
    "songList": {
      1 : {"name": "Kalinka", "id": 1, "Artist": "Morandi"},
      2 : {"name": "Tekoon Bede", "id": 2, "Artist": "Arash"},
      3 : {"name": "Billionaire", "id": 3, "Artist": "Bruno Mars"},
      4 : {"name": "Paint It, Black", "id": 4, "Artist": "Ciara"},
    }
  };


document.getElementById("songs").style.display = "block";
document.getElementById("songs").innerHTML = "<ul></ul>";

for(s in songs.songList){
    var node = document.createElement("div");
    node.innerHTML = "<div class='container' style='color:#ffffff;padding:3px;margin-top:4px;background-color:#353535;border: 1px solid#131313;'><audio id='"+ songs.songList[s].id +"'><source src='https://resources.zybooks.com/WebProgramming/tyops_vivaldi-meets-hip-hop.mp3'></audio><div class='fixed' id='"+ "b" + songs.songList[s].id +"' style='padding:6px; margin-top:10px'><i class='fa fa-play' aria-hidden='true' onclick='playAudio(\""+ "b" + songs.songList[s].id +"\",\""+ songs.songList[s].id +"\")'></i></div><div class='flex-item' style='padding:6px'><div>"+ songs.songList[s].name +"</div><div style='color:rgb(173, 173, 173)'>"+ songs.songList[s].Artist +"</div></div><div class='flex-item'></div></div>";
    
    document.getElementById("songs").appendChild(node);
}

let x;
let y;
let st;

function playAudio(b, s) {
  if(x != null){
      x.pause();
      y.innerHTML = "<i class='fa fa-play" + st.substring(21,st.length);
  }
  x = document.getElementById(s); 
  x.play();
  y = document.getElementById(b);
  st = "<i class='fa fa-pause' aria-hidden='true' onclick='pauseAudio(\"" +b + "\",\""+s+"\")'></i>";
  y.innerHTML = st;
} 

function pauseAudio(b,s) { 
    let a = document.getElementById(s); 
    a.pause();
    let c = document.getElementById(b);
    c.innerHTML = "<i class='fa fa-play' aria-hidden='true' onclick='playAudio(\"" +b + "\",\""+s+"\")'></i>";
} 
