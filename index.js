const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { protectedRoute } = require("./utils/protected")
require("dotenv").config({ path: "./.env" })

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))

app.use(cookieParser())

app.use("/api/v1/auth", require("./routes/auth.routes"))
app.use("/api/v1/type", protectedRoute, require("./routes/type.routes"))
app.use("/api/v1/expense", protectedRoute, require("./routes/expense.routes"))

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Resource Not Found" })
    next()
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Something went wrong" })
    next()
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("DB is connected");
    app.listen(process.env.PORT, console.log(`Server is running on ${process.env.PORT}`))
})