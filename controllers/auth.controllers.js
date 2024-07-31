const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const { OAuth2Client } = require("google-auth-library")
const { customValidator } = require("../utils/customValidators")
const User = require("../models/User")
const { genrateToken } = require("../utils/genrateToken")
const crypto = require("crypto")
const { sendEmail } = require("../utils/email")
const jwt = require("jsonwebtoken")




exports.signUp = asyncHandler(async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body

    const { isError, error } = customValidator({ name, email, phone, password, cpassword })
    if (isError) {
        return res.status(400).json({ message: error.length > 1 ? "All Fields required" : error })
    }

    const user = await User.findOne({ $or: [{ email }, { phone }] })
    if (user) {
        if (user.email === email) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (user.phone === phone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const result = await User.create({ name, email, phone, password: hashPassword })

    res.status(200).json({
        message: "User SignUp Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
        }
    })
})


exports.signIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const { isError, error } = customValidator({ username, password })
    if (isError) {
        return res.status(400).json({ message: error.length > 1 ? "All Fields required" : error })
    }

    const result = await User.findOne({
        $or: [
            { email: username },
            { phone: username },
        ]
    })
    if (!result) {
        return res.status(400).json({ message: "Invalid Credential - Username do not match" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(400).json({ message: "Invalid Credential - Password do not match" })
    }

    const token = genrateToken({ userId: result._id })
    console.log(token);

    res.cookie("auth", token, { maxAge: 864000000, httpOnly: true, secure: process.env.NODE_ENV === "production" })

    res.status(200).json({
        message: "Logged in successfully", result: {
            _id: result._id,
            name: result.name,
            username: result.email
        }
    })
})

exports.signOut = asyncHandler(async (req, res) => {
    res.clearCookie("auth")
    res.status(200).json({ message: "User Logout Success" })
})

exports.signInWithGoogle = asyncHandler(async (req, res) => {
    const { credential } = req.body

    const client = new OAuth2Client({ credential: process.env.GOOGLE_CLIENT_ID })
    const verify = await client.verifyIdToken({ idToken: credential })

    if (!verify) {
        return res.status(401).json({ message: "Unauthorized Access" })
    }

    const { name, email } = verify.payload
    const result = await User.findOne({ email })
    if (result) {
        // login
        const token = genrateToken({ userId: result._id })
        res.cookie("auth", token, {
            maxAge: 864000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })
        res.json({
            message: "Logged in successfully", result: {
                _id: result._id,
                name: result.name,
                username: result.email
            }
        })
    } else {
        // register and then login
        const newUser = await User.create({ name, email })
        const token = genrateToken({ userId: newUser._id })
        res.cookie("auth", token, {
            maxAge: 864000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })
        res.json({
            message: "Logged in successfully", result: {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.email
            }
        })
    }
})

exports.verifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User not found with given email" })
    }

    const randomNumber = crypto.randomInt(0, 10000)
    const OTP = String(randomNumber).padStart(4, '5')

    const resetToken = genrateToken({ email, otp: OTP })

    await sendEmail({ to: user.email, subject: "Password Reset OTP", message: `Your Password Reset OTP is ${OTP}` })

    res.cookie("resetPassToken", resetToken, {
        maxAge: 120000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.status(200).json({ message: "OTP send on your Email Address" })
})

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body

    const userOtp = req.cookies.resetPassToken
    if (!userOtp) {
        return res.status(400).json({ message: "Token expired" })
    }

    const user = jwt.verify(userOtp, process.env.JWT_KEY)

    if (user.otp !== otp) {
        return res.status(422).json({ message: "Invalid otp" })
    }
    res.status(200).json({ message: "Otp verified" })
})

exports.resetPassword = asyncHandler(async (req, res) => {
    const { password, cpassword } = req.body

    const { isError, error } = customValidator({ password, cpassword })
    if (isError) {
        return res.status(400).json({ message: error.length > 1 ? "All fields are required" : error })
    }

    const resetToken = req.cookies.resetPassToken
    if (!resetToken) {
        return res.status(400).json({ message: "Token expired" })
    }

    const checkToken = jwt.verify(resetToken, process.env.JWT_KEY)

    const email = checkToken.email
    if (!email) {
        return res.status(422).json({ message: "Email not verified" })
    }


    const user = await User.findOne({ email })

    const hashPassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate(user._id, { password: hashPassword })

    res.clearCookie("resetPassToken")
    res.status(200).json({ message: "Password reset successfully" })
})

// forgot password with otp ---------------done
// dynamic pagination -----------------done
// backend validation --------------done
// fetch all document or with conditions ------------done
// login with google --------------------done
// filter with all expneses (not deleted or deleted) ---------------done
// pagination for type in expense with search type  --------------done
// dynamic header
// error handling with backend
// password update functionality