/*
YouTube-DL client script - MIT - By Daniel Ethridge https://git.io/de
Project at https://github.com/wlib/youtube-dl
Thanks to @svnpenn for insight - https://superuser.com/a/773998 and
https://github.com/svnpenn/bm/raw/master/yt-dl/yt-dl.js
*/

import Organizer from "./organizer.js";
import { endpoint as endpoint } from "../../config.js";

// This doesn't really "send" data, it just takes an object, url encodes it
// and loads the endpoint with that object as a query
function sendData(endpoint, object) {
  const dataString = JSON.stringify(object);
  const urlEncodedData = encodeURIComponent(dataString);
  window.location.href = endpoint + "/?" + urlEncodedData;
}

const streams = new Organizer();

// ytInfo will hold all the information we need at the endpoint
const ytInfo = {
  title: ytplayer.config.args.title,
  videoID: ytplayer.config.args.video_id,
  audioUrl: streams.audio.mp4
};

// Finally just send it
sendData(endpoint, ytInfo);