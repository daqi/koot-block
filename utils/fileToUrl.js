export default function fileToUrl(file) {
  let URL = window.URL || window.webkitURL;
  return URL.createObjectURL(file);
}