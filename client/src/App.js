import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom'
import Mainpage from './components/Mainpage';
import { useDispatch, useSelector } from 'react-redux';
import {clearLoginStatus} from './redux-store/userSlice'


function App() {
  let {isSuccess} = useSelector(state=>state.user)
  let activeLinkStyle={
    color:"#F92041",
    fontWeight:"bold"
  }
  let dispatch = useDispatch()  
  const onUserLogout=()=>{
    // remove token from localstorage
    localStorage.clear()
    dispatch(clearLoginStatus())
    
  }


  return (
       <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
            <div className="container-fluid ">
              <h3 className="navbar-brand">Blog</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
                    <ul className="navbar-nav">
                      {!isSuccess ?
                      <>
                        <li className="nav-item">
                          <NavLink className="nav-link"activeStyle={activeLinkStyle} to="/login">Signin</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link"  activeStyle={activeLinkStyle} to="/register">Signup</NavLink>
                        </li>
                      </>:
                      <>
                        <li className="nav-item">
                            <NavLink className="nav-link navbarText"  activeStyle={activeLinkStyle} onClick={onUserLogout} to='/login'>Logout</NavLink>
                        </li>
                      </>
                      }
                    </ul>
                  </div>
            </div>
          </nav>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/mainpage">
              <Mainpage/>
            </Route>
          </Switch>
       </BrowserRouter>
  );
}

export default App;
