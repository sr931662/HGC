const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../database/UserSchema"); // Import your User model
dotenv.config({ path: "./config.env" });

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "No token provided" 
      });
    }

    // 2. Verify token
    console.log('Received token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
        
    // 3. Check if user still exists
    const user = await User.findById(decoded.userId).select('-pass');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // 4. Attach user to request
    req.user = user;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    
    let message = "Not authorized to access this route";
    if (error.name === "TokenExpiredError") {
      message = "Session expired, please login again";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token";
    }

    res.status(401).json({ 
      success: false,
      message
    });
  }
};

module.exports = authMiddleware;
































// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({ 
//         success: false,
//         message: "No token provided" 
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ 
//       success: false,
//       message: "Not authorized to access this route" 
//     });
//   }
// };

// module.exports = authMiddleware;