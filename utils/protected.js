const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.protectedRoute = asyncHandler(async (req, res, next) => {
    if (!req.cookies.auth) {
        return res.status(401).json({ messaage: "No cookie found" })
    }

    jwt.verify(req.cookies.auth, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "JWT error" })
        }
        req.body.userId = decoded.userId
        next()
    })
})