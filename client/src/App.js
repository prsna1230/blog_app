import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Write from "./components/Write";
import About from "./components/About";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginStatus } from "./redux-store/userSlice";

function App() {
  let { isSuccess } = useSelector((state) => state.user);
  let username = localStorage.getItem("username");
  let profileimage = localStorage.getItem("profileimage");
  let activeLinkStyle = {
    color: "#F92041",
    fontWeight: "bold",
  };
  let dispatch = useDispatch();
  const onUserLogout = () => {
    // remove token from localstorage
    localStorage.clear();
    dispatch(clearLoginStatus());
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-2 mb-5 sticky-top">
        <div className="container-fluid ">
          <h3 className="navbar-brand fs-4">BloggingWorld</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end "
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {!isSuccess ? (
                <>
                  <div className="navbar-nav">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link fs-3"
                        activeStyle={activeLinkStyle}
                        to="/login"
                      >
                        Write
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link fs-3"
                        activeStyle={activeLinkStyle}
                        to="/about"
                      >
                        Aboutus
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link fs-3"
                        activeStyle={activeLinkStyle}
                        to="/contact"
                      >
                        ContactUs
                      </NavLink>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <div className="dropdown">
                      <a
                        class="btn btn-danger dropdown-toggle text-capitalize"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={profileimage}
                          className="rounded-pill"
                          alt="profileimage"
                          width="25px"
                        />
                        {username}
                      </a>

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li className="dropdown-item">
                          <h6 onClick={onUserLogout} to="/login">
                            Logout
                          </h6>
                        </li>
                        <li className="dropdown-item">Userdashboard</li>
                      </ul>
                    </div>
                  </li>
                </>

                //    <div class="dropdown">
                //   <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                //     Dropdown link
                //   </a>

                //   <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                //     <li><a class="dropdown-item" href="#">Action</a></li>
                //     <li><a class="dropdown-item" href="#">Another action</a></li>
                //     <li><a class="dropdown-item" href="#">Something else here</a></li>
                //   </ul>
                // </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/write">
          <Write />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
