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
};

// Contoller to get all chats
exports.getChats = async (req,res)=>{
    try {
        const userId = req.user._id;

        const chats = (await Chat.find({userId})).toSorted({updatedAt: -1});

        res.json({
            success:true,
            chats,
            message:"Successfully fetched all the chats data..."
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
};

// Controller to delete the chats
exports.deleteChat = async(req,res)=>{
    try {
        const userId = req.user._id;
        const {chatId} = req.body;

        await Chat.deleteOne({_id:chatId , userId});

        res.json({
            success:true,
            message:"Successfully Deleted the Chat..."
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
};