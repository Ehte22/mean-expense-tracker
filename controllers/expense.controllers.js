const asyncHandler = require("express-async-handler")
const Expense = require("../models/Expense")
const mongoose = require("mongoose")
const { customValidator } = require("../utils/customValidators")

exports.addExpense = asyncHandler(async (req, res) => {
    const { title, desc, type, date, amount, userId, tags } = req.body

    const { isError, error } = customValidator({ title, desc, type, date, amount, userId, tags })
    if (isError) {
        return res.status(400).json({ message: error.length < 2 ? error : "All fields required" })
    }

    const result = await Expense.create(req.body)
    res.status(200).json({ message: "Expense added successfully", result })
})

exports.getAllExpenses = asyncHandler(async (req, res) => {
    const { page, limit, searchExpense, sortByOrder, filterByStatus } = req.query;
    const skip = (page - 1) * limit
    const sort = sortByOrder === "desc" ? { createdAt: -1 } : { createdAt: 1 }

    let deletedAtFilter

    if (filterByStatus === 'null') {
        deletedAtFilter = { deletedAt: null }
    } else if (filterByStatus === 'date') {
        deletedAtFilter = { deletedAt: { $ne: null } }
    }

    console.log(deletedAtFilter);


    // const query = searchExpense ? {
    //     userId: req.body.userId,
    //     // deletedAt: { $eq: null },
    //     type: new RegExp(searchExpense, 'i'),
    // } : { userId: req.body.userId };

    const query = {
        $and: [
            { userId: req.body.userId },
            searchExpense ? { type: new RegExp(searchExpense, 'i') } : {},
            filterByStatus !== 'all' ? deletedAtFilter : {}
        ]
    }


    const total = await Expense.countDocuments(query)
    const result = await Expense.find(query).sort(sort).skip(skip).limit(limit)

    res.status(200).json({ message: "Expneses get successfully", result, page, limit, total })
})

exports.updateExpense = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await Expense.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "Expense update successfully", result })
})

exports.deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params

    const result = await Expense.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true, runValidators: true })
    res.status(200).json({ message: "Expense deleted successfully", result })

})

exports.calculateMonthlyExpenses = asyncHandler(async (req, res) => {
    const { searchYear } = req.query

    if (!searchYear || isNaN(parseInt(searchYear))) {
        return res.status(400).json({ message: 'Invalid year' });
    }
    const year = parseInt(searchYear);

    const userId = new mongoose.Types.ObjectId(req.body.userId);

    const expenses = await Expense.aggregate([
        {
            $match: {
                userId,
                deletedAt: { $eq: null },
                date: {
                    $gte: new Date(`${year}-01-01T00:00:00Z`),
                    $lt: new Date(`${year + 1}-01-01T00:00:00Z`)
                }
            }
        },
        {
            $addFields: {
                month: { $month: "$date" }
            }
        },
        {
            $group: {
                _id: "$month",
                totalAmount: { $sum: "$amount" }
            }
        },
        {
            $sort: { _id: 1 }
        },
        {
            $project: {
                _id: 1,
                month: "$_id",
                totalAmount: 1
            }
        }
    ]);

    console.log(expenses);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const result = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const expense = expenses.find(exp => exp.month === month);
        return {
            _id: month,
            month: monthNames[index],
            totalAmount: expense ? expense.totalAmount : 0
        };
    });

    const totalExpenses = result.reduce((sum, exp) => sum + exp.totalAmount, 0);
    const averageMonthlyExpense = totalExpenses / 12;

    const highestExpense = result.reduce((max, exp) => (exp.totalAmount > max.totalAmount ? exp : max), result[0]);
    const lowestExpense = result.reduce((min, exp) => (exp.totalAmount < min.totalAmount ? exp : min), result[0]);

    const statistics = {
        totalExpenses,
        averageMonthlyExpense,
        highestExpense,
        lowestExpense
    };
    res.status(200).json({ message: "Monthly expenses calculated successfully", result, statistics })
})

exports.calculateMonthlyDailyExpenses = asyncHandler(async (req, res) => {
    const { searchYear, searchMonth } = req.query;

    if (!searchYear || !searchMonth) {
        return res.status(400).json({ message: 'Invalid year or month' });
    }
    const year = parseInt(searchYear)
    const month = parseInt(searchMonth)

    const userId = new mongoose.Types.ObjectId(req.body.userId);

    const startDate = new Date(year, month - 1, 1); // month - 1 because month is 0-indexed in JavaScript Date
    const endDate = new Date(year, month, 1);

    const expenses = await Expense.aggregate([
        {
            $match: {
                userId,
                deletedAt: { $eq: null },
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
                totalAmount: { $sum: "$amount" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
        },
        {
            $project: {
                _id: month,
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
                date: {
                    $dateFromParts: {
                        year: "$_id.year",
                        month: "$_id.month",
                        day: "$_id.day"
                    }
                },
                totalAmount: 1
            }
        }
    ]);

    console.log(expenses);

    const result = expenses.map(exp => ({
        _id: month,
        month: exp.month,
        date: exp.date.toISOString().split('T')[0],
        totalAmount: exp.totalAmount
    }));

    const totalExpenses = result.reduce((sum, exp) => sum + exp.totalAmount, 0);
    const highestExpense = result.reduce((max, exp) => (exp.totalAmount > max.totalAmount ? exp : max), result[0]);
    const lowestExpense = result.reduce((min, exp) => (exp.totalAmount < min.totalAmount ? exp : min), result[0]);

    const statistics = {
        totalExpenses,
        highestExpense,
        lowestExpense
    };

    res.status(200).json({ message: "Monthly daily expenses calculated successfully", result, statistics });
});


