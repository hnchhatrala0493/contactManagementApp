const express = require("express");

const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validationTokenHandler = require("../middleware/validationTokenHandler");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validationTokenHandler, currentUser);

module.exports = router;
