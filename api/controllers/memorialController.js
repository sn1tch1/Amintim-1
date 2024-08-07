const { MemorialPage, Tribute } = require("../models/MemorialPage");
const multer = require("multer");
const fs = require("fs");
const Purchase = require("../models/purchase");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const QRCode = require("qrcode");
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Configure Multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Amintim",
    format: async (req, file) => "jpg", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

exports.createMemorialPage = async (req, res) => {
  const userId = req.user.id;
  const {
    title,
    firstName,
    middleName,
    profileImage,
    coverImage,
    lastName,
    note,
    about,
    gallery,
    birthDate,
    deathDate,
    isHuman,
    key, // Add key to request body
  } = req.body;

  try {
    // Find all purchases for the user
    const purchases = await Purchase.find({ userId });

    // Log purchases in a more readable format
    if (!purchases || purchases.length === 0) {
      return res.status(400).json({ message: "Invalid key" });
    }

    let keyFound = false;
    let keyUsed = false;
    let foundPurchase = null;

    // Iterate through purchases to find the key
    for (const purchase of purchases) {
      for (const item of purchase.items) {
        for (const k of item.keys) {
          console.log(JSON.stringify(k, null, 2));
          if (k.key === key) {
            keyFound = true;
            if (k.isUsed) {
              keyUsed = true;
            } else {
              k.isUsed = true;
              foundPurchase = purchase;
            }
            break;
          }
        }
        if (keyFound) break;
      }
      if (keyFound) break;
    }

    if (!keyFound) {
      return res.status(400).json({ message: "Invalid key" });
    }

    if (keyUsed) {
      return res.status(400).json({ message: "Key has already been used" });
    }

    // Create a new memorial page
    const newMemorialPage = new MemorialPage({
      user: userId,
      title,
      firstName,
      middleName,
      profileImage,
      coverImage,
      lastName,
      note,
      about,
      gallery,
      birthDate,
      deathDate,
      isHuman,
    });

    await newMemorialPage.save();

    console.log("here", newMemorialPage);

    if (newMemorialPage) {
      const qrCodeData = `https://amintim.vercel.app/profile/view/${newMemorialPage._id}`;
      const qrCodeBuffer = await QRCode.toBuffer(qrCodeData);

      // Upload the QR code buffer to Cloudinary
      const cloudinaryResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "Amintim",
            public_id: `${newMemorialPage._id}`,
            format: "png",
          },
          (error, result) => {
            if (error) {
              reject(new Error("Failed to upload QR code to Cloudinary"));
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(qrCodeBuffer);
      });

      console.log(
        `QR code generated and saved at: ${cloudinaryResponse.secure_url}`
      );

      // Update the memorial page with the QR code URL
      newMemorialPage.QRCode = cloudinaryResponse.secure_url;
      await newMemorialPage.save();
    }

    // Save the updated purchase with the key marked as used
    await foundPurchase.save();

    res.status(201).json({
      message: "Memorial Page created successfully",
      memorialPage: newMemorialPage,
    });
  } catch (error) {
    console.error("Error creating memorial page:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// File upload handler
exports.uploadFile = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    try {
      console.log("Uploading file:", req.file.filename);
      await uploadProfileImage(req.user.id, req.file.filename); // Ensure this function is defined elsewhere in your code
      res.status(200).json({ filename: req.file.filename });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("Error uploading file.");
    }
  });
};

// Ensure upload directory exists
// const uploadDir = path.join(__dirname, "../uploads/QRs");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const user = req.user;
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

// // exports.createMemorialPage = async (req, res) => {
// //   const user = req.user.id;
// //   const {
// //     title,
// //     firstName,
// //     middleName,
// //     profileImage,
// //     coverImage,
// //     lastName,
// //     note,
// //     about,
// //     gallery,
// //     birthDate,
// //     deathDate,
// //     isHuman,
// //   } = req.body;

// //   try {
// //     const newMemorialPage = new MemorialPage({
// //       user,
// //       title,
// //       firstName,
// //       middleName,
// //       profileImage,
// //       coverImage,
// //       lastName,
// //       note,
// //       about,
// //       gallery,
// //       birthDate,
// //       deathDate,
// //       isHuman,
// //     });

// //     await newMemorialPage.save();

// //     console.log("here", newMemorialPage);

// //     if (newMemorialPage) {
// //       const qrCodeFilename = `${newMemorialPage._id}.png`;
// //       const qrCodeData = `http://localhost:5173/profile/view/${newMemorialPage._id}`;
// //       const qrCodePath = path.join(uploadDir, qrCodeFilename);

// //       // Generate QR code and save it to disk
// //       await QRCode.toFile(qrCodePath, qrCodeData);

// //       console.log(`QR code generated and saved at: ${qrCodeData}`);
// //     }

// //     res.status(201).json({
// //       message: "Memorial Page created successfully",
// //       memorialPage: newMemorialPage,
// //     });
// //   } catch (error) {
// //     console.error("Error creating memorial page:", error);
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // };

// exports.createMemorialPage = async (req, res) => {
//   const userId = req.user.id;
//   const {
//     title,
//     firstName,
//     middleName,
//     profileImage,
//     coverImage,
//     lastName,
//     note,
//     about,
//     gallery,
//     birthDate,
//     deathDate,
//     isHuman,
//     key, // Add key to request body
//   } = req.body;

