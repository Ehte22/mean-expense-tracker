const asyncHandler = require("express-async-handler")
const Type = require("../models/Type");
const { customValidator } = require("../utils/customValidators");

exports.addType = asyncHandler(async (req, res) => {
    const { type, userId } = req.body

    const { isError, error } = customValidator({ type, userId })
    if (isError) {
        return res.status(400).json({ message: error.length > 1 ? "All fields required" : error })
    }

    const types = await Type.findOne({ $and: [{ type }, { userId }] })
    if (types) {
        return res.status(400).json({ message: "type already added" })
    }

    const newType = await Type.create(req.body)
    res.status(200).json({ message: "type added successfully", result: newType })
})


exports.getTypes = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5, searchType, sortByOrder, isFetchAll } = req.query;

    let isFetchAllPar = JSON.parse(isFetchAll)

    const skip = (page - 1) * limit
    const sort = sortByOrder === "desc" ? { createdAt: -1 } : { createdAt: 1 }

    const userId = req.body.userId
    const query = searchType ? { userId, type: new RegExp(searchType, 'i') } : { userId };

    const total = await Type.countDocuments(query)

    let result;
    if (isFetchAllPar) {
        result = await Type.find().sort(sort)
    } else {
        result = await Type.find(query).sort(sort).skip(skip).limit(limit)
    }
    res.status(200).json({ message: "get all types successfully", result, page, limit, total })
})

exports.updateType = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Type.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    res.status(200).json({ message: "type updated successfully", result })
})

exports.deleteType = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Type.findByIdAndDelete(id)
    res.status(200).json({ message: "type deleted successfully" })
})