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
  // style={{ maxWidth: "540px" }}

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={bl.image[0]}
            className="img-fluid rounded-start"
            alt="image"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{bl.blogtitle}</h5>
            <p className="card-text">{bl.blog.substring(0, 300)}...</p>
            <p className="card-text">
              <small className="text-muted">Last updated{bl.date}</small>
            </p>
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
