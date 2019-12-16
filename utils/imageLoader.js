import getType from "./getType";
import fileToUrl from "./fileToUrl";

export default function imageLoader(imageUrl, callback) {
  let url;
  if (getType(imageUrl) === "File") {
    url = fileToUrl(imageUrl);
  } else {
    url = imageUrl;
  }

  let imgObj = new Image();
  imgObj.onload = function() {
    callback && callback(imgObj, url);
  };
  imgObj.src = url;
}
