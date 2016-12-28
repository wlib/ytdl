let webEndpoint = "https://de.surge.sh/ytdl";

/*
YouTube-DL client script - MIT - By Daniel Ethridge https://git.io/de
Project at https://github.com/wlib/youtube-dl
Thanks to @svnpenn for insight - https://superuser.com/a/773998 and
https://github.com/svnpenn/bm/raw/master/yt-dl/yt-dl.js
*/

declare var yt: any;
declare var ytplayer: any;

// Usage : array.filter(uniq)
function uniq(item, pos, self) {
  return self.indexOf(item) == pos;
}

// Get all the stream urls, video and audio
function getStreams() {
  const ytPlayerApi = yt.player.Application.create("player-api", ytplayer.config);
  ytPlayerApi.dispose();
  // Turn the object to a string so that regex can search for urls
  const videoData = JSON.stringify(ytPlayerApi.getVideoData());
  // Match stream urls and signatures
  const streamUrls = videoData.match( /https:[^"]+videoplayback[^"]+/g ).filter(uniq);
  const signatures = videoData.match( /[0-9A-F.]+(?=")/g ).filter(z => z.length > 20).filter(uniq);
  // Add the signature as a query item to the stream urls in order to make them viewable
  // Add the ratebypass thing because apparently that allows faster downloads
  return streamUrls.map((url, i) => url + "&signature=" + signatures[i] + "&ratebypass=yes&ratebypass");
}

// Take the stream urls and search for an mp3 url
function getAudioUrl(streams) {
  for (let i = 0; i < streams.length; i++) {
    // Just return the first match
    if (streams[i].match( /mime=audio%2fmp4/i )) {
      return streams[i];
    }
  }
}

// This doesn't really "send" data, it just takes an object, url encodes it
// and loads the endpoint with that object as a query
function sendData(endpoint, object) {
  const dataString = JSON.stringify(object);
  const urlEncodedData = encodeURIComponent(dataString);
  window.location.href = endpoint + "/?" + urlEncodedData;
}

// ytInfoClient will hold all the information we need at the endpoint
const ytInfoClient = {};

ytInfoClient["title"] = ytplayer.config.args.title;
ytInfoClient["videoID"] = ytplayer.config.args.video_id;
ytInfoClient["audioUrl"] = getAudioUrl( getStreams() );

// Finally just send it
sendData(webEndpoint, ytInfoClient);