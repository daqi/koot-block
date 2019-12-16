import getType from "./getType";
import fileToUrl from "./fileToUrl";

export default function audioLoader(audioUrl, callback) {
  let url;
  if (getType(audioUrl) === "File") {
    url = fileToUrl(audioUrl);
  } else {
    url = audioUrl;
  }

  let audioElm = document.createElement("video");
  audioElm.addEventListener("loadedmetadata", () => {
    callback && callback(audioElm, url);
  });
  audioElm.src = url;
}
