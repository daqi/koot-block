import imageLoader from "./imageLoader";

export default function getImageWH(image, callback) {
  imageLoader(image, function(imageObj) {
    callback(imageObj.width, imageObj.height);
  });
}
