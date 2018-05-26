const {shell} = require('electron')
const {dialog} = require('electron').remote
const os = require('os')
const fs = require("fs");

let selection = null;
let musiclist = [];
let fpath = null;
function addMusic(){
  dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}, function(filePaths){
    fpath = filePaths[0];
    fs.readdir(filePaths[0], function(err, dir){
      for(let filePath of dir) {
        musiclist.push(fpath+"/"+filePath);
        let mlist = document.getElementById("musiclist");
        let music_item = document.createElement("DIV");
        music_item.data = fpath+"/"+filePath;
        music_item.appendChild(document.createTextNode(filePath));
        music_item.classList.add("item");
        music_item.classList.add("header");

        music_item.onclick =
        function playMe(){
          let audio_elem = document.getElementById("audio");
          let source = document.getElementById('audiosource');
          source.src = music_item.data;
          audio_elem.pause();
          if(audio_elem.paused){
            let btn = document.getElementById("play_pause");
            btn.classList.remove("play");
            btn.classList.add("pause");
          }
          else{
            let btn = document.getElementById("play_pause");
            btn.classList.remove("pause");
            btn.classList.add("play");


          }
          audio_elem.load();
          audio_elem.play();
          selection = music_item.data;
        };
        mlist.appendChild(music_item);
      }
    });
  });


}


function nextSong(){
  let audio_elem = document.getElementById("audio");
  let source = document.getElementById('audiosource');
  if(musiclist.length>0){
    if(musiclist.indexOf(selection)+1>musiclist.length-1){
      selection = musiclist[0];
    }
    else{
      selection = musiclist[musiclist.indexOf(selection)+1];
    }

  }
  audio_elem.pause();
  source.src = selection;
  audio_elem.load();
  audio_elem.play();
  if(audio_elem.paused){
    let btn = document.getElementById("play_pause");
    btn.classList.remove("play");
    btn.classList.add("pause");
  }    else{
    let btn = document.getElementById("play_pause");
    btn.classList.remove("pause");
    btn.classList.add("play");
  }

}
function prevSong(){

    let audio_elem = document.getElementById("audio");
    let source = document.getElementById('audiosource');
    if(musiclist.length>0){
      if(musiclist.indexOf(selection)-1<0){
        selection = musiclist[musiclist.length-1];
      }
      else{
        selection = musiclist[musiclist.indexOf(selection)-1];
      }

    }
    audio_elem.pause();
    source.src = selection;
    audio_elem.load();
    audio_elem.play();
    if(audio_elem.paused){
      let btn = document.getElementById("play_pause");
      btn.classList.remove("play");
      btn.classList.add("pause");
    }    else{
      let btn = document.getElementById("play_pause");
      btn.classList.remove("pause");
      btn.classList.add("play");
    }

}

function btnplayMe(){
  let audio_elem = document.getElementById("audio");
  if(selection != null){
    if(audio_elem.paused){
      let btn = document.getElementById("play_pause");
      btn.classList.remove("play");
      btn.classList.add("pause");
      let source = document.getElementById('audiosource');
      source.src = selection;
      audio_elem.play();
    }
    else{
      let btn = document.getElementById("play_pause");
      btn.classList.remove("pause");
      btn.classList.add("play");
      let audio_elem = document.getElementById("audio");
      audio_elem.pause();
    }
  }


}
