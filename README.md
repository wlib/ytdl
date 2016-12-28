# YouTube-DL - YouTube media stream extractor/download service

This service can be hosted on your own website, and doesn't require you to have any server-side processes, everything hosted is static. Read about how it works [here](https://de.surge.sh/ytdl/howitworks).

## What it looks like

The user goes to your website and sees simple instructions telling them how to use YouTube-DL, and follows them by saving the bookmarklet:

![The landing page](https://github.com/wlib/youtube-dl/raw/master/src/img/landing.png "The landing page")

The user decides to go to their favorite music video on YouTube and then clicks on your bookmarklet, immediately, they are redirected to the output page on your website:

![Example output page](https://github.com/wlib/youtube-dl/raw/master/src/img/endpoint.png "Example output page, the link is dead now, don't even try it")

Amazed, your soon-to-return visitor downloads the music and shares your website with everyone around

## Dependencies

To have all the right functionality right off the bat, you will need the following:

+ TypeScript installed > `sudo npm install -g typescript`
+ A [Cloudinary](https://cloudinary.com) account, for their free and simple image manipulation API
+ A [Google URL shortener](https://console.developers.google.com/apis/api/urlshortener) API key, for the quick share links

Go to each file in `src/ts/`, and edit the variables at the top to have their required values

None of the above are absolutely nessesary, but highly recommended.

## Installation

First, make sure you have the right [dependencies](#dependencies), and changed the variables at the top of each file in `src/ts/`

+ `git clone https://github.com/wlib/youtube-dl.git`
+ `cd youtube-dl/ && ./INSTALL`
+ The main directory to put on your website will be generated in `ytdl/`
+ A second directory is needed to have the share functionality, it is in `share/`

## [MIT License](https://github.com/wlib/youtube-dl/blob/master/LICENSE)
