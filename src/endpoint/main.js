/*
YouTube-DL endpoint script - MIT - By Daniel Ethridge https://git.io/de
Project at https://github.com/wlib/youtube-dl
*/

import getData from "./getdata.js";
import Player from "./player.js";
import makeShortUrl from "./share.js";
import { googlApiKey as googlApiKey } from "../../config.js";

// Strip the data from the URL
const ytInfo = getData();

// Set the title up
document.querySelector("#title").innerText = ytInfo.title || "Unknown Title";

if (ytInfo.audioUrl) {
  // Create a new player and append it to the player div
  const player = new Player(ytInfo.title, ytInfo.videoID, ytInfo.audioUrl);
  document.querySelector("#player").appendChild(player.audio);
  // Set the download link
  document.querySelector("#audioDownloadUrl").setAttribute("href", ytInfo.audioUrl);
  // Link to original YouTube video
  document.querySelector("#originalUrl").setAttribute("href", "https://youtube.com/watch?v=" + ytInfo.videoID);
  document.getElementById("main").setAttribute("style", "display: block");
  if (googlApiKey) {
    makeShortUrl(googlApiKey).then(url =>{
      const share = document.querySelector("#shareUrl")
      share.setAttribute("href", url);
      share.innerText = url;
    });
  }
  else {
    document.querySelector("#share").setAttribute("style", "display: none");
  }
}
else {
  document.querySelector("#title").setAttribute("style", "mix-blend-mode: darken; color: #000;");
  document.querySelector("#info").setAttribute("style", "display: block");
  const bookmarklet = "javascript:document.body.appendChild(document.createElement('script')).src='" + window.location.origin + window.location.pathname + "/js/client.js';void(0);";
  document.getElementById("bookmarklet").setAttribute("href", bookmarklet);
}
