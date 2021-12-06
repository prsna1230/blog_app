import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import LikeLoveReport from "./LikeLoveReport";
import ListofBlog from "./ListofBlog";
import { useRef } from "react";
import Footer from "./Footer";

const Viewblog = () => {
  let history = useHistory();
  let textInput = useRef(null);
  let { blogtitle } = useParams();
  let { state } = useLocation();
  let { blogObj } = useSelector((state) => state.blog);
  const result = blogObj.filter((bl) => bl.category === state.category);
  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between">
        <div>
          <h2>{state.blogtitle}</h2>
          <p>
            {" "}
            <strong>Author:</strong>
            {state.email}
          </p>
        </div>
        <div>
          <h5>Category:{state.category}</h5>
          <p>
            {" "}
            <strong>Last Updated:</strong> {state.date}
          </p>
        </div>
      </div>
      <div>
        <img src={state.image[0]} alt="image1" width="100%" height="250px" />
        <p>{state.blog}</p>
        <div className="row mb-4">
          <div className="col-6">
            <img
              src={state.image[1]}
              alt="image2"
              width="100%"
              height="250px"
            />
          </div>
          <div className="col-6">
            <img
              src={state.image[2]}
              alt="image3"
              width="100%"
              height="250px"
            />
          </div>
        </div>
      </div>
      <div>
        <LikeLoveReport />
      </div>
      {/* Similiar Posts */}
      <div>
        <h4 className="text-center mt-5 mb-3">Similiar Posts</h4>
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 ">
          {result.map((bl, index) => {
            return <ListofBlog bl={bl} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Viewblog;
