const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");   
const userRoutes = require("./routes/userRoutes.js");
const purchaseRoutes = require("./routes/purchaseRoutes.js");
const memorialRoutes = require("./routes/memorialRoutes.js");
const tributeRoutes = require("./routes/tributeRoutes.js");
const priceRoutes = require("./routes/priceRoutes.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// CORS setup
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
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Google Cloud Storage Configuration
const storage = new Storage({
  keyFilename: path.join(__dirname, "amintim-d40bfe205790.json"), // Path to service account key
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const uploadToGoogleCloud = async (file) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname);
  const blobStream = blob.createWriteStream({
    resumable: true,
  });

  return new Promise((resolve, reject) => {
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", (err) => {
        reject(err);
      })
      .end(buffer);
  });
};

// Multer Setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

// Routes
app.post("/api/users/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = await uploadToGoogleCloud(req.file);
    // const baseUrl = fileUrl.split("?")[0].replace(/\/[^/]*$/, ""); // Removes everything after the last slash

    // console.log(baseUrl);
    console.log("profile", fileUrl);
    res.json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post(
  "/api/users/upload/media",
  upload.array("files", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const uploadPromises = req.files.map((file) => uploadToGoogleCloud(file));
      const urls = await Promise.all(uploadPromises);
      res.json({ urls });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  }
);

// Video Upload Route
app.post(
  "/api/users/upload/video",
  upload.single("video"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No video uploaded" });
      }

      const fileUrl = await uploadToGoogleCloud(req.file);

      console.log("video", fileUrl);
      res.json({ url: fileUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload video" });
    }
  }
);

// Audio Upload Route
app.post(
  "/api/users/upload/audio",
  upload.single("audio"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio uploaded" });
      }

      const fileUrl = await uploadToGoogleCloud(req.file);
      console.log("audio", fileUrl);
      res.json({ url: fileUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload audio" });
    }
  }
);

// Additional API routes
app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/memorial", memorialRoutes);
app.use("/api/tributes", tributeRoutes);
app.use("/api/price", priceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/amintim")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Default route
app.get("/", (req, res) => {
  res.status(200).send("The application is running.");
});
