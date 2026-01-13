const express = require("express");
const { registerUser, loginUser, getUser } = require("../controller/userController.js");
const { protect } = require("../middleware/auth.js");


const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/data" , protect , getUser);

module.exports = router;