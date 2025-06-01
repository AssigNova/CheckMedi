const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/roles", userController.getRoles);
router.post("/verify-license", userController.verifyLicense);
router.route("/preferences").get(userController.getPreferences).put(userController.updatePreferences);
router.get("/", userController.listUsers);

module.exports = router;
