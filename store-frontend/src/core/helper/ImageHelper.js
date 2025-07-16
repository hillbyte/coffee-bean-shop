import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://powermaccenter.com/images/products_attr_img/matrix/default.png`;
  return (
    <div className="rounded p-10">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "50%", maxWidth: "60%" }}
        className="mb-2 rounded"
      />
    </div>
  );
};
export default ImageHelper;
