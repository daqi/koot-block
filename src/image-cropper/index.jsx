import React from "react";
import Cover from "./cover";
import "./index.less";

export function ImageCroper({ width, height, image, onChange, rect, zoom }) {
  return (
    <div
      className="imageCroperWrap"
      style={{
        width: width,
        height: height
      }}
    >
      <Cover
        className="imageCroperCover"
        onChange={onChange}
        rect={rect}
        zoom={zoom}
      />
      <img className="imageCroperImage" src={image} alt="" />
    </div>
  );
}

export default ImageCroper;
