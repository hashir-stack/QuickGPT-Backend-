const express = require("express");
const { protect } = require("../middleware/auth.js");
const { createChat, getChats, deleteChat } = require("../controller/chatController.js");



const router = express.Router();

router.get('/create' , protect , createChat);
router.get('/get' , protect , getChats);
router.post('/delete' , protect , deleteChat);

module.exports = router;