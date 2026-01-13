const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.protect = async (req, res,next) =>{
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);

        if(!user){
            return res.json({
                success:false,
                message:"Not Authorized , User not Found..."
            })
        };
        
        req.user = user;
        next();
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}