const Chat = require("../model/Chat");


// Controller for creating new chat
exports.createChat = async ( req , res )=>{
    try {
        // feting the user id from request body
        const userId = req.user._id;

        const chatData = {
            userId,
            message: [],
            name: "New Chat",
            userName: req.user.name
        };

        await Chat.create(chatData);

        res.json({
            success:true,
            message:"Chat Created Successfully..."
        });
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}