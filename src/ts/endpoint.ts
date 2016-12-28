let cloudinaryAccountName = false;
let googleAPIKey = false;

/*
YouTube-DL endpoint script - MIT - By Daniel Ethridge https://git.io/de
Project at https://github.com/wlib/youtube-dl
*/

// This will take the current url's query and parse it as url encoded JSON
function parseUrlData() {
  const urlEncodedObject = window.location.search.substr(1);
  if (! urlEncodedObject) {
    return false;
  }
  const jsonString = decodeURIComponent(urlEncodedObject);
  return JSON.parse(jsonString);
}

// Play an audio stream and display information about it on the page, along with a background image
function newAudioPlayer(player, cloudinary, audioUrl, videoID, videoTitle) {
  document.getElementById("title").innerHTML = videoTitle;
  if (! cloudinary) {
    cloudinary = "demo";
  }
  document.documentElement.setAttribute( "style", 
    "background-image:url('https://res.cloudinary.com/" + cloudinary +
    "/image/fetch/e_blur:1000/https://img.youtube.com/vi/" + videoID + "/0.jpg')");
  // HTML5 audio element with controls
  const audio = document.createElement("audio");
  audio.autoplay = true;
  audio.controls = true;
  // Set the source to our stream url
  const audioSource = document.createElement("source");
  audioSource.setAttribute("src", audioUrl);
  audioSource.setAttribute("type", "audio/mpeg");
  // Add the elements to the page
  audio.appendChild(audioSource);
  player.appendChild(audio);
}

// Update the displayed download links
function updateDownloads(title, audioUrl, videoID) {
  const audioDownloadUrl = document.getElementById("audioDownloadUrl");
  const originalUrl = document.getElementById("originalUrl");
  audioDownloadUrl.setAttribute("href", audioUrl);
  originalUrl.setAttribute("href", "https://youtube.com/watch?v=" + videoID);
}

// Display a short url to share the page
function shareIt(googleAPIKey) {
  const longUrl = window.location.href;
  const share = document.getElementById("shareUrl");
  const xhr = new XMLHttpRequest;
  const requestContent = { "longUrl": longUrl };
  xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url?key=" + googleAPIKey, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const shareID = JSON.parse(xhr.responseText)["id"];
      const shareUrl = window.location.host + "/share#" + shareID.match( /gl\/(.+)/ )[1];
      share.innerHTML = shareUrl;
      share.setAttribute("href", "https://" + shareUrl);
    }
  }
  xhr.send( JSON.stringify(requestContent) );
}

// Remember the `ytInfoClient` object on the client side? We retrieve it and parse it, so it's the same thing over here
const ytInfoEndpoint = parseUrlData();

// If there is a valid query, we display our main div, make the audio player, and update the download links
if (ytInfoEndpoint.audioUrl) {
  const bookmarklet = document.getElementById("bookmarklet");
  bookmarklet.parentElement.removeChild(bookmarklet);
  document.getElementById("main").setAttribute("style", "display: block");
  const player = document.getElementById("player");
  newAudioPlayer(player, cloudinaryAccountName, ytInfoEndpoint.audioUrl, ytInfoEndpoint.videoID, ytInfoEndpoint.title);
  updateDownloads(ytInfoEndpoint.title, ytInfoEndpoint.audioUrl, ytInfoEndpoint.videoID);
  // Display a link to share this page
  if (googleAPIKey) {
    shareIt(googleAPIKey);
  }
  else {
    document.getElementById("share").setAttribute("style", "display: none");
  }
}
// If this is just a normal page view, display the info div that contains instructions on how to use this service
else {
  document.getElementById("title").setAttribute("style", "mix-blend-mode: darken; color: #000;");
  document.getElementById("info").setAttribute("style", "display: block");
  const bookmarklet = "javascript:document.body.appendChild(document.createElement('script')).src='" + window.location.origin + window.location.pathname + "/js/client.js';void(0);";
  document.getElementById("bookmarklet").setAttribute("href", bookmarklet)
}
