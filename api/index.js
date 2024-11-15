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

const allowedOrigins = [
  "http://localhost:5173",
  "https://amintim.vercel.app",
  "https://amintim-1.vercel.app",
  "https://amintim.ro",
  "https://www.amintim.ro",
];

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
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Amintim",
    format: async (req, file) => {
      // Adjust based on file type
      return file.mimetype.split("/")[1];
    },
    public_id: (req, file) => file.originalname,
  },
});

const fileFilter = (req, file, cb) => {
  // Define allowed MIME types and file extensions
  const allowedTypes = {
    "image/jpeg": /jpeg|jpg/,
    "image/png": /png/,
    "image/gif": /gif/,
    "audio/mpeg": /mp3/,
    "audio/wav": /wav/,
    "video/mp4": /mp4/,
    "video/x-msvideo": /avi/,
  };

  const extname = Object.values(allowedTypes).some((regex) =>
    regex.test(path.extname(file.originalname).toLowerCase())
  );
  const mimetype = Object.keys(allowedTypes).includes(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(
      new Error(
        "Invalid file type. Only images, audio, and video files are allowed."
      )
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.post("/api/users/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: req.file.path });
});

app.post("/api/users/upload/media", upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.error("No files uploaded or files array is empty");
    return res.status(400).json({ error: "No files uploaded" });
  }

  console.log("Uploaded files:", req.files);

  try {
    const urls = req.files.map((file) => file.path);
    res.json({ urls: urls });
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ error: "Error processing files" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.post("/api/users/upload/audio", async (req, res) => {
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    const { path } = req.file;

    const fName = req.file.originalname.split(".")[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },

      // Send cloudinary response or catch error
      (err, audio) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        res.send(audio);
      }
    );
  });
});

//...

app.post("/api/users/upload/video", async (req, res) => {
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required video extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 30 * 1024 * 1024,
    },
    fileFilter,
  }).single("video");

  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "video",
        public_id: `VideoUploads/${fName}`,
        chunk_size: 6000000,
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            audio_codec: "none",
          },
          {
            width: 160,
            height: 100,
            crop: "crop",
            gravity: "south",
            audio_codec: "none",
          },
        ],
      },

      // Send cloudinary response or catch error
      (err, video) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        return res.send(video);
      }
    );
  });
});

app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/memorial", memorialRoutes);
app.use("/api/tributes", tributeRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/amintim")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send("The application is running.");
});
