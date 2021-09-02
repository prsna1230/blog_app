import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {userLogin} from '../redux-store/userSlice'
import {useHistory} from 'react-router-dom'
import Mainpage from './Mainpage'
function Login() {

    let history =useHistory()
    let dispatch = useDispatch()
    let{userObj,isSuccess,isLoading,isError,invalidLoginMessage}=useSelector((state)=>state.user)
    let{register, handleSubmit, formState:{errors}}=useForm();
     let [userCredentialsObj,setUserCredentialsObj]=useState(
        {
            type:"",
            username:"",
            password:""
        }
    )
    // form submit
    function onLoginFormSubmit(userObj){
        setUserCredentialsObj({...userObj})
        dispatch(userLogin(userObj))
    }

    useEffect(()=>{
        if(isSuccess){
            history.push("/mainpage")
        }
    },[isSuccess])
    

    return (
        <div className="row mt-5">
            {invalidLoginMessage && <h3 className="text-danger text-center">{invalidLoginMessage}</h3>}
            <form className="col-11 com-sm-8 col-md-6 col-lg-5 shadow mx-auto mt-3" onSubmit={handleSubmit(onLoginFormSubmit)}>
                <h2 className="text-start mb-3 text-primary">Sign In</h2>
                    {/* username */}
                    <div className="form-floating mb-4">
                        <input type="text" name="username" id="username" className="form-control" placeholder="username" 
                        {...register("username",{required:true})}/>
                        <label htmlFor="username">Username*</label>
                    </div>
                    {errors.username?.type==='required' && <p className="alert alert-danger ">*Username is Required</p>}

                    {/* password */}
                    <div className="form-floating mb-2">
                        <input type="password" name="password" id="password" className="form-control" placeholder="password" 
                        {...register("password",{required:true})}/>
                        <label htmlFor="password">Password*</label>
                    </div>
                    {errors.password?.type==='required' && <p className="alert alert-danger ">*password is Required</p>}

                    {/* Submit */}
                    <button className="btn btn-warning w-50 d-block mx-auto mb-4 mt-3 rounded-pill">Sign in</button>
            </form>
        </div>
    )
}

export default Login
