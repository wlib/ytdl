# YouTube-DL - YouTube media stream extractor/download service

This service can be hosted on your own website, and doesn't require you to have any server-side processes, everything hosted is static.

## What it looks like

The user goes to your website and sees simple instructions telling them how to use the service, and follows them by saving the bookmarklet:

![The landing page](https://github.com/wlib/ytdl/raw/master/src/img/landing.png "The landing page")

The user decides to go to their favorite music video on YouTube and then clicks on your bookmarklet, immediately,they are redirected to the output page on your website:

![Example output page](https://github.com/wlib/ytdl/raw/master/src/img/endpoint.png "Example output page, the link is dead now, don't even try it")

It's that simple

## Dependencies

To have all the right functionality right off the bat, you will need the following:

+ NPM installed, but you likely already do
+ A [Google URL shortener](https://console.developers.google.com/apis/api/urlshortener) API key, for the quick share links. This isn't necessary but is quite a nice touch.

## Installation

First, make sure you have the right [stuff](#dependencies) installed

+ `git clone https://github.com/wlib/ytdl.git`
+ Put your endpoint URL and API key into [`config.js`](https://github.com/wlib/ytdl/blob/master/config.js)
+ `cd ytdl/ && npm install`
+ The built files in `ytdl/` should be placed in your website's root
+ You should place the `share/` directory on your site too, also in root

## [MIT License](https://github.com/wlib/ytdl/blob/master/LICENSE)