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
  // Filtering category alone from the blogObj
  let category = [];
  blogObj.map((val, index) => {
    category.push(val.category);
  });
  // create unique category list
  let categories = category.filter((c, index) => {
    return category.indexOf(c) === index;
  });
  console.log(categories);
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
      <div className="row">
        <div className="col-lg-8">
          {result.length !== 0 || temp === "Found" ? (
            <div>
              <h3 className="mt-3">Your Search Results..,</h3>
              <div>
                {result.map((bl, index) => {
                  return <ListofBlog bl={bl} />;
                })}
              </div>
            </div>
          ) : temp === "Not Found" ? (
            <div>
              <h2 className="text-center mt-5 mb-5 text-danger">
                No Result found
              </h2>
            </div>
          ) : (
            <div>
              {blogObj.map((bl, index) => {
                return <ListofBlog bl={bl} />;
              })}
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div className="bg-warning">
            <div className="row">
              <h3>Subscribe For Later Updates</h3>
              <div className="col-lg-7">
                <form className="justify-content-center">
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email id"
                  />
                  <button
                    className="btn btn-success mb-3 d-block mx-auto"
                    type="button"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <h4 className="text-center mt-3 mb-2">
            <strong>Categories</strong>
          </h4>

          <ul className="list-group">
            {categories.map((cat, index) => {
              return (
                <li
                  className="list-group-item list-group-item-primary"
                  type="button"
                  onClick={() => categorySelect(cat)}
                >
                  {cat}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
