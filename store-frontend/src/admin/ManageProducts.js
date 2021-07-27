import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getProducts } from "./helper/adminapicall";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  //FIXME:
  //   const deletethisProduct = (productId) => {
  //     deleteProduct(productId, user._id, token).then((data) => {
  //       if (data.error) {
  //         console.log(data.error);
  //       } else {
  //         preload();
  //       }
  //     });
  //   };
  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="" description="">
      <h2 className="mb-2 text-info text-center">Manage all Products</h2>
      <Link className="btn btn-sm btn-dark rounded" to={`/admin/dashboard`}>
        <span className="">Back to Home</span>
      </Link>
      <hr />
      <div className="row">
        <div className="col-12">
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h4 className="text-white text-left text-wrap">
                    {product.name}
                  </h4>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success btn-sm rounded"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger btn-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};
export default ManageProducts;
