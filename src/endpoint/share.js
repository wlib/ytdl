function getGooglUrl(googlApiKey, longUrl) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url?key=" + googlApiKey, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function () {
      if (xhr.status < 300 && xhr.status >= 200) {
        resolve(xhr.response);
      }
      else {
        reject(xhr.status + " " + xhr.statusText);
      }
    };
    xhr.onerror = function(err) {
      reject(err);
    }
    xhr.send( JSON.stringify({ longUrl: longUrl }) );
  });
}

export default function makeShortUrl(googlApiKey, longUrl=location.href) {
  return getGooglUrl(googlApiKey, longUrl).then(json => {
    const obj = JSON.parse(json);
    const shortID = obj.id.match( /[^/]+$/ )[0];
    return location.origin + "/share#" + shortID;
  });
}