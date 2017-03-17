// Usage : array.filter(uniq)
function uniq(item, pos, self) {
  return self.indexOf(item) == pos;
}

export default class Streams {
  constructor() {
    this.videoData = this.getData();
    this.videoDataString = JSON.stringify(this.videoData);
    // Get an array of potential stream getUrls
    this.streamUrls = this.getUrls();
    // And any of YouTube's security signatures as well...
    this.signatures = this.getSignatures();
    // Add the signature as a query item to the stream urls in order to make them viewable
    // Add the ratebypass thing because apparently that allows faster downloads
    this.urls = [];
    for (let i in this.streamUrls) {
      let url = this.streamUrls[i] + "&signature=" + this.signatures[i] + "&ratebypass=yes&ratebypass";
      this.urls.push(url);
    }
  }

  getData() {
    // Start up a new player API object
    this.ytApi = yt.player.Application.create("player-api", ytplayer.config);
    this.ytApi.dispose();
    // Get the video data and then stringify it so that regex can search for download urls
    const videoData = this.ytApi.getVideoData();
    return videoData;
  }

  getUrls() {
    return this.videoDataString.match( /https:[^"]+videoplayback[^"]+/g ).filter(uniq);
  }

  getSignatures() {
    return this.videoDataString.match( /[0-9A-F.]+(?=")/g ).filter(z => z.length > 20).filter(uniq);
  }
}