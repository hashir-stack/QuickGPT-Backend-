const express = require("express");
const { protect } = require("../middleware/auth.js");
const { textMessageController, imageMessageController } = require("../controller/messageController.js");


const router = express.Router();

router.post('/text' , protect , textMessageController);
router.post('/image' , protect , imageMessageController);

module.exports = router;