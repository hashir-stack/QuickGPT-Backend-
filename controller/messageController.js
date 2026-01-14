const imagekit = require("../config/imageKit.js");
const openai = require("../config/openAi.js");
const Chat = require("../model/Chat.js");
const User = require("../model/User.js");
const axios = require("axios");

// Controller for generating the text response only
exports.textMessageController = async (req, res) => {
  try {
    // fetching the userId from request
    const userId = req.user._id;

    // check credits
    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }
    // fetching the data from request body
    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });
    // Push User message
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
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    res.json({
      success: true,
      reply,
    });

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Controller for Image Generation
exports.imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    // check credits
    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }

    const { prompt, chatId, isPublished } = req.body;

    // find Chat
    const chat = await Chat.findOne({ userId, _id: chatId });
    // Push User message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Encode the Prompt
    const encodedPrompt = encodeURIComponent(prompt);

    // Construct ImageKit Ai Url
    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

    // ImageKit generation fetching
    const aiImageResponse = await axios.get(generatedImageUrl,{responseType:"arraybuffer"});

    // Convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;

    // upload to imagekit media
    const uploadResponse = await imagekit.upload({
        file: base64Image,
        fileName:`${Date.now()}.png`,
        folder:"quickgpt"
    });

    const reply = {
      role:'assistant',
      content:uploadResponse,
      timestamp: Date.now(),
      isImage: true,
      isPublished
    };

    res.json({
      success: true,
      reply,
    });

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

  } catch (error) {
    return res.json({
        success:false,
        message:error.message
    })
  }
};
