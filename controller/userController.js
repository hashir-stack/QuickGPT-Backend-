const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Chat = require("../model/Chat");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
// Controller to register user
exports.registerUser = async (req, res) => {
  // fetching the data from request body
  const { name, email, password } = req.body;
  try {
    // Validation
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All feild are required...",
      });
    }
    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "USer Already Exists...",
      });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    // sending successfull response
    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created Succefully...",
    });
  } catch (error) {
    return res.josn({
      success: false,
      message: error.message,
    });
  }
};

// Controller for login
exports.loginUser = async (req, res) => {
  // fetching the data from req body
  const { email, password } = req.body;
  try {
    // finding the user on the basis of email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials...",
      });
    }

    // comparing the the password for the validation
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Incorrect Password...",
      });
    }

    // generating the token
    const token = generateToken(user._id);

    res.json({
      success: true,
      user,
      token,
      message: "Successfully login...",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to get user
exports.getUser = async ( req , res ) =>{
  try {
    const user = req.user;
    res.json({
      success:true,
      user
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}

// Controller to get All Published Image
exports.getPublishedImages = async( req , res )=>{
  try {
    const publishedImageMessages = await Chat.aggregate([
      {$unwind:"$messages"},
      {
        $match:{
          "messages.isImage":true,
          "messages.isPublished":true
        }
      },
      {
        $project:{
          _id:0,
          imageUrl:"$messages.content",
          userName:"$userName"
        }
      }
    ]);

    res.json({
      success:true,
      images:publishedImageMessages.reverse()
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}
