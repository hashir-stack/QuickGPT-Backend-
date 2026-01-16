const express = require("express");
const { getPlans, purchasePlan } = require("../controller/creditController");
const { protect } = require("../middleware/auth");


const router = express.Router();


router.get("/plan" , getPlans);
router.post("/purchase" , protect , purchasePlan);

module.exports = router;