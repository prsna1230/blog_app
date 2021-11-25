import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux-store/userSlice";
import { useHistory } from "react-router-dom";
function Login() {
  let history = useHistory();
  let dispatch = useDispatch();

  let { userObj, isSuccess, isLoading, isError, invalidLoginMessage } =
    useSelector((state) => state.user);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [userCredentialsObj, setUserCredentialsObj] = useState({
    type: "",
    username: "",
    password: "",
  });
  // form submit
  function onLoginFormSubmit(userObj) {
    setUserCredentialsObj({ ...userObj });
    dispatch(userLogin(userObj));
  }

  // after login takes to write page
  useEffect(() => {
    if (isSuccess) {
      history.push("/write");
    }
  }, [isSuccess]);

  return (
    <div className="container">
      <div className="row mt-5">
        {invalidLoginMessage && (
          <h3 className="text-danger text-center">{invalidLoginMessage}</h3>
        )}
        <form
          className="col-11 com-sm-8 col-md-6 col-lg-5 shadow mx-auto mt-3"
          onSubmit={handleSubmit(onLoginFormSubmit)}
        >
          <h2 className="text-start mb-3 text-primary">Sign In</h2>
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
              <label className="text text-danger ">*Email is Required</label>
            ) : (
              <label htmlFor="username">Email*</label>
            )}
          </div>

          {/* password */}
          <div className="form-floating mb-2">
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

          {/* Submit */}
          <button className="btn btn-warning w-50 d-block mx-auto mb-4 mt-3 rounded-pill">
            Sign in
          </button>

          {/* For sign up */}
          <h5 className="text-center">
            If you are new the Bloggingworld <br /> Please Register..!
          </h5>
          <h6
            className="btn text-primary d-block text-center py-0 mb-4 heading"
            onClick={() => history.push("/register")}
          >
            Create Account
          </h6>
        </form>
      </div>
    </div>
  );
}

export default Login;
