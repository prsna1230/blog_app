import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();
  let [file, setFile] = useState(null);

  // full form submission
  const onFormSubmit = async (userObj) => {
    let formData = new FormData();

    // append image to it

    formData.append("profileimage", file, file.name);

    // append user object
    formData.append("userobj", JSON.stringify(userObj));
    let responseObj = await axios.post("/users/register", formData);
    console.log(responseObj);
    let payload = responseObj.data;
    if (payload.message === "Success") {
      alert("Successfully Registered");
      history.push("/login");
    } else {
      alert("User name already taken");
    }
  };

  // for profile imge select
  const onProfileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <form
          className="col-11 col-sm-8 col-md-6 col-lg-5 shadow mx-auto mt-3"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <h2 className="text-start">Sign Up</h2>

          {/* username */}
          <div className="form-floating mb-4">
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="username"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" ? (
              <label className="text text-danger ">*Username is Required</label>
            ) : (
              <label htmlFor="username">Username*</label>
            )}
          </div>

          {/* email */}
          <div className="form-floating mb-4">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" ? (
              <label className="text text-danger ">*email is Required</label>
            ) : (
              <label htmlFor="username">Email*</label>
            )}
          </div>

          {/* password */}
          <div className="form-floating mb-4">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" ? (
              <label className="text text-danger ">*password is Required</label>
            ) : (
              <label htmlFor="password">Password*</label>
            )}
          </div>

          {/* gender */}
          <div className="form-check-inline mb-3">
            <input
              type="radio"
              value="male"
              id="male"
              className="form-check-input"
              {...register("gender", { required: true })}
            />
            <label className="form-check-label" for="male">
              Male
            </label>
          </div>
          <div className="form-check-inline mb-3">
            <input
              type="radio"
              value="female"
              id="female"
              className="form-check-input"
              {...register("gender", { required: true })}
            />
            <label className="form-check-label" for="female">
              Female
            </label>
          </div>
          {errors.gender?.type === "required" && (
            <p className="text text-danger">Gender is Required</p>
          )}

          {/* intrests*/}
          <div className="form-floating mb-4">
            <input
              type="text"
              list="intrests"
              className="form-control"
              placeholder="intrests"
              {...register("intrests", { required: true })}
            />
            <datalist id="intrests">
              <option>Reading-Books</option>
              <option>Listening-Song</option>
              <option>Watching-Movies</option>
            </datalist>
            {errors.intrests?.type === "required" ? (
              <label className="text text-danger ">*Intrests is Required</label>
            ) : (
              <label htmlFor="intrests">Intrests*</label>
            )}
          </div>

          {/* favourite music */}
          <div className="form-floating mb-4">
            <input
              type="text"
              name="favouritemusic"
              id="favouritemusic"
              className="form-control"
              placeholder="favouritemusic"
              {...register("favouritemusic", { required: true })}
            />
            {errors.favouritemusic?.type === "required" ? (
              <label className="text text-danger ">
                *Favouritemusic is Required
              </label>
            ) : (
              <label htmlFor="favouritemusic">Favourite music*</label>
            )}
          </div>

          {/* profile image */}
          <div className="form-floating mb-4">
            <input
              type="file"
              name="profileimage"
              id="profileimage"
              className="form-control"
              placeholder="profileimage"
              onChange={onProfileSelect}
            />
          </div>
          {errors.profileimage?.type === "required" && (
            <p className="text text-danger ">*Profilepic is Required</p>
          )}

          {/* Submit */}
          <button className="btn btn-primary w-50 d-block mx-auto mb-4 mt-3 rounded-pill">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
