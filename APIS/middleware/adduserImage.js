// import cloudinary v2
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

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
      folder: "PROFILE_PIC",
      public_key: file.fieldname + "-" + Date.now(),
    };
  },
});

// comfigure multer
const userdpObj = multer({ storage: clstorage });

// export
module.exports = userdpObj;
