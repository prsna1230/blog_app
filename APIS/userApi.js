const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const userApiObj = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userdpObj = require("./middleware/adduserImage");

// body parser middleware
userApiObj.use(express.json());

let userCollection;
// get userccollection object(middle-ware)
userApiObj.use((req, res, next) => {
  userCollection = req.app.get("userCollection");
  next();
});

// user registration
userApiObj.post(
  "/register",
  userdpObj.single("profileimage"),
  expressAsyncHandler(async (req, res) => {
    const newUser = JSON.parse(req.body.userobj);
    console.log(req.file);
    // add image url to userOBJ
    if (req.file !== undefined) newUser.profileimage = req.file.path;
    else {
      newUser.profileimage =
        "https://cdn1.vectorstock.com/i/thumb-large/82/55/anonymous-user-circle-icon-vector-18958255.jpg";
    }
    let user = await userCollection.findOne({ email: newUser.email });
    console.log("user:", user);
    // if user existed send res as "username existed"
    if (user !== null) {
      res.send({ message: "email already Existed choose another" });
    } else {
      // has password
      let hashedPassword = await bcryptjs.hash(newUser.password, 3);
      // replace plain password to userCollection
      newUser.password = hashedPassword;
      // insert userObj to userCollection
      await userCollection.insertOne(newUser);
      // send res
      res.send({ message: "Success" });
    }
  })
);

// user Login
userApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get user credintial obj
    let userCredentialsObj = req.body;
    // find user by username
    let user = await userCollection.findOne({
      email: userCredentialsObj.email,
    });
    // if user is not there
    if (user === null) {
      res.send({ message: "Invalid username" });
    }
    // if user found
    else {
      // compare passwords
      let status = await bcryptjs.compare(
        userCredentialsObj.password,
        user.password
      );
      // if not equal
      if (status === false) {
        res.send({ message: "Invalid Password" });
      }
      // is status is true
      else {
        // create and send token
        let signedToken = await jwt.sign(
          { username: user.username },
          process.env.SECRET
        );
        // send token as response
        res.send({ message: "Success", token: signedToken, user: user });
      }
    }
  })
);

module.exports = userApiObj;
