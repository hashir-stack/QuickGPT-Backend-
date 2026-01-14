const Chat = require("../model/Chat.js");
const User = require("../model/User.js");

// Controller for generating the text response only
exports.textMessageController = async (req, res) => {
  try {
    // fetching the userId from request
    const userId = req.user._id;
    // fetching the data from request body
    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt ,
        },
      ],
    });

    const reply = {...choices[0].message , timestamp: Date.now(), isImage: false };

    res.json({
        success:true,
        reply
    });

    chat.messages.push(reply);
    await chat.save()

    await User.updateOne({_id: userId} , {$inc :{credits: -1}});

  } catch (error) {
    return res.json({
        success:false,
        message:error.message
    })
  }
};
