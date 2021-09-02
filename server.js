const express = require("express");
const app = express()

// configure dotenv
require("dotenv").config();

const path = require("path")
// connect bulid of react with express
app.use(express.static(path.join(__dirname,'./client/build')))


// import APIS Object
const userApiObj = require("./APIS/userApi")

// user userAPiObj when path starts with users
app.use("/users",userApiObj)



// import mongodb module
const mongoClient = require("mongodb").MongoClient;







// get database url
const DATABASE_URL = process.env.DATABASE_URL;


// connect
mongoClient.connect(DATABASE_URL,(err,client)=>{
    if(err){
        console.log("err in db connect",err);
    }
    else{
        // get obj of database
        let databaseObject = client.db("project2")
        // get obj of collection
        let userCollection = databaseObject.collection("usercollection")


        // set to app project
        app.set("userCollection",userCollection)


        console.log("bruh..DB Connection Success..!!");
    }
})



// error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error Occured", reason:err.message})
})











// assign port number
const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`Server listening to ${PORT}`))