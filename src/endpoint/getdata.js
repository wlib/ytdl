export default function getData() {
  const urlEncodedJSON = window.location.search.substr(1);
  if (! urlEncodedJSON) {
    return false;
  }
  const jsonString = decodeURIComponent(urlEncodedJSON);
  return JSON.parse(jsonString);
}