//   try {
//     // Find all purchases for the user
//     const purchases = await Purchase.find({ userId });

//     // Log purchases in a more readable format

//     if (!purchases || purchases.length === 0) {
//       return res.status(400).json({ message: "Invalid key" });
//     }

//     let keyFound = false;
//     let keyUsed = false;
//     let foundPurchase = null;

//     // Iterate through purchases to find the key
//     for (const purchase of purchases) {
//       for (const item of purchase.items) {
//         for (const k of item.keys) {
//           console.log(JSON.stringify(k, null, 2));
//           if (k.key === key) {
//             keyFound = true;
//             if (k.isUsed) {
//               keyUsed = true;
//             } else {
//               k.isUsed = true;
//               foundPurchase = purchase;
//             }
//             break;
//           }
//         }
//         if (keyFound) break;
//       }
//       if (keyFound) break;
//     }

//     if (!keyFound) {
//       return res.status(400).json({ message: "Invalid key" });
//     }

//     if (keyUsed) {
//       return res.status(400).json({ message: "Key has already been used" });
//     }

//     // Create a new memorial page
//     const newMemorialPage = new MemorialPage({
//       user: userId,
//       title,
//       firstName,
//       middleName,
//       profileImage,
//       coverImage,
//       lastName,
//       note,
//       about,
//       gallery,
//       birthDate,
//       deathDate,
//       isHuman,
//     });

//     await newMemorialPage.save();

//     console.log("here", newMemorialPage);

//     if (newMemorialPage) {
//       const qrCodeFilename = `${newMemorialPage._id}.png`;
//       const qrCodeData = `http://localhost:5173/profile/view/${newMemorialPage._id}`;
//       const qrCodePath = path.join(uploadDir, qrCodeFilename);

//       // Generate QR code and save it to disk
//       await QRCode.toFile(qrCodePath, qrCodeData);

//       console.log(`QR code generated and saved at: ${qrCodeData}`);
//     }

//     // Save the updated purchase with the key marked as used
//     await foundPurchase.save();

//     res.status(201).json({
//       message: "Memorial Page created successfully",
//       memorialPage: newMemorialPage,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // File upload handler
// exports.uploadFile = (req, res) => {
//   upload.single("file")(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ message: err.message });
//     } else if (err) {
//       return res.status(500).json({ message: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     try {
//       console.log("Uploading file:", req.file.filename);
//       await uploadProfileImage(req.user.id, req.file.filename); // Ensure this function is defined elsewhere in your code
//       res.status(200).json({ filename: req.file.filename });
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       res.status(500).send("Error uploading file.");
//     }
//   });
// };

// Get all memorial pages
exports.getAllMemorialPages = async (req, res) => {
  try {
    const memorialPages = await MemorialPage.find().populate("user");
    res.status(200).json(memorialPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all memorial pages by user
exports.getMemorialPagesByUser = async (req, res) => {
  try {
    const user = req.user.id;
    // const user = req.params.userId;
    console.log(user);
    const memorialPages = await MemorialPage.find({ user });
    console.log(memorialPages);
    if (!memorialPages) {
      return res
        .status(404)
        .json({ message: "No memorial pages found for this user" });
    }
    res.status(200).json(memorialPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a memorial page by ID
exports.getMemorialPageById = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findById(req.params.id).populate(
      "user"
    );
    console.log("memor");
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json(memorialPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a memorial page
exports.updateMemorialPage = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(memorialPage);
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json(memorialPage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a memorial page
exports.deleteMemorialPage = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findByIdAndDelete(req.params.id);
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json({ message: "Memorial page deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new tribute
exports.createTribute = async (req, res) => {
  const user = req.user.id;
  try {
    // Find the memorial page by ID
    const memorialPage = await MemorialPage.findById(req.params.id);
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }

    // Create a new tribute
    const tribute = new Tribute({
      user,
      message: req.body.message,
      memorialPage: req.params.id, // Set the memorial page reference
    });

    console.log("why", tribute);
    // Save the tribute
    await tribute.save();

    // Add the tribute ID to the tributes array of the memorial page
    memorialPage.tributes.push(tribute._id);

    // Save the updated memorial page
    await memorialPage.save();

    // Populate the tributes field after saving the tribute
    await memorialPage.populate("tributes");

    // Return the updated memorial page with populated tributes
    res.status(201).json(memorialPage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tributes for a memorial page
exports.getAllTributes = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findById(req.params.id).populate({
      path: "tributes",
      populate: {
        path: "user", // Populate user information within tributes
        select: "firstName profileImage", // Select only the fields you need
      },
    });
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json(memorialPage.tributes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a tribute by ID
exports.getTributeById = async (req, res) => {
  try {
    const tribute = await Tribute.findById(req.params.id);
    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }
    res.status(200).json(tribute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tribute
exports.updateTribute = async (req, res) => {
  try {
    const tribute = await Tribute.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }
    res.status(200).json(tribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a tribute
exports.deleteTribute = async (req, res) => {
  try {
    const tribute = await Tribute.findByIdAndDelete(req.params.id);
    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }
    const memorialPage = await MemorialPage.findOne({
      "tributes._id": tribute._id,
    });
    if (memorialPage) {
      memorialPage.tributes.pull(tribute._id);
      await memorialPage.save();
    }
    res.status(200).json({ message: "Tribute deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
