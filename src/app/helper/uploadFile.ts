import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join( "/var/www/uploads"));
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: async function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// upload single image
// const uploadprofileImage = upload.single("profileImage");
// const uploadPackageImage = upload.single("packageImage");
// const uploadServiceImage = upload.single("serviceImage");
// const uploadPortifiloImage = upload.single("portifolioImage");
const uploadProductImages = upload.fields([
  { name: "thumbnailImage", maxCount: 1 }, // Single file for company logo
  { name: "productImages", maxCount: 10 }, // Multiple files for company images
]);



export const fileUploader = {
  upload,
  uploadProductImages
  // uploadprofileImage,
  // uploadRiderVehicleInfo,
  // uploadPackageImage,
  // uploadServiceImage,
  // uploadPortifiloImage,
};
