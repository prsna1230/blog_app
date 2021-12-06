// import cloudinary v2
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

// dotnet env
require("dotenv").config();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// configure cloudinary storage
const clstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "LABEL_IMAGES",
      public_key: file.fieldname + "-" + Date.now(),
    };
  },
});

// configure multer
const labelimageObj = multer({ storage: clstorage });

// export
module.exports = labelimageObj;
