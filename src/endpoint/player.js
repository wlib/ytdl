export default class Player {
  constructor(title, videoID, audioUrl, videoUrl) {
    // Set new title
    this.title = title;
    // Set new background image
    document.documentElement.setAttribute("style",
      "background-image: url('https://i.scaley.io/b20-480x340/img.youtube.com/vi/" + videoID + "/0.jpg')"
    );
    this.audio = this.makeAudio(audioUrl);
  }

  makeAudio(audioUrl, MIME="audio/mpeg") {
    const audio = document.createElement("audio");
    audio.autoplay = true;
    audio.controls = true;
    // Set the source to our stream url
    var audioSource = document.createElement("source");
    audioSource.setAttribute("src", audioUrl);
    audioSource.setAttribute("type", MIME);
    // Combine <source> and <audio> tags
    audio.appendChild(audioSource);
    return audio;
  }
}