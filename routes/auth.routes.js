const router = require("express").Router()
const authController = require("../controllers/auth.controllers")

router
    .post("/signUp", authController.signUp)
    .post("/signIn", authController.signIn)
    .post("/signOut", authController.signOut)
    .post("/signIn-with-google", authController.signInWithGoogle)
    .post("/verify-email", authController.verifyEmail)
    .post("/verify-otp", authController.verifyOTP)
    .patch("/reset-password", authController.resetPassword)

module.exports = router
