const express = require("express")
const expressAsyncHandler = require("express-async-handler")
const userApiObj= express.Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



// body parser middleware
userApiObj.use(express.json())

let userCollection;
// get userccollection object(middle-ware)
userApiObj.use((req,res,next)=>{
    userCollection=req.app.get("userCollection")
    next()
})

// user registration
userApiObj.post("/register", expressAsyncHandler (async (req,res)=>{
    const newUser = req.body;
    let user = await userCollection.findOne({username:newUser.username})
    // if user existed send res as "username existed"
    if(user!==null){
        res.send({message:"Username already Existed choose another"})
    }
    else{
        // has password
        let hashedPassword = await bcryptjs.hash(newUser.password,3)
        // replace plain password to userCollection
        newUser.password = hashedPassword;
        // insert userObj to userCollection
        await userCollection.insertOne(newUser)
        // send res
        res.send({message:"Success"})
    }
}))

// user Login
userApiObj.post('/login', expressAsyncHandler(async (req,res)=>{
    // get user credintial obj
    let userCredentialsObj = req.body;
    // find user by username
    let user = await userCollection.findOne({username:userCredentialsObj.username})
    // if user is not there
    if(user === null){
        res.send({message:"Invalid username"})
    }
    // if user found
    else{
        // compare passwords
        let status = await bcryptjs.compare(userCredentialsObj.password,user.password)
        // if not equal
        if(status === false){
            res.send({message:"Invalid Password"})
        }
        // is status is true
        else{
            // create and send token
            let signedToken = await jwt.sign({username:user.username}, process.env.SECRET)
            // send token as response
            res.send({message:"Success", token:signedToken, user:user})
        }
    }
}))
























module.exports=userApiObj;
