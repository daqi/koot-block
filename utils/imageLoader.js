import getType from "./getType";

function fileToUrl(file) {
  let URL = window.URL || window.webkitURL;
  return URL.createObjectURL(file);
}

export default function ImageLoader(img, cb) {
  let url;
  if (getType(img) === "File") {
    url = fileToUrl(img);
  } else {
    url = img;
  }

  let imgObj = new Image();
  imgObj.onload = function() {
    cb && cb(imgObj, url);
  };
  imgObj.src = url;
}
