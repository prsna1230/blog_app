import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LikeLoveReport from "./LikeLoveReport";

const ListofBlog = ({ bl }) => {
  let history = useHistory();

  const directingToFullBlog = () => {
    history.push({
      pathname: `/viewblog/${bl.blogtitle}`,
      state: bl,
    });
  };
  return (
    <div className="col">
      <div className="card">
        <img
          src={bl.image[0]}
          className="card-img-top"
          alt="labelimg"
          height="200px"
          width="100%"
        />
        <div className="card-body">
          <h5 className="card-title">{bl.blogtitle}</h5>
          <p className="card-text">{bl.blog.substring(0, 80)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <p>Date: {bl.date}</p>
          </div>
          <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={directingToFullBlog}
            >
              Read Full Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListofBlog;
