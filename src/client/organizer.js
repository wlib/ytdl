import Streams from "./streams.js";

export default class Organizer {
  constructor() {
    this.urls = new Streams().urls;
    this.audio = {
      mp4: this.filterStream("audio", "mp4")
    };
    this.video = {
      mp4: this.filterStream("video", "mp4")
    };
  }

  filterStream(type="audio", format="mp4") {
    const regex = new RegExp("mime=" + type + "%2f" + format, "i");
    for (let i = 0; i < this.urls.length; i++) {
      // Just return the first match
      if ( this.urls[i].match(regex) ) {
        return this.urls[i];
      }
    }
  }
}