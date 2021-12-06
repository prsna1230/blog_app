import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlog } from "../redux-store/blogSlice";
import Footer from "./Footer";
import ListofBlog from "./ListofBlog";

function Home() {
  let dispatch = useDispatch();
  let { userObj } = useSelector((state) => state.user);
  let { blogObj } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getBlog());
  }, [temp]);
  let [result, setResult] = useState([]);
  let [temp, setTemp] = useState("");

  // On Category Select
  const categorySelect = (obj) => {
    let result1 = blogObj.filter((bl) => bl.category === obj);
    if (result1.length === 0) {
      setTemp("Not Found");
    } else {
      setTemp("Found");
    }
    setResult(result1);
  };

  return (
    <div className="container-fluid">
      {/* image */}
      <h3 className="text-center mb-5">Welcome To The Blogging World</h3>
      <div className="position-relative">
        <h3 className="position-absolute top-0 start-50 translate-middle blog ">
          Blog
        </h3>
        <img
          src="https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="green image"
          className="w-100 mt-2"
          height="450px"
        />
      </div>
      {/* posts */}
      <h3 className="text-center mt-3 mb-2">
        <strong>Posts</strong>
      </h3>
      {result.length !== 0 || temp === "Found" ? (
        <div>
          <h3 className="mt-3">Your Search Results..,</h3>
          <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 ">
            {result.map((bl, index) => {
              return <ListofBlog bl={bl} />;
            })}
          </div>
        </div>
      ) : temp === "Not Found" ? (
        <div>
          <h2 className="text-center mt-5 mb-5 text-danger">No Result found</h2>
        </div>
      ) : (
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 ">
          {blogObj.map((bl, index) => {
            return <ListofBlog bl={bl} />;
          })}
        </div>
      )}

      {/* categories */}
      <h3 className="text-center mt-3 mb-2">
        <strong>Categories</strong>
      </h3>
      <div className="row row-cols-sm-2 row-cols-md-5 row-cols-lg-8 mb-4">
        <button
          className="btn btn-danger boxshape rounded-pill col mt-2"
          onClick={() => categorySelect("Business")}
        >
          Business
        </button>
        <button
          className="btn boxshape btn-success col rounded-pill mt-2"
          onClick={() => categorySelect("City")}
        >
          City
        </button>
        <button
          className="btn boxshape btn-danger col rounded-pill mt-2"
          onClick={() => categorySelect("DIY")}
        >
          DIY
        </button>
        <button
          className="btn boxshape btn-success col rounded-pill mt-2 "
          onClick={() => categorySelect("Fashion")}
        >
          Fashion
        </button>
        <button
          className="btn boxshape btn-danger col rounded-pill mt-2 "
          onClick={() => categorySelect("Finance")}
        >
          Finance
        </button>
        <button
          className="btn boxshape btn-success col rounded-pill mt-2 "
          onClick={() => categorySelect("Fitness")}
        >
          Fitness
        </button>
        <button
          className="btn boxshape btn-danger col rounded-pill mt-2 "
          onClick={() => categorySelect("Food")}
        >
          Food
        </button>
        <button
          className="btn boxshape btn-success col rounded-pill mt-2 "
          onClick={() => categorySelect("Lifestyle")}
        >
          Lifestyle
        </button>
        <button
          className="btn boxshape btn-danger col rounded-pill mt-2"
          onClick={() => categorySelect("Music")}
        >
          Music
        </button>
        <button
          className="btn boxshape btn-success col rounded-pill mt-2"
          onClick={() => categorySelect("Political")}
        >
          Political
        </button>
        <button
          className="boxshape btn-danger col rounded-pill mt-2 me-1"
          onClick={() => categorySelect("Sports")}
        >
          Sports
        </button>
        <button
          className="btn boxshape btn-success col rounded-pill mt-2 "
          onClick={() => categorySelect("Travel")}
        >
          Travel
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
