const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (userId) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
    return token;
}
// Controller to register user
exports.registerUser =async ( req , res) =>{
    // fetching the data from request body
        const{ name , email , password } = req.body;
    try {
        // Validation
        if(!name || !email || !password){
            return res.json({
                success:false,
                message:"All feild are required..."
            })
        }
        // check user exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({
                success:false,
                message:"USer Already Exists..."
            })
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password,10);

        // creating the new user
        const newUser = await User.create({
            name,email,password:hashedPassword
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
            success:false,
            message:error.message
        })
    }
}