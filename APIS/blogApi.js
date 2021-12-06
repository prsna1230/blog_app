// create a route obj
const express = require("express");
const blogApiObj = express.Router();
const expressAsyncHandler = require("express-async-handler");
const multerObj = require("./middleware/addlabelImage");
const checkToken = require("./middleware/verifyToken");
const ObjectId = require("mongodb").ObjectId;

// add bodyparser middleware
blogApiObj.use(express.json());

// get blogcollection
let blogCollection;
blogApiObj.use((req, res, next) => {
  blogCollection = req.app.get("blogCollection");
  next();
});

// add blog
blogApiObj.post(
  "/addblog",
  checkToken,
  multerObj.array("LabelImg", 5),
  expressAsyncHandler(async (req, res) => {
    // get blogObj
    const blogObj = JSON.parse(req.body.blogObj);
    // add image url to blogObj
    var imageUrlList = [];

    for (var i = 0; i < req.files.length; i++) {
      var localFilePath = req.files[i].path;
      imageUrlList.push(localFilePath);
    }
    blogObj.image = [...imageUrlList];
    await blogCollection.insertOne(blogObj);
    res.send({ message: "New Blog Added", payload: blogObj });
  })
);

//delete blog
blogApiObj.delete(
  "/deleteblog/:id",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    await blogCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send({ message: "Blog deleted" });
  })
);

//update hotel
blogApiObj.put(
  "/editblog/:id",
  checkToken,
  multerObj.array("LabelImg", 5),
  expressAsyncHandler(async (req, res) => {
    // get hotelObj
    const blogObj = JSON.parse(req.body.blogObj);

    // add image url to blogObj
    var imageUrlList = [];

    for (var i = 0; i < req.files.length; i++) {
      var localFilePath = req.files[i].path;
      imageUrlList.push(localFilePath);
    }

    blogObj.image = [...imageUrlList];
    let newblogObj = { ...blogObj };
    delete blogObj._id;
    const id = req.params.id;
    await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: blogObj }
    );

    res.send({ message: "Blog updated", payload: newblogObj });
  })
);

// get blog
blogApiObj.get(
  "/getblog",
  expressAsyncHandler(async (req, res) => {
    let blog = await blogCollection.find().toArray();
    res.send({ message: "Success", payload: blog });
  })
);

module.exports = blogApiObj;
