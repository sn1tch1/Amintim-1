const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const purchaseRoutes = require("./routes/purchaseRoutes.js");
const { uploadProfileImage } = require("./controllers/userController.js");
const { protect } = require("./middleware/authMiddleware.js");
const memorialRoutes = require("./routes/memorialRoutes.js");
const tributeRoutes = require("./routes/tributeRoutes.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

dotenv.config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const allowedOrigins = ["http://localhost:5173", "https://amintim.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Configure Cloudinary
cloudinary.config({
  cloud_name: "mern-practice",
  api_key: "748289359289231",
  api_secret: "Qz_0OA9kSwfu0sV5DVCYet2TfHc",
});

// Set up multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Amintim",
    format: async (req, file) => "jpg", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

app.post("/api/users/upload", upload.single("file"), (req, res) => {
  res.json({ url: req.file.path });
});

app.post("/api/users/upload/media", upload.array("files", 10), (req, res) => {
  const files = req.files;
  const urls = files.map((file) => file.path);
  res.json({ urls: urls });
});

// const uploadDir = path.join(__dirname, "/uploads/users");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Use user information to name the file
//     const user = req.user; // Example, adjust based on your auth implementation
//     console.log(user);
//     const userId = user ? user.id : "default";
//     const ext = file.originalname.split(".").pop();
//     const filename = `${userId}_${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 510 * 1024 * 1024, // 510 MB
//   },
// });

// app.post(
//   "/api/users/upload",
//   protect,
//   upload.single("file"),
//   async (req, res) => {
//     if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//     }
//     try {
//       console.log("Uploading file:", req.file.filename);
//       await uploadProfileImage(req.user.id, req.file.filename);
//       res.status(200).json({ filename: req.file.filename });
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       res.status(500).send("Error uploading file.");
//     }
//   }
// );

// const mediaImagesDir = path.join(__dirname, "/uploads/users/mediaImages");
// if (!fs.existsSync(mediaImagesDir)) {
//   fs.mkdirSync(mediaImagesDir, { recursive: true });
// }

// const mediaImagesStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, mediaImagesDir);
//   },
//   filename: function (req, file, cb) {
//     const user = req.user;
//     const userId = user ? user.id : "default";
//     const ext = file.originalname.split(".").pop();
//     const filename = `${userId}_${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });

// const uploadMediaImages = multer({
//   storage: mediaImagesStorage,
//   limits: {
//     fileSize: 510 * 1024 * 1024, // 510 MB
//   },
// });

// app.post(
//   "/api/users/upload/mediaImages",
//   protect,
//   uploadMediaImages.array("files", 10), // Adjust the second parameter to limit the number of files
//   async (req, res) => {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send("No files uploaded.");
//     }
//     try {
//       const filenames = req.files.map((file) => file.filename);
//       console.log("Uploading files:", filenames);
//       await Promise.all(
//         filenames.map((filename) => uploadProfileImage(req.user.id, filename))
//       );
//       res.status(200).json({ filenames });
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       res.status(500).send("Error uploading files.");
//     }
//   }
// );

app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/memorial", memorialRoutes);
app.use("/api/tributes", tributeRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send("The application is running.");
});
