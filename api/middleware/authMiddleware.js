// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// module.exports = { protect };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   let token;
//   token = req.cookies.token;
//   console.log(token);
//   // Extract token from cookies
//   if (req.cookies && req.cookies.token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // Get the user from the database and attach to request
//       req.user = await User.findById(decoded.id).select("-password");

//       // Forward user details or email
//       req.userId = req.user._id;
//       req.userEmail = req.user.email;

//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     console.log("here");
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token doesn't exist in the cookie. You're not authorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    req.user = user;
    next();
  });
};

const protect = (req, res, next) => {
  verifyToken(req, res, next);
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authenticated",
      });
    }
  });
};

module.exports = { protect, verifyUser };
