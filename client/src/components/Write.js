import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addBlog } from "../redux-store/blogSlice";
import { useHistory } from "react-router";

function Write() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  let { userObj } = useSelector((state) => state.user);
  const history = useHistory();
  let [file, setFile] = useState(null);

  // label image select
  const onLabelSelect = (e) => {
    setFile([...e.target.files]);
  };
  let formData = new FormData();
  // Submission of blog
  const onFormSubmit = async (blogObj) => {
    // append image to it
    file.forEach((element, index) => {
      let temp = `LabelImg`;
      formData.append(temp, element, element.name);
    });
    // append username
    blogObj.email = userObj.email;
    var today = new Date();
    var date1 =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    blogObj.date = date1;

    // append blog object
    formData.append("blogObj", JSON.stringify(blogObj));
    dispatch(addBlog(formData));
  };

  return (
    <div className="container-fluid">
      <form
        className="col-11 mx-auto mt-3"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="d-block mx-auto form-floating">
          {/* title */}
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="blogtitle"
              placeholder="Tittle"
              {...register("blogtitle", { required: true })}
            />
          </div>
          {errors.blogtitle?.type === "required" && (
            <p className="text text-danger ">*Tittle is Required</p>
          )}
          {/* Blog */}
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Write your blog here
            </label>
            <textarea
              className="form-control"
              id="blog"
              rows="20"
              name="blog"
              placeholder="Start write your blog"
              {...register("blog", { required: true })}
            ></textarea>
            {errors.blog?.type === "required" ? (
              <label className="text text-danger ">
                *blog article is Required
              </label>
            ) : (
              <></>
            )}
          </div>
          {/* Category */}
          <div className="form-floating mb-4">
            <input
              type="text"
              list="category"
              className="form-control"
              placeholder="category"
              {...register("category", { required: true })}
            />
            <datalist id="category">
              <option>Business</option>
              <option>DIY</option>
              <option>Fashion</option>
              <option>Finance</option>
              <option>Fitness</option>
              <option>Food</option>
              <option>Lifestyle</option>
              <option>Music</option>
              <option>Political</option>
              <option>Sports</option>
              <option>Travel</option>
            </datalist>
            {errors.category?.type === "required" ? (
              <label className="text text-danger ">*Category is Required</label>
            ) : (
              <label htmlFor="category">Category*</label>
            )}
          </div>
          {/* label image */}
          <div className="form-floating mb-4">
            <input
              type="file"
              name="labelimage"
              multiple
              accept="image/*"
              id="labelimage"
              className="form-control"
              onChange={onLabelSelect}
            />
          </div>
        </div>
        {/* Submit button */}
        <button className="btn btn-danger w-50 d-block mx-auto mb-4 mt-3 rounded-pill">
          Upload
        </button>
      </form>
    </div>
  );
}

export default Write;
