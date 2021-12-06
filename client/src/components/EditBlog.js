import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { editBlogs } from "../redux-store/blogSlice";

const EditBlog = ({ blogForEdit, index, seted }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: blogForEdit });
  let [file, setFile] = useState(null);
  const dispatch = useDispatch();
  let { userObj } = useSelector((state) => state.user);
  // image adding
  const onLabelSelect = (e) => {
    setFile([...e.target.files]);
  };

  // On Submitting Form
  const onFormSubmit = async (blogObj) => {
    // append image to it
    file.forEach((element, ind) => {
      let temp = `LabelImg`;
      formData.append(temp, element, element.name);
    });
    //append hotel ownername
    blogObj.email = userObj.email;

    // appending date
    var today = new Date();
    var date1 =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    blogObj.date = date1;

    // // append hotel object
    formData.append("blogObj", JSON.stringify(blogObj));

    dispatch(editBlogs({ bid: blogObj._id, formData: formData, index: index }));

    seted(false);
  };

  // create Formdata Object
  let formData = new FormData();

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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
