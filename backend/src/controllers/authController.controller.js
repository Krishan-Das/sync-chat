import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"


// --- sign up ---
export async function register(req, res) {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password do not match",
        success: false
      })
    }

    const existingUser = await userModel.findOne({
      email
    })

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false
      })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashPassword
    })

    return res.status(201).json({
      message: "User created successfully.",
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName
      }
    })

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

// --- sign in --- 
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All feilds are required",
        success: false
      })
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    return res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000
    }).status(200).json({
      message: "Logged in successfully",
      success: true,
      user:{
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        bio: user.bio,
        profilePicture:user.profilePicture,
        isOnline: user.isOnline
      }
    })

  } catch (error) {
    console.log("Server error:", error);
    return res.status(500).json({
      message: "Internal server problem"
    })
  }
}

// --- get me ---
export async function getMe(req, res) {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      })
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      user
    })
  } catch (error) {
    console.log("Error:", error)
    return res.status(500).json({
      message: "Internal server problem"
    })
  }
}


// --- find all other users ---
export async function allOtherUsers(req, res) {
  try {
    const userId = req.userId;
    const users = await userModel.find({ _id: { $ne: userId } }).select('fullName bio profilePicture email isOnline');

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        success: false
      })
    }

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

// --- logout ---
export async function logOut(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false
    })
  }


  return res.clearCookie("token").status(200).json({
    message: "Logged out successfully",
    success: true
  });


}