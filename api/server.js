const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const { uploadProfileImage } = require("./controllers/userController.js");
const { protect } = require("./middleware/authMiddleware.js");
const memorialRoutes = require("./routes/memorialRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const uploadDir = path.join(__dirname, "../client/public/users");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use user information to name the file
    const user = req.user; // Example, adjust based on your auth implementation
    console.log(user);
    const userId = user ? user.id : "default";
    const ext = file.originalname.split(".").pop();
    const filename = `${userId}_${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 510 * 1024 * 1024, // 510 MB
  },
});

app.post(
  "/api/users/upload",
  protect,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    try {
      console.log("Uploading file:", req.file.filename);
      await uploadProfileImage(req.user.id, req.file.filename);
      res.status(200).json({ filename: req.file.filename });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("Error uploading file.");
    }
  }
);

app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/memorial", memorialRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
