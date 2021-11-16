"use strict";


var title = "";
var video = "";

let downloadButton = "<style>.btn {display: inline-flex;position: relative;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;margin-right: 5px;margin-left: 5px;justify-content: center;vertical-align: middle;overflow: hidden;text-decoration: none;white-space: nowrap;user-select: none;border: none;font: inherit;font-family: inherit;width:125px;font-weight: 600;border-radius: 0.4rem;font-size: 1.3rem;height: 3rem;background-color: #9147ff;color: #fff;} .btn:hover{ background-Color:#772ce8;} </style><button class='btn'> Download Clip </button>";

let re = new RegExp("[<>:\"\/\\\|\?\*]");

function createButton(butLocation){

  butLocation.insertAdjacentHTML("beforebegin",downloadButton);
  var but = document.getElementsByClassName("btn")[0];

  but.addEventListener("click", function () {
    chrome.runtime.sendMessage({
      file: video,
      name: title.replace(re,"") + ".mp4"
    });
  });
}



function updateButton(){
  video = document.querySelector("video").src,
  title = document.querySelector("title").innerText;
}


let startOf  = setInterval(function() {


  if(location.pathname.includes("/clip/") || location.hostname.includes("clips."))
  {
    if(typeof document.getElementsByClassName("btn")[0] == "undefined")
    {

       if (document.querySelector("[data-test-selector='clips-watch-full-button']"))
       {
         createButton(document.querySelector("[data-test-selector='clips-watch-full-button']"));
       }
       else if(document.querySelector("[aria-label='Share']"))
       {
         createButton(document.querySelector("[aria-label='Share']"));
       }
       else if(document.querySelector("[disabled]") && location.hostname.includes("clips."))
       {
         createButton(document.querySelector("[disabled]"));
       }
       updateButton();
    }
    else
    {
      updateButton();
    }

  }


}, 900);
